# Prompt Writer AI

Given a task description, returns:
1. The recommended AI model for that task, with reasoning
2. A structured, optimized prompt ready to send to that model

## How the routing actually works (read this before demoing it)

`model_router.py` does **not** run the task on multiple models and compare —
that would be the Multi-AI Execution + Evaluator module from the full spec,
which was cut. Instead it:

1. Classifies the task by keyword match into a task type (`code_generation`,
   `creative_writing`, `long_document_analysis`, etc.)
2. Looks up which capabilities that task type needs
3. Scores each model in `MODEL_CAPABILITIES` by how well its listed strengths
   match, adjusted for cost/speed based on `priority`

This is fast and free to run, but it's only as good as two things you should
expect to be asked about:
- The keyword classifier (`_KEYWORDS`) — it's a simple substring match, so
  phrasing the classifier hasn't seen will fall through to `"general"`. Try
  a few edge cases before you demo — "summarize this 400-page report" does
  **not** currently match `long_document_analysis` because that phrasing
  isn't in the keyword list. Either add more phrasings or say plainly that
  this is v1 keyword matching, not semantic understanding.
- The `MODEL_CAPABILITIES` table — it's hand-maintained data about what each
  model is good at. It'll go stale as models update. That's fine for a demo,
  just don't claim it's live or automatically current.

## Setup

```bash
pip install -r requirements.txt
export ANTHROPIC_API_KEY=sk-...
uvicorn main:app --reload
```

## Try it

```bash
curl -X POST http://localhost:8000/api/prompt-writer \
  -H "Content-Type: application/json" \
  -d '{
    "task_description": "Write a Python function to parse a CSV and return duplicate rows",
    "priority": "quality"
  }'
```

Response shape:

```json
{
  "task_type": "code_generation",
  "recommended_model": "claude-sonnet",
  "provider": "anthropic",
  "reasoning": "Classified as 'code_generation' ...",
  "optimized_prompt": "[Role]\n...\n[Failure Conditions]\n..."
}
```

`priority` can be `"quality"` (default), `"cost"`, or `"speed"` — this
controls whether the router optimizes for capability match, cheapest model,
or fastest model. Without this, "best" is undefined, so it's not optional —
every request needs one, even if it's just the default.

## Files

- `model_router.py` — task classification + model recommendation (no API calls, instant)
- `prompt_engine.py` — calls Claude to write the structured prompt (one API call)
- `main.py` — FastAPI endpoint wiring both together
