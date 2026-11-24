import json
import re
from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from .. import models, schemas

router = APIRouter(prefix="/analyze", tags=["analyze"])


# Mock AI: replace this function with a real model later
def mock_analyze(text: str):
    clean = text.strip()
    words = len(clean.split())
    sentences = [s.strip() for s in re.split(r"(?<=[.!?])\s+|\n+", clean) if s.strip()]

    times = re.findall(r"\b\d{1,2}(?::\d{2})?\s?(?:am|pm)\b", clean, flags=re.I)
    action_words = re.compile(
        r"\b(need to|should|must|will|let's|remember|call|send|finish|buy|book|prepare|write|review|ride|go)\b",
        re.I,
    )
    actions = [s for s in sentences if action_words.search(s)][:3]
    if times:
        actions.append(f"Set a reminder for {times[0]}")
    if not actions:
        actions.append("Add this to your task board")

    first = sentences[0] if sentences else clean
    summary = f"{first} ({words} words, {len(sentences)} sentences)"

    key_points = sentences[:3]
    if times:
        key_points.append(f"Time mentioned: {', '.join(dict.fromkeys(times))}")

    return summary, key_points, actions


def to_out(a: models.Analysis) -> schemas.AnalysisOut:
    return schemas.AnalysisOut(
        id=a.id,
        input_text=a.input_text,
        summary=a.summary or "",
        key_points=json.loads(a.key_points or "[]"),
        actions=json.loads(a.actions or "[]"),
        created_at=a.created_at,
    )


@router.post("", response_model=schemas.AnalysisOut, status_code=201)
def analyze(data: schemas.AnalyzeRequest, db: Session = Depends(get_db)):
    summary, key_points, actions = mock_analyze(data.text)
    row = models.Analysis(
        input_text=data.text,
        summary=summary,
        key_points=json.dumps(key_points),
        actions=json.dumps(actions),
    )
    db.add(row)
    db.commit()
    db.refresh(row)
    return to_out(row)


@router.get("", response_model=List[schemas.AnalysisOut])
def history(db: Session = Depends(get_db)):
    rows = db.query(models.Analysis).order_by(models.Analysis.id.desc()).limit(10).all()
    return [to_out(r) for r in rows]