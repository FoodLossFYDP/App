from flask import Flask, request, render_template 
import json
import logging

app = Flask(__name__)

inventory = [
    {
        'houseId': "20652932",
        'qty':"0.5 kg", 
        'item': "Linguini", 
        'dateUpdated':"Added Tuesday, November 16", 
        'uncertainQty': False,
        'expiringSoon': False,
    },
    {
        'houseId': "20652932",
        'qty': "10", 
        'item': "Apples", 
        'dateUpdated': "Added Monday, November 15", 
        'uncertainQty': True, 
        'tips': ["Squeeze the apples to make delicious apple juice!"], 
        'updateQtySuggestions': [1,2,3],
        'expiringSoon': True,
    }, 
    {
        'houseId': "20652932",
        'qty':"5", 
        'item': "Oranges", 
        'dateUpdated':"Added Monday, November 15", 
        'uncertainQty': False,
        'expiringSoon': False,
    },
    {
        'houseId': "20652932",
        'qty':"0.5 kg", 
        'item': "Broccoli", 
        'dateUpdated':"Added Sunday, November 14", 
        'uncertainQty': False,
        'expiringSoon': True,
    },
    {
        'houseId': "20652932",
        'qty':"", 
        'item': "Parmesean", 
        'dateUpdated':"Added Friday, November 13", 
        'uncertainQty': True,
        'updateQtySuggestions': [1,2,3],
        'expiringSoon': False,
    }
]

groceries = [
    {   
        'id': "32134",
        'name': "Alfredo Sauce",
        'qty': 1,
        'checked': False,
    },
    {
        'id': "32499",
        'name': "Chilli Flakes",
        'qty': 1,
        'checked': True,
    },
    {
        'id': "94483",
        'name': "Garlic cloves",
        'qty': 2,
        'checked': False,
    }
]

recipes = [{
    'imageUrl': "https://www.goodfood.com.au/content/dam/images/g/x/w/l/b/v/image.related.wideLandscape.940x529.gy0k5x.png/1507504076203.jpg",
    'itemTitle': "Linguini with Broccoli",
    'itemDetail': "An easy to cook linguini with delicious flavour and healthy ingredients.",
    'recipe': {
        'recipeName': "Linguini with Broccoli",
        'recipeId': "0001",
        'steps': [
          "Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.",
          "Steam broccoli with 2 tablespoons water in microwave for 6-7 minutes.",
          "In 10-inch skillet, heat olive oil and butter over low heat. Stir in garlic (more or less to suit your tastes) and red pepper slices; saute gently.",
          "Drain broccoli and add to skillet. Sprinkle lightly with garlic salt and saute broccoli and peppers until soft.",
          "Toss vegetable mixture with hot pasta. Sprinkle with Parmesan cheese."
        ],
        'ingredients': [
          "1 pound linguini pasta", 
          "1 pound fresh broccoli chopped", 
          "3 tablespoons extra virgin olive oil",
          "1 tablespoon butter"
        ]
      }
    }
]

@app.route("/", methods=['GET'])
def main():
    return render_template('index.html')

@app.route("/inventory", methods=['GET'])
def get_inventory():
    return json.dumps(inventory), 200, {'ContentType':'application/json'}

@app.route("/groceries", methods=['GET'])
def get_groceries():
    return json.dumps(groceries), 200, {'ContentType':'application/json'}

@app.route("/recipes", methods=['GET'])
def get_recipes():
    return json.dumps(recipes), 200, {'ContentType':'application/json'}

@app.route("/transactions", methods=['GET'])
def get_transactions():
    return render_template('transactions.html')

@app.route("/update", methods=['POST'])
def update_inventory():
    content = json.loads(request.data)
    food_item = content['queryResult']['parameters']['food']
    food_quantity = None
    food_quantity_ambiguous = None
    action = content['queryResult']['parameters']['action']
    if 'number' in content['queryResult']['parameters'].keys():
        food_quantity = content['queryResult']['parameters']['number'] if content['queryResult']['parameters']['number'] != "" else None
    if 'amount' in content['queryResult']['parameters'].keys():
        food_quantity_ambiguous = content['queryResult']['parameters']['amount'] if content['queryResult']['parameters']['amount'] != "" else None

    logging.info(food_item)
    logging.info(food_quantity)
    logging.info(action)
    if food_quantity_ambiguous == 'some' and action == 'insert':
        inventory[food_item] = ""
    elif food_quantity_ambiguous == 'all' and action == 'remove':
        inventory.pop(food_item, None)
    else:
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




