# TP2_M2

## MEMBRES
- RAKOTOSOLONIRINA Fitia *Notahiana* Valisoa    N 06
Frontend, integration backend dans frontend

- Ranjalahy Andry Tahiana Sylvain               N 01
Vérification à base de règles, integration dans backend
https://colab.research.google.com/drive/1VG-pi_cKvR_9ZzMgZDKOyVKa2v6hubGV#scrollTo=f4acb07f

- Razafinantoanina Miharimanjato                N 10
Web scraping, cleansing dataset, integration dans backend

- Rakotondraibe Nirinasoa Bienvenue             N 14
Autocompletion, Correcteur Orthographique

- Fiononatsoa Césaire Marcellin                 N 18
Autocompletion, cleansing dataset

- Randrianirina Manamahefa Nirlain              N 19
Frontend, integration backend dans frontend

## BREF DESCRIPTION
On a développé un éditeur de texte léger basé sur une architecture moderne et modulaire. Le frontend utilise Vite et React pour une interface rapide, avec Tiptap pour l’édition riche et Zustand pour la gestion d’état. Le backend repose sur FastAPI pour des API simples et performantes. Côté traitement linguistique, on intègre un système d’autocomplétion basé sur des bigrammes, un correcteur orthographique via la distance de Levenshtein, une vérification contextuelle avec une matrice de co-occurrence, et une lemmatisation à partir d’un dictionnaire personnalisé.

## DOCUMENTATION TECHNIQUE
- frontend: vite, reactjs, tiptap, zustand
- backend: fastapi
- IA: bigram(autocompletion), levenshtein(Correcteur Orthographique), co-occurence matrix(Vérification à base de règles), lemmatisation(fototeny.csv)

## BIBLIOGRAPHIE
- dataset baiboly: https://nybaiboly.net/Bible.htm
- dataset fototeny: https://tenymalagasy.org/bins/rootLists
- fastapi: https://fastapi.tiangolo.com/
- vite: https://vite.dev/
- tiptap: https://tiptap.dev/
- zustand: https://zustand-demo.pmnd.rs/