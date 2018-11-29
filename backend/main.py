from flask import Flask, request, render_template 
import json
import logging

app = Flask(__name__)

inventory = {}

@app.route("/", methods=['GET'])
def main():
    pass
    #return render_template('index.html')

@app.route("/inventory", methods=['GET'])
def get_inventory():
    return json.dumps(inventory), 200, {'ContentType':'application/json'}

@app.route("/update", methods=['POST'])
def update_inventory():
    content = json.loads(request.data)
    food_item = content['queryResult']['parameters']['food']
    food_quantity = content['queryResult']['parameters']['number']
    action = content['queryResult']['parameters']['action']

    logging.info(food_item)
    logging.info(food_quantity)
    logging.info(action)
    if food_item in inventory and action == 'insert':
        new_quantity = inventory[food_item] + food_quantity
        inventory[food_item] = new_quantity
    elif food_item in inventory and action == 'remove':
        new_quantity = inventory[food_item] - food_quantity
        inventory[food_item] = new_quantity
    else:
        inventory[food_item] = food_quantity
    logging.info(inventory)
    return json.dumps({'speech': 'Thank you.', 'type': 0}), 200, {'ContentType':'application/json'}




