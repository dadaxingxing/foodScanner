import re

def parseServingSize(serving_size_str):
    if not serving_size_str:
        return None, None
    
    serving_size_str = serving_size_str.lower().strip()

    # Get only the string inside the first ()
    inside_paren = r'\(([^)]*)\)'
    match = re.search(inside_paren, serving_size_str)
    if match:
        serving_size_str = match.group()[1:len(serving_size_str)-1]
        
    # Parse the first instance of number and a unit
    number = r'[1-9]*([.][0-9]+)?'
    unit = r''


    match = re.search(number, serving_size_str)
    if match:
        return match.group()
    # return serving_size_str

    
parseServingSize('1 bar (50 g)')
    
test_cases = [
    "1 bar (50 g)",     # ✅ valid number: "50"
    "1 gram",           # ✅ valid number: "1"
    "1.05 grams",       # ✅ valid number: "1.05"
    ".75 cup",          # ❌ invalid: no digit before dot
    "3. cups",          # ❌ invalid: dot but no digits after
    "1.0 bar",          # ✅ valid number: "1.0"
    "0.25 serving",     # ✅ valid
    "12.0.5 grams",     # ❌ invalid: multiple dots
    "2. grams",         # ❌ invalid: trailing dot
    "0 grams",          # ✅ valid number
    "5g",               # ✅ valid number: "5"
    "1.5 oz",           # ✅ valid decimal
    "01 piece",         # ✅ valid (if leading zero is allowed)
    "abc",              # ❌ invalid (no number)
    "1.23g protein",    # ✅ valid number: "1.23"
    "1.0abc",           # ❌ invalid if expecting a clean number only
]




