def inferProductUnit(data):

    liquid_keywords = [
        "drink", "juice", "soda", "cola", "water", "milk", "beverage", "energy drink",
        "soft drink", "tea", "coffee", "smoothie", "kombucha", "infusion", "shake",
        "protein drink", "sports drink", "carbonated", "sparkling", "isotonic",
        "bottle", "can", "carton", "liquid", "ml", "fl oz", "fluid ounce", "pouch",
        "cold brew", "latte", "matcha", "tonic", "alcohol", "beer", "wine", "vodka",
        "whiskey", "gin", "liqueur", "cocktail", "hard seltzer", "soy milk", "almond milk",
        "coconut water", "rice milk", "plant milk", "oat milk", "electrolyte", "hydro",
        "broth", "soup", "gazpacho", "nectar", "extract", "syrup", "concentrate", "ready to drink",
        "ready-to-drink", "espresso", "decaf", "sparkling water", "spring water",
        "distilled water", "mineral water", "flavored water", "hydration", "hydrating", 'mil', 'millimeter'
    ]

    name = data.get('product_name', '').lower()
    quantity = data.get('product_quantity', '').lower()
    serving_size = data.get('serving_size', '').lower()

    lookUp = f'{name}{quantity}{serving_size}'
    return not any(keyWord in lookUp for keyWord in liquid_keywords)
