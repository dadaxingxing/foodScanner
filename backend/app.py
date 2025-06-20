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
    
    
    result = requests.get(f'https://world.openfoodfacts.net/api/v2/product/{barcode}?fields=product_name,nutriments,serving_size,product_quantity').json()

    if result['status'] == 0:
        return 'Barcode not found'
    
    product_name = result['product'].get('product_name', 0)


    nutriment =  result['product']['nutriments']
    fat_grams_serving = nutriment.get('fat_serving', 0)    
    carb_grams_serving = nutriment.get('carbohydrates_serving', 0)
    protein_grams_serving = nutriment.get('proteins_serving', 0)

    

    return result



if __name__ == '__main__':
    app.run(debug=True)
