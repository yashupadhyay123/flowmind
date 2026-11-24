from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine, Base
from . import models
from .routers import tasks, analyze

app = FastAPI(title="FlowMind API")

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
app.include_router(analyze.router)


@app.get("/")
def root():
    return {"message": "FlowMind API is running"}


@app.get("/health")
def health():
    return {"status": "ok"}