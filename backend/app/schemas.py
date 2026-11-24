from datetime import date, datetime
from typing import List, Literal, Optional
from pydantic import BaseModel, ConfigDict

Status = Literal["To Do", "In Progress", "Done"]
Priority = Literal["Low", "Medium", "High"]


class TaskCreate(BaseModel):
    title: str
    priority: Priority = "Medium"
    status: Status = "To Do"
    due_date: Optional[date] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    priority: Optional[Priority] = None
    status: Optional[Status] = None
    due_date: Optional[date] = None


class TaskOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    priority: Priority
    status: Status
    due_date: Optional[date] = None
    created_at: datetime

class AnalyzeRequest(BaseModel):
    text: str


class AnalysisOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    input_text: str
    summary: str
    key_points: List[str]
    actions: List[str]
    created_at: datetime