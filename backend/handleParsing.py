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
    pattern = r'([1-9]?[0-9]*(?:[.][0-9]*)?)[ ]?([a-zA-Z]*)'
    match = re.search(pattern, serving_size_str)

    if match.group(1) and match.group(2):
        num = match.group(1)
        unit = match.group(2)
        return (num, unit)
    else:
        return None, None
