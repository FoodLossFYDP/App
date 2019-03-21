from flask import Flask, request, render_template,jsonify
import json
import logging
import os
import sys
import pymongo
from datetime import datetime
import time
import pprint
from datetime import timedelta
import bson.json_util as bjson
import match_recipes as mr
sys.path.insert(0, os.path.dirname(os.path.abspath("main.py"))+"/MongoDB")
import mongo_conn as mc

app = Flask(__name__)
logging.basicConfig(level=logging.DEBUG)
mongo_inventory = mc.Inventory

inventory_hardcoded = [
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

groceries_hardcoded = [
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

recipes_hardcoded = [
    {
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
    },
    {
    'imageUrl': "http://d6h7vs5ykbiug.cloudfront.net/wp-content/uploads/2013/01/Easy_Kale_Chip_Recipe-5.jpg",
    'itemTitle': "Kale Chips",
    'itemDetail': "Crunchy and Healthy Chips",
    'recipe': {
        'recipeName': "Kale Chips",
        'recipeId': "0002",
        'steps': [
          "Preheat oven to 400 degrees. Place kale leaves on a large rimmed baking tray.",
          "Drizzle leaves with olive oil; season with chili flakes, salt, and pepper; then toss with hands until leaves are totally coated",
          "Bake until edges begin to brown, 10 to 15 minutes."
        ],
        'ingredients': [
          "1 bunch (about 6 ounces) kale leaves, stems discarded",
          "2 to 3 Tbsp. olive oil",
          "1/2 cup plus 2 Tbsp. olive oil, plus more for drizzling",
          "Kosher salt",
	        "Pinch of chili flakes",
	        "Salt and pepper to taste"
        ]
      }
    },
    {
    'imageUrl': "https://cdn.namelymarly.com/wp-content/uploads/2018/04/20180326_Carrot_Hummus_02-web.jpg",
    'itemTitle': "Roasted Carrot Hummus",
    'itemDetail': "A health cracker dip, not just your traditional hummus!",
    'recipe': {
        'recipeName': "Roasted Carrot Hummus",
        'recipeId': "0003",
        'steps': [
          "Preheat oven to 425 degrees. Place carrots on a rimmed baking sheet with 0.5 tsp. paprika, a drizzle of olive oil, and a sprinkling of salt. Roast until soft and tender, 30 to 40 minutes, adding garlic cloves during final 10 minutes. Let cool.",
          "Meanwhile, place chickpeas in a food processor with olive oil, tahini, lemon juice, cumin, remaining 1 tsp. paprika, and salt to taste. Add 0.25 cup water and blend until smooth.",
          "Once carrots and garlic have cooled, add to processor and finish blending until smooth. Scoop into a bowl, drizzle with olive oil, season with paprika, and serve with chips. Hummus will keep in an airtight container in the fridge for up to 7 days.",
        ],
        'ingredients': [
          "4 medium carrots (about 14 ounces), peeled and chopped into quarters",
          "1 1/2 tsp. sweet paprika, divided, plus more for seasoning",
          "1/2 cup plus 2 Tbsp. olive oil, plus more for drizzling",
          "Kosher salt",
	  "3 garlic cloves, peeled",
	  "2 (15-ounce) cans chickpeas, drained and rinsed",
	  "3 Tbsp. tahini",
	  "Juice of 2 to 3 lemons",
   	  "1 tsp. ground cumin",
        ]
      }
    },
    {
    'imageUrl': "https://cdn-image.myrecipes.com/sites/default/files/styles/medium_2x/public/image/recipes/ck/fruit-salad-ck-1206174-x.jpg?itok=mXMlWEO1",
    'itemTitle': "Summertime Fruit Salad with Cream",
    'itemDetail': "Refreshing berry salad for anytime you need something sweet",
    'recipe': {
        'recipeName': "Summertime Fruit Salad with Cream",
        'recipeId': "0005",
        'steps': [
          "Combine 1/3 cup water, 5 tablespoons sugar, 1/4 cup Chambord, and juice in a small saucepan over medium-low heat; bring to a boil. Simmer 8 minutes or until sugar dissolves, stirring frequently. Remove from heat, and cool.",
          "Combine nectarines and next 4 ingredients (through blueberries) in a large bowl. Add sugar mixture, and toss gently to coat.",
          "Place whipping cream and 2 teaspoons sugar in a medium bowl, and beat with a mixer at high speed until stiff peaks form. Fold in 1 teaspoon Chambord. Serve whipped cream over fruit, and sprinkle evenly with almonds.",
        ],
        'ingredients': [
          "1/3 cup water",
          "5 tablespoons sugar",
          "1/4 cup Chambord (raspberry-flavored liqueur)",
          "2 tablespoons fresh lemon juice"
	  "2 cups diced nectarines",
	  "1 cup pitted and halved sweet cherries",
	  "1 cup sliced strawberries",
          "1 cup fresh raspberries",
	  "1 cup fresh blueberries",
	  "1/3 cup whipping cream",
          "2 teaspoons sugar",
	  "1 teaspoon Chambord (raspberry-flavored liqueur)",
	  "3 tablespoons slivered almonds, toasted"
        ]
      }
    },
    {
    'imageUrl': "https://images.media-allrecipes.com/userphotos/560x315/999101.jpg",
    'itemTitle': "Lemon and Garlic Broccoli",
    'itemDetail': "A great accompaniment to all dishes!",
    'recipe': {
        'recipeName': "Lemon and Garlic Broccoli",
        'recipeId': "0006",
        'steps': [
          "Place broccoli florets in a large skillet over medium heat. Stir 2 teaspoons lemon juice into water in a small bowl and pour the mixture into the skillet. Cover and steam until broccoli is bright green and tender, 10 to 15 minutes",
          "While broccoli is steaming, melt butter in a small saucepan over medium-low heat and stir in garlic and salt; turn heat to low and let the garlic gently fry until golden brown, about 8 minutes. Drain water from cooked broccoli and return to skillet; sprinkle with 2 more teaspoons lemon juice and the butter and garlic mixture. Sprinkle broccoli with black pepper, toss to combine, and season with a bit more pepper if desired."
        ],
        'ingredients': [
          "1 pound broccoli, separated into florets",
          "2 teaspoons fresh lemon juice",
          "2 tablespoons water",
          "3 tablespoons butter"
	  "2 cloves garlic, minced",
	  "1 pinch salt",
	  "2 teaspoons lemon juice",
          "1 teaspoon ground black pepper",
        ]
      }
    },
    {
    'imageUrl': "https://www.epicurus.com/food/recipes/wp-content/uploads/2011/10/butternut-squash-soup3.jpg",
    'itemTitle': "Butternut Squash Soup",
    'itemDetail': "Super easy, quick and great way to use squash",
    'recipe': {
        'recipeName': "Butternut Squash Soup",
        'recipeId': "0007",
        'steps': [
          "Melt the butter in a large pot, and cook the onion, celery, carrot, potatoes, and squash 5 minutes, or until lightly browned. Pour in enough of the chicken stock to cover vegetables. Bring to a boil. Reduce heat to low, cover pot, and simmer 40 minutes, or until all vegetables are tender.",
          "Transfer the soup to a blender, and blend until smooth. Return to pot, and mix in any remaining stock to attain desired consistency. Season with salt and pepper."
        ],
        'ingredients': [
          "2 tablespoons butter",
          "1 small onion, chopped",
          "1 stalk celery, chopped",
          "1 medium carrot, chopped"
	  "2 medium potatoes, cubed",
	  "1 medium butternut squash - peeled, seeded and cubed",
	  "1 container (32 fluid ounce) chicken stock",
          "Salt and freshly grounded black better to taste"
        ]
      }
    },
    {
    'imageUrl': "https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/20/1280x1919/gallery-1494874843-mike-garten-daphnes-sorbet-0617.jpg?resize=980:*",
    'itemTitle': "Basil Berry Lemonade Sorbet",
    'itemDetail': "Bet you thought sorbet couldn't be this easy!",
    'recipe': {
        'recipeName': "Basil Berry Lemonade Sorbet",
        'recipeId': "0008",
        'steps': [
          "In medium saucepan, combine sugar and 1 cup water. Heat on high until sugar dissolves, stirring occasionally. Add basil. Remove from heat, cover and let stand 15 minutes. Strain syrup into medium bowl, discarding basil. Refrigerate until cold.",
          "In blender, pureeberries, lemon juice and cooled basil syrup until smooth. Transfer to metal 8-inch square baking pan. Cover with plastic wrap and freeze only until firm enough to scoop (about 2 hours). If sorbet is too hard to scoop, let stand at room temperature until slightly thawed"
        ],
        'ingredients': [
          "1 cup sugar",
          "1 cup lightly packed fresh basil",
          "6 cups fresh mixed berries",
          "3/4 cup lemon juice (from about 4 lemons)"
        ]
      }
    }
]

inventory = {}


""" ________________ PAGE LINKS ______________________________________________"""


@app.route("/", methods=['GET'])
def main():
    return render_template('index.html')

@app.route("/transactions", methods=['GET'])
def get_transactions():
    return render_template('transactions.html')

@app.route("/testr", methods=['GET'])
def testr():
    houseId = int(request.args.get("houseId"))
    username = str(request.args.get("username"))
    item_list = request.args.get("item_list")
    # test = json.loads(item_list)
    logging.info("\n\n\n")
    logging.info("houseId:\t"  + str(houseId))
    logging.info("username:\t" + username)
    logging.info("items:\t"    + str(item_list))
    logging.info("\n\n\n")

    for item_obj in item_list:
        logging.info(item_obj)
    data = bjson.dumps(mc.Read_Inventory(houseId))
    return data, 200, {'ContentType':'application/json'}



""" ________________ INVENTORY _________________________________________________"""

@app.route("/get_inventory", methods=['GET'])
def get_inventory():
    houseId = int(request.args.get("houseId"))
    data = mc.get_the_inventory(houseId)
    logging.info("INVENTORY DATA: ==============")
    logging.info(data)
    return data, 200, {'ContentType':'application/json'}

@app.route("/add_inventory", methods=['GET'])
def add_inventory():
    obj = { "houseId":int(request.args.get("houseId")),
            "username":str(request.args.get("username")),
            "item":str(request.args.get("item")).lower(),
            "qty":float(request.args.get("qty")),
            "measurement":str(request.args.get("measurement")),
            "dateUpdated": datetime.fromtimestamp(int(request.args.get("dateUpdated"))/1000)}
    mc.add_to_the_inventory(obj)
    return get_inventory()

@app.route("/remove_inventory", methods=['GET'])
def remove_inventory():
    obj = { "houseId":int(request.args.get("houseId")),
            "username":str(request.args.get("username")),
            "item":str(request.args.get("item")).lower(),
            "qty":float(request.args.get("qty"))}
    mc.remove_from_the_inventory(obj)
    return get_inventory()

@app.route("/delete_inventory", methods=['GET'])
def delete_inventory():
    obj = { "houseId":int(request.args.get("houseId")),
            "item":str(request.args.get("item")).lower()}
    mc.delete_from_the_inventory(obj)
    return get_inventory()

"""___________________ GROCERY LIST ___________________________________________"""

@app.route("/get_grocery_list", methods=['GET'])
def get_grocery_list():
    houseId = int(request.args.get("houseId"))
    data = mc.get_the_grocery_list(houseId)
    logging.info("=================Grocery List====================")
    logging.info(data)
    return data, 200, {'ContentType':'application/json'}

@app.route("/add_to_grocery_list", methods=['GET'])
def add_to_grocery_list():
    obj = { "houseId":int(request.args.get("houseId")),
            "item":str(request.args.get("item")).lower(),
            "itemId":float(request.args.get("itemId"))}
    mc.add_to_the_grocery_list(obj)
    return get_grocery_list()

@app.route("/remove_from_grocery_list", methods=['GET'])
def remove_from_grocery_list():
    obj = { "houseId":int(request.args.get("houseId")),
            "item":str(request.args.get("item")).lower()}
    mc.remove_from_the_grocery_list(obj)
    return get_grocery_list()

@app.route("/update_grocery_list", methods=['GET'])
def update_grocery_list():
    obj = { "houseId":int(request.args.get("houseId")),
            "item":str(request.args.get("item")).lower(),
            "itemId": str(request.args.get("itemId"))}
    query = {"itemId":obj["itemId"], "houseId":obj["houseId"]}
    db_item = mc.Grocery_List.find(query).count()
    if db_item == 0:
        mc.add_to_the_grocery_list(obj)
        return {}, 200, {'ContentType':'application/json'}
    else:
        result = mc.Grocery_List.update(query, {"$set":{"item":obj["item"]}})
        return json.dumps({}), 200, {'ContentType':'application/json'}

""" ________________ History ___________________________________________________"""
@app.route("/history", methods=['GET'])
def get_history():
    houseId = int(request.args.get("houseId"))
    data = mc.get_historical_data(houseId)
    return data, 200, {'ContentType':'application/json'}


""" ________________ HARD_CODED ________________________________________________"""
backend_inventory = {}


@app.route("/update", methods=['POST'])
def update_inventory():
    content = json.loads(request.data)
    logging.info("======================")
    logging.info("======================")
    logging.info(content['queryResult']['intent'])
    if content['queryResult']['intent']['displayName'] == 'Clarify intent':
        if content['queryResult']['parameters']['unknown'] == 'unknown':
            return json.dumps({
                "payload": {
                    "google": {
                    "expectUserResponse": True,
                    "richResponse": {
                        "items": [
                        {
                            "simpleResponse": {
                            "textToSpeech": "Ok. Anything else?"
                            }
                        }
                        ]
                    }
                    }
                }
            }), 200, {'ContentType':'application/json'}
        else:
            food_item = content["queryResult"]["outputContexts"][0]['parameters']["food"][0]
            query = {"item":food_item,"houseId":1}
            result = mongo_inventory.update(query, {"$set":{"qty":content["queryResult"]["parameters"]["number"]}})
            logging.info("Updated item " + food_item)
            logging.info("Result.............")
            logging.info(result)
            return json.dumps({
                "payload": {
                    "google": {
                    "expectUserResponse": True,
                    "richResponse": {
                        "items": [
                        {
                            "simpleResponse": {
                            "textToSpeech": "Thank you. Anything else?"
                            }
                        }
                        ]
                    }
                    }
                }
            }), 200, {'ContentType':'application/json'}

    food_items = content['queryResult']['parameters']['food']
    food_quantities = None
    food_quantity_ambiguous = None
    action = content['queryResult']['parameters']['action']
    if 'number' in content['queryResult']['parameters'].keys():
        food_quantities = content['queryResult']['parameters']['number'] if content['queryResult']['parameters']['number'] != "" else None
    if 'amount' in content['queryResult']['parameters'].keys():
        food_quantity_ambiguous = content['queryResult']['parameters']['amount'] if content['queryResult']['parameters']['amount'] != "" else None
    logging.info("items " + str(food_items))
    logging.info("quantities " + str(food_quantities))
    logging.info("action " + action)
    if food_quantity_ambiguous != None:
        food_item = food_items[0]
        i = dict()
        i["item"] = food_item
        i["qty"] = -1
        i['uncertainQty'] = True
        i['updateQtySuggestions'] = [1,2,3]
        i["houseId"] = 1
        if action == 'insert':
            i["Action"] = "Added to Inventory"
            logging.info("Ambiguous")
            logging.info("item add")
            result = mongo_inventory.update({"item":food_item,"houseId":i["houseId"]}, {'$set': {"qty":-1}})
            mc.History.insert_one(i)
        else:
            i["Action"] = "Removed from Inventory"
            logging.info("Ambiguous")
            logging.info("item remove")
            result = mongo_inventory.update({"item":food_item,"houseId":i["houseId"]}, {'$set': {"qty":-1}})
            mc.History.insert_one(i)
            return json.dumps({
            "payload": {
                "google": {
                "expectUserResponse": True,
                "richResponse": {
                    "items": [
                        {
                            "simpleResponse": {
                                "textToSpeech": "How many "+ i["item"] +"s are left?"
                            }
                        }
                    ]
                }
                }
            }
        }), 200, {'ContentType':'application/json'}
    for food_item, food_quantity in zip(food_items, food_quantities):
        i = dict()
        i["item"] = food_item
        i["qty"] = food_quantity
        i['uncertainQty'] = False
        i['updateQtySuggestions'] = [1,2,3]
        i["houseId"] = 1
        i["dateUpdated"] = time.time()
        query = {"item":food_item,"houseId":i["houseId"]}
        result = ""

        if mongo_inventory.find(query).count():
            db_item = mongo_inventory.find(query)[0]
            logging.info("DB ITEM COUNT: ")
            logging.info(db_item["qty"])
            count = db_item["qty"]
            if action == 'insert':
                i["Action"] = "Added to Inventory"
                logging.info("Update add")
                logging.info(i["qty"])
                if count < 0:
                    result = mongo_inventory.update(query, {"$set":{"qty":-1, "dateUpdated":time.time()}})
                else:
                    result1 = mongo_inventory.update(query, {"$inc":{"qty":i["qty"]},"$set":{"dateUpdated":time.time()}})
            else:
                logging.info("Update remove")
                logging.info(i["qty"])
                logging.info(count)
                if count < 0:
                    result = mongo_inventory.update(query, {"$set":{"qty":-1,"dateUpdated":time.time()}})
                else:
                    result = mongo_inventory.update(query, {"$inc":{"qty":-i["qty"]},"$set":{"dateUpdated":time.time()}})
                new_quantity = mongo_inventory.find_one(query)['qty']
                logging.info(new_quantity)
                if new_quantity == 0:
                    mongo_inventory.delete_one(query)
                if new_quantity < 0:
                    mongo_inventory.find_one(query)['qty'] = -1
        else:
            i["Action"] = "Added to Inventory"
            result = mongo_inventory.insert_one(i)
        logging.info(result)
        mc.History.insert_one(i)
    return json.dumps({
        "payload": {
            "google": {
            "expectUserResponse": True,
            "richResponse": {
                "items": [
                {
                    "simpleResponse": {
                    "textToSpeech": "Anything else?"
                    }
                }
                ]
            }
            }
        }
    }), 200, {'ContentType':'application/json'}

@app.route("/inventory", methods=['GET'])
def inventory():
    return json.dumps(inventory_hardcoded), 200, {'ContentType':'application/json'}

@app.route("/groceries", methods=['GET'])
def groceries():
    return json.dumps(groceries_hardcoded), 200, {'ContentType':'application/json'}

@app.route("/recipes", methods=['GET'])
def recipes(houseId=1):
    return json.dumps(mr.match_recipes(houseId)), 200, {'ContentType':'application/json'}

    # return json.dumps(recipes_hardcoded), 200, {'ContentType':'application/json'}
# print(mr.match_recipes(1))
# def match_recipes(inventory_list, recipe):
#     remainder_vector = []
#     for inv_item, recipe_item in zip(inventory_list, recipe):
#         remainder_vector.append(inv_item - recipe_item)
#     missing_items = []
#     for index, item in enumerate(remainder_vector):
#         if item < 0:
#             missing_items.append(index)
#     print(missing_items)
