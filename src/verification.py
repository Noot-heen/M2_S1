from pydantic import BaseModel
from typing import List
import numpy as np
import json
import re

class VerificationInput(BaseModel):
    sentence: str

class VerificationOutput(BaseModel):
    matrix: List[int]

co_occurrence_matrix = np.load('models/co-occurrence-matrix.npy')
with open('models/letter-to-int.json', 'r') as fp:
    letter_to_int = json.load(fp)
with open('models/int-to-letter.json', 'r') as fp2:
    int_to_letter = json.load(fp2)

def get_co_occurrence(word):
    if not word:
        return "Input word cannot be empty."
    elif len(word)==1: # 'a '
        return "Input word cannot be single."
    first_letter = word[0]
    second_letter = word[1] if len(word) > 1 else ''
    foreign_letters = ['#', '(', ')', '.', '"', 'c', 'w', 'q', 'x', 'u']
    if first_letter in foreign_letters:
        print(f"'{first_letter}' not found in Malagasy letters.")
        co_occurrence_value = 0
    if first_letter not in letter_to_int:
        return f"'{first_letter}' not found in unique letters."
    if second_letter and second_letter not in letter_to_int:
        return f"'{second_letter}' not found in unique letters."
    first_idx = letter_to_int[first_letter]
    if not second_letter:
        return f"Only one letter provided ('{first_letter}'). Co-occurrence requires two letters."
    second_idx = letter_to_int[second_letter]
    co_occurrence_value = co_occurrence_matrix[first_idx, second_idx]
    return f"Co-occurrence of '{first_letter}' followed by '{second_letter}': {co_occurrence_value}"

def getToken(sentence):
    result_array = []
    n = len(sentence)
    for i in range(n):
        current_char = sentence[i]
        if i == n - 1:
            result_array.append(1)
            break
        next_char = sentence[i+1]
        if current_char == ' ' or next_char == ' ':
            result_array.append(1)
        else:
            two_char_string = current_char + next_char
            co_occurrence_result_string = get_co_occurrence(two_char_string)

            # Parse the result string to get the numerical value
            co_occurrence_value_match = re.search(r': (\d+)', co_occurrence_result_string)
            if co_occurrence_value_match:
                value = int(co_occurrence_value_match.group(1))
                if value == 0:
                    result_array.append(0)
                else:
                    result_array.append(1)
            else:
                result_array.append(1)
    return result_array
