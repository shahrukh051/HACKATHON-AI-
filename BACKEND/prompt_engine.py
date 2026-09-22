"""
prompt_engine.py — Turns a raw task description into a structured,
optimized prompt using the sections from the original spec: Role,
Context, Objective, Requirements, Constraints, Available Technologies,
Expected Output, Evaluation Criteria, Failure Conditions.

Requires ANTHROPIC_API_KEY in the environment. The provider call is
isolated in _call_llm() on purpose — swap it out if you want to route
prompt-writing itself through a different model later.
"""

import os
import anthropic

_SYSTEM_PROMPT = """You are a prompt engineering assistant. Given a raw task \
description, produce a single, well-structured prompt for an AI model to \
execute. Always include these sections, each starting on its own line with \
the section name in brackets:

[Role]
[Context]
[Objective]
[Requirements]
[Constraints]
[Available Technologies]
[Expected Output]
[Evaluation Criteria]
[Failure Conditions]

Be concise but specific. Output only the structured prompt — no commentary \
before or after it. If information for a section wasn't provided, make a \
reasonable assumption and label it clearly as an assumption rather than \
leaving the section blank."""


# Provider call isolated here — swap model or client without touching generate_optimized_prompt
def _call_llm(task_description: str, context: str | None, constraints: str | None) -> str:
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])

    user_content = f"Task: {task_description}"
    if context:
        user_content += f"\nContext: {context}"
    if constraints:
        user_content += f"\nConstraints: {constraints}"

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1000,
        system=_SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_content}],
    )
    return "".join(block.text for block in response.content if block.type == "text")


def generate_optimized_prompt(
    task_description: str,
    context: str | None = None,
    constraints: str | None = None,
) -> str:
    if not task_description or not task_description.strip():
        raise ValueError("task_description is required")
    return _call_llm(task_description, context, constraints)
