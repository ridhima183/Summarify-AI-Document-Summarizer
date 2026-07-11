import re
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from sentence_transformers import SentenceTransformer
from config import ST_CACHE

# Load the embedding model only once when the server starts
model = SentenceTransformer(
    "all-MiniLM-L6-v2",
    cache_folder=ST_CACHE
)

# Load English stopwords only once
stop_words = set(stopwords.words("english"))


def preprocess_text(text: str) -> dict:
    """
    Preprocess the input text by:
    1. Cleaning the text
    2. Splitting into sentences
    3. Tokenizing into words
    4. Removing stopwords
    5. Generating sentence embeddings

    Returns:
        dict containing cleaned text, sentences, tokens,
        filtered tokens, and sentence embeddings.
    """

    # -----------------------------
    # Step 1: Clean the text
    # -----------------------------
    text = re.sub(r"\s+", " ", text)                 # Remove extra spaces
    text = re.sub(r"[^a-zA-Z0-9.,!? ]", "", text)    # Remove special characters
    text = text.strip()

    # -----------------------------
    # Step 2: Sentence Tokenization
    # -----------------------------
    sentences = sent_tokenize(text)

    # -----------------------------
    # Step 3: Word Tokenization
    # -----------------------------
    tokens = word_tokenize(text)

    # -----------------------------
    # Step 4: Remove Stopwords
    # -----------------------------
    filtered_tokens = [
        token
        for token in tokens
        if token.lower() not in stop_words
    ]

    # -----------------------------
    # Step 5: Generate Embeddings
    # -----------------------------
    embeddings = model.encode(sentences)

    # -----------------------------
    # Return Results
    # -----------------------------
    return {
        "cleaned_text": text,
        "sentences": sentences,
        "tokens": tokens,
        "filtered_tokens": filtered_tokens,
        "embeddings": embeddings.tolist(),
        "number_of_sentences": len(sentences),
        "embedding_dimension": (
            len(embeddings[0]) if len(sentences) > 0 else 0
        ),
    }