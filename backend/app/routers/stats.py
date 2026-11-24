from datetime import date, datetime, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

router = APIRouter(tags=["stats"])


@router.post("/sessions", response_model=schemas.SessionOut, status_code=201)
def create_session(data: schemas.SessionCreate, db: Session = Depends(get_db)):
    # Use local time so "today" matches the dashboard's days
    session = models.FocusSession(**data.model_dump(), started_at=datetime.now())
    db.add(session)
    db.commit()
    db.refresh(session)
    return session


@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    total_tasks = db.query(models.Task).count()
    done_tasks = db.query(models.Task).filter(models.Task.status == "Done").count()

    total_minutes = db.query(
        func.coalesce(func.sum(models.FocusSession.minutes), 0)
    ).scalar()

    # Minutes per day
    minutes_by_day = {}
    for s in db.query(models.FocusSession).all():
        d = s.started_at.date()
        minutes_by_day[d] = minutes_by_day.get(d, 0) + s.minutes

    # Last 7 days for the chart
    today = date.today()
    weekly = []
    for i in range(6, -1, -1):
        d = today - timedelta(days=i)
        weekly.append(
            {"day": d.strftime("%a"), "hours": round(minutes_by_day.get(d, 0) / 60, 1)}
        )

    # Streak: consecutive days with a session (today may still be empty)
    streak = 0
    d = today if today in minutes_by_day else today - timedelta(days=1)
    while d in minutes_by_day:
        streak += 1
        d -= timedelta(days=1)

    score = round(done_tasks / total_tasks * 100) if total_tasks else 0

    return {
        "tasks_done": done_tasks,
        "focus_hours": round(total_minutes / 60, 1),
        "streak": streak,
        "score": score,
        "weekly": weekly,
    }


@router.get("/analytics")
def get_analytics(period: str = "week", db: Session = Depends(get_db)):
    today = date.today()

    minutes_by_day = {}
    for s in db.query(models.FocusSession).all():
        d = s.started_at.date()
        minutes_by_day[d] = minutes_by_day.get(d, 0) + s.minutes

    tasks_by_day = {}
    done = db.query(models.Task).filter(models.Task.completed_at.isnot(None)).all()
    for t in done:
        d = t.completed_at.date()
        tasks_by_day[d] = tasks_by_day.get(d, 0) + 1

    data = []
    if period == "month":
        # 4 blocks of 7 days, oldest first
        for w in range(3, -1, -1):
            end = today - timedelta(days=7 * w)
            days = [end - timedelta(days=i) for i in range(7)]
            data.append(
                {
                    "label": f"Week {4 - w}",
                    "focus": round(sum(minutes_by_day.get(d, 0) for d in days) / 60, 1),
                    "tasks": sum(tasks_by_day.get(d, 0) for d in days),
                }
            )
    else:
        for i in range(6, -1, -1):
            d = today - timedelta(days=i)
            data.append(
                {
                    "label": d.strftime("%a"),
                    "focus": round(minutes_by_day.get(d, 0) / 60, 1),
                    "tasks": tasks_by_day.get(d, 0),
                }
            )

    status = {"Done": 0, "In Progress": 0, "To Do": 0}
    for name, count in (
        db.query(models.Task.status, func.count(models.Task.id))
        .group_by(models.Task.status)
        .all()
    ):
        status[str(name)] = count

    return {
        "data": data,
        "status": [{"name": k, "value": v} for k, v in status.items()],
    }



