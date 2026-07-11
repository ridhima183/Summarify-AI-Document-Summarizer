from transformers import (
    pipeline,
    AutoTokenizer,
    AutoModelForSeq2SeqLM,
)

from config import (
    HF_CACHE,
    LED_MODEL,
)

print("========== LED MODEL LOADING ==========")

# -----------------------------------------
# Load LED tokenizer
# -----------------------------------------

tokenizer = AutoTokenizer.from_pretrained(
    LED_MODEL,
    cache_dir=HF_CACHE
)

# -----------------------------------------
# Load LED model
# -----------------------------------------

model = AutoModelForSeq2SeqLM.from_pretrained(
    LED_MODEL,
    cache_dir=HF_CACHE
)

# -----------------------------------------
# Create pipeline
# -----------------------------------------

led_summarizer = pipeline(
    "summarization",
    model=model,
    tokenizer=tokenizer
)


def generate_long_summary(
    text: str,
    max_length: int = 256,
    min_length: int = 80
) -> str:
    """
    Generate an abstractive summary
    using LED for long documents.
    """

    if not text.strip():
        raise ValueError(
            "Input text is empty."
        )

    try:

        result = led_summarizer(
    text,
    max_length=max_length,
    min_length=min_length,
    truncation=True,
    do_sample=False,
)
        return result[0]["summary_text"]

    except Exception as e:

        raise ValueError(str(e))