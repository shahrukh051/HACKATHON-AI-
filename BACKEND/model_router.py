"""
model_router.py — Static capability-based AI model router.

Given a task description, recommends which AI model is best suited to
perform it, and explains why. This is a configurable lookup/scoring
table, not live multi-model execution — that's the deliberate tradeoff
that keeps this fast, free to run, and buildable in a weekend. Update
MODEL_CAPABILITIES as models and providers change.
"""

from dataclasses import dataclass
from typing import Literal

Priority = Literal["quality", "cost", "speed"]


@dataclass
class ModelProfile:
    name: str
    provider: str
    strengths: list[str]      # capability tags this model is strong at
    context_window: int       # tokens
    relative_cost: int        # 1 (cheap) - 5 (expensive)
    relative_speed: int       # 1 (slow) - 5 (fast)
    notes: str = ""


# --- Configurable capability table. This is the part that goes stale as
# models change — keep it as data, not logic, so it's a one-file edit. ---
MODEL_CAPABILITIES: list[ModelProfile] = [
    ModelProfile(
        name="claude-opus", provider="anthropic",
        strengths=["reasoning", "code", "long_context", "agentic"],
        context_window=200_000, relative_cost=5, relative_speed=2,
        notes="Best for complex multi-step reasoning and large codebases.",
    ),
    ModelProfile(
        name="claude-sonnet", provider="anthropic",
        strengths=["code", "reasoning", "long_context", "writing"],
        context_window=200_000, relative_cost=3, relative_speed=4,
        notes="Strong all-rounder; good default when unsure.",
    ),
    ModelProfile(
        name="gpt-4o", provider="openai",
        strengths=["reasoning", "code", "multimodal", "general"],
        context_window=128_000, relative_cost=3, relative_speed=4,
        notes="Strong general-purpose model with vision support.",
    ),
    ModelProfile(
        name="gpt-4o-mini", provider="openai",
        strengths=["general", "quick_qa", "cost_sensitive"],
        context_window=128_000, relative_cost=1, relative_speed=5,
        notes="Cheap and fast for simple, low-stakes tasks.",
    ),
    ModelProfile(
        name="gemini-1.5-pro", provider="google",
        strengths=["long_context", "multimodal", "reasoning"],
        context_window=1_000_000, relative_cost=3, relative_speed=3,
        notes="Best when the task needs a very large context window.",
    ),
]

TASK_CAPABILITY_MAP: dict[str, list[str]] = {
    "code_generation": ["code", "reasoning"],
    "code_review": ["code", "reasoning"],
    "long_document_analysis": ["long_context", "reasoning"],
    "creative_writing": ["writing", "general"],
    "data_analysis": ["reasoning", "code"],
    "quick_qa": ["quick_qa", "general", "cost_sensitive"],
    "multimodal": ["multimodal"],
    "agentic_workflow": ["agentic", "reasoning", "code"],
    "general": ["general", "reasoning"],
}

# Naive keyword classifier. This is the weakest link in the module — swap
# it for an embedding classifier or a cheap LLM call later if misclassification
# becomes a problem in practice. Keeping it rule-based for now means zero
# extra API cost per routing decision.
_KEYWORDS: dict[str, list[str]] = {
    "code_generation": ["write code", "implement", "function", "build a", "script", "api endpoint"],
    "code_review": ["review this code", "debug", "fix this bug", "refactor"],
    "long_document_analysis": ["summarize this document", "analyze this pdf", "long report", "entire codebase"],
    "creative_writing": ["write a story", "poem", "blog post", "creative", "marketing copy"],
    "data_analysis": ["analyze this data", "csv", "statistics", "dataset"],
    "quick_qa": ["what is", "define", "quick question", "simple"],
    "multimodal": ["this image", "this screenshot", "diagram"],
    "agentic_workflow": ["multi-step", "use tools", "autonomous", "agent"],
}


def classify_task(task_description: str) -> str:
    text = task_description.lower()
    for task_type, keywords in _KEYWORDS.items():
        if any(kw in text for kw in keywords):
            return task_type
    return "general"


def recommend_model(task_description: str, priority: Priority = "quality") -> dict:
    """
    Returns the recommended model plus the reasoning behind it.
    priority controls the tradeoff: 'quality' favors capability match,
    'cost' heavily penalizes expensive models, 'speed' favors fast models.
    """
    task_type = classify_task(task_description)
    required = set(TASK_CAPABILITY_MAP.get(task_type, ["general"]))

    # "general" is a catch-all tag, not a real signal of fit — a model that
    # only matches on "general" shouldn't score the same as one matching on
    # a specific capability like "writing" or "code". Weight it down.
    def match_weight(tag: str) -> float:
        return 0.3 if tag == "general" else 1.0

    scored = []
    for model in MODEL_CAPABILITIES:
        matched_tags = required & set(model.strengths)
        if not matched_tags:
            continue
        overlap = sum(match_weight(tag) for tag in matched_tags)
        if priority == "cost":
            score = overlap * 5 - model.relative_cost * 3
        elif priority == "speed":
            score = overlap * 5 + model.relative_speed * 3
        else:  # quality
            score = overlap * 10 - model.relative_cost
        scored.append((score, model))

    if not scored:
        fallback = min(MODEL_CAPABILITIES, key=lambda m: m.relative_cost)
        return {
            "task_type": task_type,
            "recommended_model": fallback.name,
            "provider": fallback.provider,
            "reasoning": (
                f"No strong capability match found for '{task_type}'; "
                f"defaulting to lowest-cost general model ({fallback.name})."
            ),
        }

    scored.sort(key=lambda x: x[0], reverse=True)
    _, best_model = scored[0]
    matched = sorted(required & set(best_model.strengths))

    return {
        "task_type": task_type,
        "recommended_model": best_model.name,
        "provider": best_model.provider,
        "reasoning": (
            f"Classified as '{task_type}' (requires: {sorted(required)}). "
            f"{best_model.name} matched on {matched}, ranked highest for "
            f"priority='{priority}' (cost {best_model.relative_cost}/5, "
            f"speed {best_model.relative_speed}/5). {best_model.notes}"
        ),
    }
