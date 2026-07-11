from fastapi import APIRouter, HTTPException
from services.evaluation import evaluate_summary

from models.schemas import SummaryRequest
from services.preprocessing import preprocess_text
from services.summarizer import generate_summary
from config import ABSTRACTIVE
router = APIRouter()


@router.post("/api/summarize")
def summarize(request: SummaryRequest):
    try:
        preprocessed_data = preprocess_text(request.text)

        total_sentences = len(preprocessed_data["sentences"])

        if total_sentences == 0:
            raise HTTPException(
                status_code=400,
                detail="No valid sentences found."
            )

        if request.num_sentences > total_sentences:
            raise HTTPException(
                status_code=400,
                detail=f"Maximum allowed sentences is {total_sentences}"
            )

        result = generate_summary(
            preprocessed_data,
            request.method,
            request.num_sentences
        )

        if request.reference_summary:

            rouge_scores = evaluate_summary(
            generated=result["summary"],
            reference=request.reference_summary
          )

            result["rouge"] = rouge_scores

        return result

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))