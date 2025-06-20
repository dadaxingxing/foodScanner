import re

def parseServingSize(serving_size_str):
    if not serving_size_str:
        return None, None
    
    serving_size_str = serving_size_str.lower().strip()

    # Get only the string inside the first ()
    inside_paren = r'\(([^)]*)\)'
    match = re.search(inside_paren, serving_size_str)
    if match:
        serving_size_str = match.group(1)
    
    # Parse the first instance of number and a unit
    number = r'([1-9]*[.]?[1-9]+)'
    unit = r''



parseServingSize('1 bar (50 g)')


    
