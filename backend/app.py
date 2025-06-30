import requests
import pprint
from flask import Flask, request, jsonify

from handleParsing import parseServingSize
from backend.inferUnit import inferProductUnit

app = Flask(__name__)
app.secret_key = 'abc'


@app.route('/api/get_cal/<barcode>', methods=['GET'])
def get_cal(barcode):
    # if request.method != 'GET':
    #     return jsonify({'message': 'invalid request type'}), 400

    
    result = requests.get(f'https://world.openfoodfacts.net/api/v2/product/{barcode}?fields=product_name,nutriments,serving_size,product_quantity').json()

    if result['status'] == 0:
        return 'Barcode not found'
    
    product_name = result['product'].get('product_name', 0)


    nutriment =  result['product']['nutriments']
    fat_grams_100g = nutriment.get('fat_100g', 0)    
    carb_grams_100g = nutriment.get('carbohydrates_100g', 0)
    protein_grams_100g = nutriment.get('proteins_100g', 0)
    
    fat_cal_100g = fat_grams_100g * 9
    carb_cal_100g = carb_grams_100g * 4
    protein_cal_100g = protein_grams_100g * 4
    total_cal_100g = fat_cal_100g + carb_cal_100g + protein_cal_100g


    
    final_result = {
        'food_name': product_name,
        'fat_cal_100g': fat_cal_100g,
        'carb_cal_100g': carb_cal_100g,
        'protein_cal_100g': protein_cal_100g,
        'total_cal_100g': total_cal_100g
    }

    # End goal: find total calories along with all macro calories
    return final_result



if __name__ == '__main__':
    app.run(debug=True)
