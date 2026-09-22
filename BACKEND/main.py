# init
"""
main.py — Prompt Writer AI service.

One endpoint: given a task, return the recommended model + an optimized
prompt for that task.

Run:
    export ANTHROPIC_API_KEY=sk-...
    uvicorn main:app --reload

Test:
    curl -X POST http://localhost:8000/api/prompt-writer \
      -H "Content-Type: application/json" \
      -d '{"task_description": "Write a Python function to parse a CSV and return duplicate rows"}'
"""

from typing import Literal

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from model_router import recommend_model
from prompt_engine import generate_optimized_prompt

app = FastAPI(title="Prompt Writer AI")


class PromptWriterRequest(BaseModel):
    task_description: str
    context: str | None = None
    constraints: str | None = None
    # defaults to "quality" so cold-start usage never needs to think about tradeoffs
    priority: Literal["quality", "cost", "speed"] = "quality"


class PromptWriterResponse(BaseModel):
    task_type: str
    recommended_model: str
    provider: str
    reasoning: str
    optimized_prompt: str


@app.post("/api/prompt-writer", response_model=PromptWriterResponse)
def write_prompt(req: PromptWriterRequest) -> PromptWriterResponse:
    # strip() catches whitespace-only strings that Pydantic min_length would miss
    if not req.task_description.strip():
        raise HTTPException(status_code=400, detail="task_description is required")

    routing = recommend_model(req.task_description, priority=req.priority)
    optimized_prompt = generate_optimized_prompt(
        req.task_description, req.context, req.constraints
    )

    return PromptWriterResponse(
        task_type=routing["task_type"],
        recommended_model=routing["recommended_model"],
        provider=routing["provider"],
        reasoning=routing["reasoning"],
        optimized_prompt=optimized_prompt,
    )


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
