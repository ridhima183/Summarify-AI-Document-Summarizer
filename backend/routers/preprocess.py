from fastapi import APIRouter
from models.schemas import TextRequest
from services.preprocessing import preprocess_text

router = APIRouter()


@router.post("/api/preprocess")
def preprocess(request: TextRequest):
    """
    Preprocess the input text and return
    sentences, tokens, filtered tokens,
    and sentence embeddings.
    """
    result = preprocess_text(request.text)
    return result