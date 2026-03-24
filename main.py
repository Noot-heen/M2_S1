from fastapi import FastAPI
from src.correction import CorrectionInput, getSuggestions, CorrectionOutput
from src.lemmatisation import LemmatisationInput, getRoot, LemmatisationOutput
from src.autocompletion import AutocompletionInput, AutocompletionOutput, autocomplete
from src.verification import VerificationInput, VerificationOutput, getToken
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/api/correction")
def correction(input: CorrectionInput) -> CorrectionOutput:
    sug = getSuggestions(input.word)
    return CorrectionOutput(suggestions=sug)

@app.post("/api/verification")
def verification(input: VerificationInput) -> VerificationOutput:
    token = getToken(input.sentence)
    return VerificationOutput(matrix=token)

@app.post("/api/lemmatisation")
def lemmatisation(input: LemmatisationInput) -> LemmatisationOutput:
    root = getRoot(input.word)
    return LemmatisationOutput(root=root)

@app.post("/api/autocompletion")
def autocompletion(input: AutocompletionInput) -> AutocompletionOutput:
    out = autocomplete(input.sentence)
    return AutocompletionOutput(completion=out)