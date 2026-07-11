from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional, Literal
import traceback

from services.extraction import extract_text_from_file
from services.preprocessing import preprocess_text
from services.summarizer import generate_summary
from services.evaluation import evaluate_summary

router = APIRouter()


@router.post("/api/upload")
async def upload_file(
    file: UploadFile = File(...),
    method: str = Form(...),
    num_sentences: int = Form(...),
    reference_summary: Optional[str] = Form(None),
):
    try:
        # -----------------------------
        # Step 1: Extract text
        # -----------------------------
        contents = await file.read()

        extracted_text = extract_text_from_file(
            contents,
            file.filename
        )

        # -----------------------------
        # Step 2: Preprocess
        # -----------------------------
        preprocessed_data = preprocess_text(
            extracted_text
        )

        total_sentences = len(
            preprocessed_data["sentences"]
        )

        if total_sentences == 0:
            raise HTTPException(
                status_code=400,
                detail="No valid sentences found."
            )

        if num_sentences < 1:
            raise HTTPException(
                status_code=400,
                detail="num_sentences must be at least 1."
            )

        if num_sentences > total_sentences:
            raise HTTPException(
                status_code=400,
                detail=f"Maximum allowed sentences is {total_sentences}"
            )

        # -----------------------------
        # Step 3: Summarize
        # -----------------------------
        result = generate_summary(
            preprocessed_data,
            method,
            num_sentences
        )

        # -----------------------------
        # Step 4: Evaluate (Optional)
        # -----------------------------
        if reference_summary:

            result["rouge"] = evaluate_summary(
                generated=result["summary"],
                reference=reference_summary
            )

        # -----------------------------
        # Step 5: Extra Metadata
        # -----------------------------
        result["filename"] = file.filename
        result["characters_extracted"] = len(
            extracted_text
        )

        return result

    except ValueError as e:

        raise HTTPException(
            status_code=400,
            detail=str(e)
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )