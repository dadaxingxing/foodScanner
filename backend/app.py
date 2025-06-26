import requests
import pprint
from flask import Flask, request, jsonify

from handleParsing import parseServingSize
from calcTotalServing import calcTotalServing

app = Flask(__name__)
app.secret_key = 'abc'


@app.route('/api/get_cal/<barcode>', methods=['GET'])
def get_cal(barcode):
    # if request.method != 'GET':
    #     return jsonify({'message': 'invalid request type'}), 400

    convert_to_kcal = lambda num: num if energy_unit == 'kcal' else num / 4.184
    
    result = requests.get(f'https://world.openfoodfacts.net/api/v2/product/{barcode}?fields=product_name,nutriments,serving_size,product_quantity').json()

    if result['status'] == 0:
        return 'Barcode not found'
    
    product_name = result['product'].get('product_name', 0)


    nutriment =  result['product']['nutriments']
    energy_unit = nutriment.get('energy_serving_unit', 'kcal')
    fat_grams_serving = convert_to_kcal(nutriment.get('fat_serving', 0))    
    carb_grams_serving = convert_to_kcal(nutriment.get('carbohydrates_serving', 0))
    protein_grams_serving = convert_to_kcal(nutriment.get('proteins_serving', 0))

    fat_cal_serving = fat_grams_serving * 9
    carb_cal_serving = carb_grams_serving * 4
    protein_cal_serving = protein_grams_serving * 4
    total_cal_serving = fat_cal_serving + carb_cal_serving + protein_cal_serving

    
    final_result = {
        'food_name': product_name,
        'fat_cal_serving': fat_cal_serving,
        'carb_cal_serving': carb_cal_serving,
        'protein_cal_serving': protein_cal_serving,
        'total_cal_serving': total_cal_serving
    }

    # End goal: find total calories along with all macro calories
    return final_result



if __name__ == '__main__':
    app.run(debug=True)
