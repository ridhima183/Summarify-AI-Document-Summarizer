from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import networkx as nx
import numpy as np

from config import (
    TFIDF,
    TEXTRANK,
    ABSTRACTIVE,
    LONGDOC,
)

from services.abstractive import generate_abstractive_summary
from services.longdoc import generate_long_summary


def tfidf_summarize(sentences, num_sentences):
    """
    Rank sentences using TF-IDF + cosine similarity.
    """

    if len(sentences) == 0:
        return {
            "summary": "",
            "ranked_sentences": []
        }

    if len(sentences) <= num_sentences:
        return {
            "summary": " ".join(sentences),
            "ranked_sentences": [
                {
                    "sentence": sentence,
                    "score": 1.0
                }
                for sentence in sentences
            ]
        }

    vectorizer = TfidfVectorizer()

    tfidf_matrix = vectorizer.fit_transform(sentences)

    similarity_matrix = cosine_similarity(tfidf_matrix)

    scores = similarity_matrix.mean(axis=1)

    ranked = []

    for i, sentence in enumerate(sentences):

        ranked.append({
            "index": i,
            "sentence": sentence,
            "score": float(scores[i])
        })

    ranked.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    top = ranked[:num_sentences]

    top.sort(
        key=lambda x: x["index"]
    )

    summary = " ".join(
        sentence["sentence"]
        for sentence in top
    )

    return {
        "summary": summary,
        "ranked_sentences": ranked
    }


def textrank_summarize(sentences, embeddings, num_sentences):
    """
    Rank sentences using TextRank.
    """

    if len(sentences) == 0:
        return {
            "summary": "",
            "ranked_sentences": []
        }

    if len(sentences) <= num_sentences:
        return {
            "summary": " ".join(sentences),
            "ranked_sentences": [
                {
                    "sentence": sentence,
                    "score": 1.0
                }
                for sentence in sentences
            ]
        }

    similarity_matrix = cosine_similarity(embeddings)

    graph = nx.from_numpy_array(similarity_matrix)

    scores = nx.pagerank(graph)

    ranked = []

    for index, sentence in enumerate(sentences):

        ranked.append({
            "index": index,
            "sentence": sentence,
            "score": float(scores[index])
        })

    ranked.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    top = ranked[:num_sentences]

    top.sort(
        key=lambda x: x["index"]
    )

    summary = " ".join(
        sentence["sentence"]
        for sentence in top
    )

    return {
        "summary": summary,
        "ranked_sentences": ranked
    }


def generate_summary(preprocessed_data, method, num_sentences):
    """
    Main wrapper function.
    Selects the summarization strategy dynamically.
    """

    method = method.lower()

    sentences = preprocessed_data["sentences"]
    embeddings = np.array(preprocessed_data["embeddings"])
    cleaned_text = preprocessed_data["cleaned_text"]

    summarizers = {

        TFIDF: lambda: tfidf_summarize(
            sentences,
            num_sentences
        ),

        TEXTRANK: lambda: textrank_summarize(
            sentences,
            embeddings,
            num_sentences
        ),

        ABSTRACTIVE: lambda: {
            "summary": generate_abstractive_summary(
                cleaned_text
            ),
            "method": ABSTRACTIVE,
            "ranked_sentences": None,
            "note": "Abstractive summaries are generated, not extracted from the original text."
        },

        LONGDOC: lambda: {
            "summary": generate_long_summary(
                cleaned_text
            ),
            "method": LONGDOC,
            "ranked_sentences": None,
            "note": "Generated using LED for long documents."
        }

    }

    if method not in summarizers:

        raise ValueError(
            f"Unsupported summarization method: {method}"
        )

    result = summarizers[method]()

    result["method"] = method

    if method not in [ABSTRACTIVE, LONGDOC]:
        result["num_sentences"] = num_sentences

    return result