from fastapi import FastAPI
from src.correction import CorrectionInput, getSuggestions, CorrectionOutput
from src.lemmatisation import LemmatisationInput, getRoot, LemmatisationOutput

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/correction")
def correction(input: CorrectionInput) -> CorrectionOutput:
    sug = getSuggestions(input.word)
    return CorrectionOutput(suggestions=sug)

@app.post("/api/verification")
def verification():
    return "Verification"

@app.post("/api/lemmatisation")
def lemmatisation(input: LemmatisationInput) -> LemmatisationOutput:
    root = getRoot(input.word)
    return LemmatisationOutput(root=root)

@app.post("/api/autocompletion")
def autocompletion():
    return "Autocompletion"