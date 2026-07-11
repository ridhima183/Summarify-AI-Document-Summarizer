from transformers import (
    pipeline,
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
)

from config import HF_CACHE, BART_MODEL

print("========== BART MODEL LOADING ==========")

tokenizer = AutoTokenizer.from_pretrained(
    BART_MODEL,
    cache_dir=HF_CACHE
)

model = AutoModelForSeq2SeqLM.from_pretrained(
    BART_MODEL,
    cache_dir=HF_CACHE
)

summarizer = pipeline(
    "summarization",
    model=model,
    tokenizer=tokenizer
)


def generate_abstractive_summary(
    text: str,
    max_length: int = 150,
    min_length: int = 40
) -> str:

    if not text.strip():
        raise ValueError("Input text is empty.")

    text = text[:4000]

    try:
        result = summarizer(
            text,
            max_length=max_length,
            min_length=min_length,
            do_sample=False
        )

        return result[0]["summary_text"]

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise