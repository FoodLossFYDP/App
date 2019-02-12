import pymongo
import dns
from pprint import pprint


# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
# Copy the SRV address from Mongo Cluster
User_Name = "user_name"
Password = "password"
client = pymongo.MongoClient("mongodb+srv://"+User_Name+":"+Password+"@ambrdb-qchw8.mongodb.net/test?retryWrites=true") ###<-- MONGODB URI GOES HERE
db = client.get_database('Dev_DB') # DATABASE Name here


# These are the Collections in our DATABASE
History = db.History
Food_Items = db.Food_Items
Fridge = db.Fridge_Items
Users = db.Users


# Perform Operations on the Collections in our DATABASE
def Insert_Item(collection, data):
    if collection.count(data) != True:
        collection.insert_one(data)

def Delete_Item(collection,data):
    if collection.count(data) == True:
        collection.delete_one(data)

def Read_Items(collection,data):
    return collection.find()

def Find_Item(collection,data):
    return collection.find_one(data)
