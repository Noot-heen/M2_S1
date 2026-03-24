import pandas as pd
from rapidfuzz import fuzz, process
from pydantic import BaseModel

class LemmatisationInput(BaseModel):
    word: str

class LemmatisationOutput(BaseModel):
    root: str

def getRoot(word: str, threshold=80, limit=3) -> str:
    df = pd.read_csv('datasets/fototeny.csv', encoding='utf-8')
    lemma_dict = dict(zip(df['word'].str.lower(), df['base'].str.lower()))
    w = word.lower()
    if w in lemma_dict:
        return lemma_dict[w]
    else:
        # Recherche des mots les plus proches parmi toutes les clés
        results = process.extract(w, lemma_dict.keys(), scorer=fuzz.ratio, limit=limit)
        best = results[0]  # (mot, score)
        if best[1] >= threshold:
            return lemma_dict[best[0]]
        else:
            return ""
