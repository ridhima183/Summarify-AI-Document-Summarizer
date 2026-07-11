from pydantic import BaseModel, Field
from typing import Literal, Optional
from config import (
    TFIDF,
    TEXTRANK,
    ABSTRACTIVE,
    LONGDOC,
)


class TextRequest(BaseModel):
    text: str = Field(..., min_length=1)


class SummaryRequest(BaseModel):
    text: str = Field(..., min_length=1)
    method: Literal[
    "tfidf",
    "textrank",
    "abstractive",
    "longdoc"
]
    num_sentences: int = Field(..., ge=1)
    reference_summary: Optional[str] = None