import pickle
import re
from pydantic import BaseModel
from typing import List

class AutocompletionInput(BaseModel):
    sentence: str

class AutocompletionOutput(BaseModel):
    completion: List[str] 

def clean_text(text):
    text = re.sub(r"[^a-zA-Z\-'\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.lower().strip()


def autocomplete(sentences: str, top_k: int = 5):
    with open('models/bigrams.pkl', 'rb') as f:
        bigrams = pickle.load(f)

    sentences = clean_text(sentences)

    if not sentences:
        return []

    words = sentences.split()
    last_word = words[-1]

    candidates = bigrams.get(last_word, {})

    sorted_candidates = sorted(
        candidates.items(),
        key=lambda x: x[1],
        reverse=True
    )

    # Retourner top_k suggestions
    return [word for word, _ in sorted_candidates[:top_k]]