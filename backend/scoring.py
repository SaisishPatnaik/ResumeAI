def calculate_final_score(
    semantic_score,
    skill_score,
    text_score
):
    """
    Calculate the overall ATS score.

    Weights:
    - Semantic similarity: 50%
    - Skill match: 35%
    - Text similarity: 15%
    """

    final_score = (
        (semantic_score * 0.50) +
        (skill_score * 0.35) +
        (text_score * 0.15)
    )

    return round(final_score, 2)