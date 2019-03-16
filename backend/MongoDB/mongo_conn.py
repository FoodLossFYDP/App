import pymongo
import datetime
from datetime import timedelta
import json
import ssl
import time
import bson.json_util as bjson
from pprint import pprint

with open('config.json') as f:
    data = json.load(f)

client = pymongo.MongoClient("mongodb+srv://"+data['mongo_user']+":"+data['mongo_password']+"@ambrdb-qchw8.mongodb.net/test?retryWrites=true",
            ssl=True,
            ssl_cert_reqs=ssl.CERT_NONE)

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
            item['dateUpdated'] = time.mktime(item['dateUpdated'].timetuple())
    print(s)
    data = bjson.dumps(s)
    return data

def add_to_the_inventory(obj):
    data = {"houseId":obj["houseId"],"item":obj["item"],"qty":obj["qty"]}
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
        if new_quantity <= 0:
            Inventory.delete_one(query)
    obj["Action"] = "Added {} {} to the Inventory".format(obj["qty"],obj["item"])
    History.insert_one(obj)
    return

"""___________________ GROCERY LIST ____________________________________________"""

def get_the_grocery_list(houseId):
    s = list(Grocery_List.find({"houseId":houseId}))
    for item in s:
        if 'dateUpdated' in item:
            item['dateUpdated'] = time.mktime(item['dateUpdated'].timetuple())
    print(s)
    data = bjson.dumps(s)
    return data

def add_to_the_grocery_list(obj):
    data = {"houseId":obj["houseId"],"item":obj["item"],"qty":obj["qty"]}
    query = {"item":obj["item"],"houseId":obj["houseId"]}
    if Grocery_List.find(query).count():
        Grocery_List.update(query, {"$inc":{"qty":obj["qty"]}})
    else:
        Grocery_List.insert_one(data)
    obj["Action"] = "Added {} {} to grocery list".format(obj["qty"],obj["item"])
    History.insert_one(obj)
    return

def remove_from_the_grocery_list(obj):
    data = {"houseId":obj["houseId"],"item":obj["item"],"qty":obj["qty"]}
    query = {"item":obj["item"],"houseId":obj["houseId"]}
    if Grocery_List.find(query).count():
        Grocery_List.update(query, {"$inc":{"qty":-obj["qty"]}})
        new_quantity = Grocery_List.find_one(query)['qty']
        if new_quantity <= 0:
            Grocery_List.delete_one(query)
    else:
        print("Nothing Here")
        return
    obj["Action"] = "removed {} {} from grocery list".format(obj["qty"],obj["item"])
    History.insert_one(data)
    return

"""___________________ HISTORY _________________________________________________"""

def get_historical_data(obj):
    s = list(History.find({"houseId":houseId}))

def DELETE_HISTORY(obj):
    s = list(History.find({"houseId":houseId}))



# client.close()
