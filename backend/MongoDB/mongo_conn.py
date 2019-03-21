import pymongo
import datetime
from datetime import timedelta
import json
import ssl
import time
import bson.json_util as bjson
from pprint import pprint
import logging

with open('config.json') as f:
    data = json.load(f)

# client = pymongo.MongoClient("mongodb+srv://"+data['mongo_user']+":"+data['mongo_password']+"@ambrdb-qchw8.mongodb.net/test?retryWrites=true",
#             ssl=True,
#             ssl_cert_reqs=ssl.CERT_NONE)
client = pymongo.MongoClient("mongodb://"+data['mongo_user']+":"+data['mongo_password']+"@ambrdb-shard-00-00-qchw8.mongodb.net:27017,ambrdb-shard-00-01-qchw8.mongodb.net:27017,ambrdb-shard-00-02-qchw8.mongodb.net:27017/test?ssl=true&replicaSet=AmbrDB-shard-0&authSource=admin&retryWrites=true")

# db = client.test

logging.basicConfig(level=logging.DEBUG)

db = client.Dev_DB

Food_Items = db.Food_Items
Inventory = db.Inventory
History = db.History
Users = db.Users
Grocery_List = db.Grocery_List


""" ________________ INVENTORY _________________________________________________"""

def get_the_inventory(houseId):
    s = list(Inventory.find({"houseId":houseId}))
    for item in s:
        if 'dateUpdated' in item:
            logging.info(type(item['dateUpdated']))
            if (not isinstance(item['dateUpdated'], type(1.0))):
                item['dateUpdated'] = time.mktime(item['dateUpdated'].timetuple())
    print(s)
    data = bjson.dumps(s)
    return data

def add_to_the_inventory(obj):
    data = {"houseId":obj["houseId"],"item":obj["item"],"qty":obj["qty"],"dateUpdated":obj["dateUpdated"]}
    query = {"item":obj["item"],"houseId":obj["houseId"]}
    if Inventory.find(query).count():
        Inventory.update(query, {"$inc":{"qty":obj["qty"]}})
    else:
        Inventory.insert_one(data)
    obj["Action"] = "Added {} {} to the Inventory".format(obj["qty"],obj["item"])
    History.insert_one(obj)
    return
    

def remove_from_the_inventory(obj):
    data = {"houseId":obj["houseId"],"item":obj["item"],"qty":obj["qty"]}
    query = {"item":obj["item"],"houseId":obj["houseId"]}
    if Inventory.find(query).count():
        Inventory.update(query, {"$inc":{"qty":-obj["qty"]}})
        new_quantity = Inventory.find_one(query)['qty']
        if new_quantity == 0:
            Inventory.delete_one(query)
        if new_quantity < 0:
             Inventory.find_one(query)['qty'] = -1
    obj["Action"] = "Added {} {} to the Inventory".format(obj["qty"],obj["item"])
    History.insert_one(obj)
    return

def delete_from_the_inventory(obj):
    data = {"houseId":obj["houseId"],"item":obj["item"],}
    query = {"item":obj["item"],"houseId":obj["houseId"]}
    if Inventory.find(query).count():
        Inventory.delete_one(query)
    obj["Action"] = "Deleted {} from the Inventory".format(obj["item"])
    History.insert_one(obj)
    return

"""___________________ GROCERY LIST ____________________________________________"""

def get_the_grocery_list(houseId):
    s = list(Grocery_List.find({"houseId":houseId}))
    logging.info(s)
    for item in s:
        if 'dateUpdated' in item:
            logging.info(item['dateUpdated'])
            item['dateUpdated'] = time.mktime(item['dateUpdated'].timetuple())
    print(s)
    data = bjson.dumps(s)
    return data

# def add_to_the_grocery_list(obj):
#     data = {"houseId":obj["houseId"],"item":obj["item"],"qty":obj["qty"]}
#     query = {"item":obj["item"],"houseId":obj["houseId"]}
#     if Grocery_List.find(query).count():
#         Grocery_List.update(query, {"$inc":{"qty":obj["qty"]}})
#     else:
#         Grocery_List.insert_one(data)
#     obj["Action"] = "Added {} {} to grocery list".format(obj["qty"],obj["item"])
#     History.insert_one(obj)
#     return

def add_to_the_grocery_list(obj):
    data = {"houseId":obj["houseId"],"item":obj["item"], "itemId":obj["itemId"]}
    query = {"item":obj["item"],"houseId":obj["houseId"]}
    if Grocery_List.find(query).count():
        Grocery_List.update(query, {"$inc":{"qty":obj["qty"]}})
    else:
        Grocery_List.insert_one(data)
    obj["Action"] = "Added {} {} to grocery list".format(obj["qty"],obj["item"])
    History.insert_one(obj)
    return

def remove_from_the_grocery_list(obj):
    data = {"houseId":obj["houseId"],"item":obj["item"]}
    query = {"item":obj["item"],"houseId":obj["houseId"]}
    if Grocery_List.find(query).count():
        Grocery_List.delete_one(query)
    else:
        print("Nothing Here")
        return
    obj["Action"] = "removed {} from grocery list".format(obj["item"])
    History.insert_one(data)
    return


"""___________________ HISTORY _________________________________________________"""

def get_historical_data(obj):
    s = list(History.find({"houseId":houseId}))

def DELETE_HISTORY(obj):
    s = list(History.find({"houseId":houseId}))



# client.close()
