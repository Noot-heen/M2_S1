from pydantic import BaseModel
from typing import List
from rapidfuzz import fuzz, process
import pandas as pd


class CorrectionInput(BaseModel):
    word: str

class CorrectionOutput(BaseModel):
    suggestions: List[str]

def getSuggestions(word, limit=20) -> List[str]:
    df = pd.read_csv('datasets/merged.csv', encoding='utf-8')
    wordlist = set(df['word'].str.lower())
    suggestions = process.extract(word, wordlist, scorer=fuzz.ratio, limit=limit)
    return [s[0] for s in suggestions]
