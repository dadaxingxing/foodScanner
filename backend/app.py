import os
import requests
import pprint
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from math import ceil

from handleParsing import parseServingSize
from inferUnit import inferProductUnit

load_dotenv()

app = Flask(__name__)
app.secret_key = 'abc'

allowed_origins = os.getenv('ALLOWED_ORIGINS', '').split(',') 
CORS(app, origins=[origins for origins in allowed_origins])


@app.route('/api/get_cal/<barcode>', methods=['GET'])
def get_cal(barcode):
    if request.method != 'GET':
        return jsonify({'message': 'invalid request type'}), 400

    
    result = requests.get(f'https://world.openfoodfacts.net/api/v2/product/{barcode}?fields=product_name,nutriments,serving_size,product_quantity').json()

    if result['status'] == 0:
        return jsonify({'message': 'Barcode not found'}), 400
    
    product_name = result['product'].get('product_name', 0)


    nutriment =  result['product']['nutriments']
    fat_grams_100g = nutriment.get('fat_100g', 0)    
    carb_grams_100g = nutriment.get('carbohydrates_100g', 0)
    protein_grams_100g = nutriment.get('proteins_100g', 0)
    
    fat_cal_100g = fat_grams_100g * 9
    carb_cal_100g = carb_grams_100g * 4
    protein_cal_100g = protein_grams_100g * 4
    total_cal_100g = fat_cal_100g + carb_cal_100g + protein_cal_100g


    total = {}
    product = result['product']
    status = inferProductUnit(product) and ('product_quantity' in product)
    total['status'] = status

    if status:
        scale_factor = int(product['product_quantity']) / 100

        total['fat_cal'] = fat_cal_100g * scale_factor
        total['carb_cal'] = carb_cal_100g * scale_factor
        total['protein_cal'] = protein_cal_100g * scale_factor
        total['total_cal'] = total['carb_cal'] + total['protein_cal'] + total['fat_cal']

    final_result = {
        'food_name': product_name,
        'g100': {
            'fat_cal_100g': ceil(fat_cal_100g),
            'carb_cal_100g': ceil(carb_cal_100g),
            'protein_cal_100g': ceil(protein_cal_100g),
            'total_cal_100g': ceil(total_cal_100g)

        },
        'total': total
    }

    # End goal: find total calories along with all macro calories
    return jsonify(final_result), 200



if __name__ == '__main__':
    app.run(debug=True)
