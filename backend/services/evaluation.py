from rouge_score import rouge_scorer


def evaluate_summary(
    generated: str,
    reference: str
):
    """
    Evaluate a generated summary against
    a reference summary using ROUGE.
    """

    scorer = rouge_scorer.RougeScorer(
        ["rouge1", "rouge2", "rougeL"],
        use_stemmer=True
    )

    scores = scorer.score(
        reference,
        generated
    )

    return {
        "rouge-1": {
            "precision": round(scores["rouge1"].precision, 4),
            "recall": round(scores["rouge1"].recall, 4),
            "f1": round(scores["rouge1"].fmeasure, 4),
        },
        "rouge-2": {
            "precision": round(scores["rouge2"].precision, 4),
            "recall": round(scores["rouge2"].recall, 4),
            "f1": round(scores["rouge2"].fmeasure, 4),
        },
        "rouge-l": {
            "precision": round(scores["rougeL"].precision, 4),
            "recall": round(scores["rougeL"].recall, 4),
            "f1": round(scores["rougeL"].fmeasure, 4),
        },
    }