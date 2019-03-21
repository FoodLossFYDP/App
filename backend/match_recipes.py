import numpy as np
import math
import sys
import os
import json
sys.path.insert(0, os.path.dirname(os.path.abspath("main.py"))+"/MongoDB")
import mongo_conn as mc

Inventory = mc.Inventory
Food_Items = mc.Food_Items
Recipes = mc.Recipes


Ingredients = [1,1,1,1,1]

Recipes = [ [1,0,1,0,1],
            [0,1,1,1,1] ]

def match_recipes(houseId):
    houseId = 1
    inventory = mc.get_fridge_state_vector(houseId)
    recipes_mat = np.asarray(mc.get_the_recipes_vector(),dtype=float)
    inventory = np.asarray(inventory,dtype=float)
    vag_idxs = np.where(inventory < 0)
    inv_len = len(inventory)
    recipes = np.asarray(recipes_mat, dtype=float)
    recipe_difference_vectors = inventory - recipes_mat
    recipe_difference_vectors[vag_idxs] = 1 # how we deal with ambigious amounts
    rankings = []
    for id_r,recipe in enumerate(recipe_difference_vectors):
        num_ingredients = 0
        num_missing = 0
        expiry_days = 0
        for id_f,ingr in enumerate(recipe):
            if recipes[id_r][id_f] > 0: # recipe requires this ingredient
                num_ingredients +=1     # how many items does this recipe require
                if ingr < 0:            # we don't have enough of the ingredient
                    num_missing+=1
                else:            # we got this ingredient we just need to findd the recipe_difference_vector
                    expiry_days += get_expiry_day(id_f)
        if num_ingredients == 0: # we can't cook this so put really high bad weight
            percentage_missing = 10000
            expiry_days_ratio = 10000
        else:
            percentage_missing = num_missing/num_ingredients
            expiry_days_ratio = expiry_days/num_ingredients
        obj_function = percentage_missing + expiry_days_ratio
        rankings.append([obj_function,id_r])
        rankings = sorted(rankings, key=lambda x : x[0])
    print(rankings)
    recipe_arr = mc.get_recipes()
    return_arr = []
    for idx, val in rankings:
        return_arr.append(recipe_arr[val])
    return json.dumps(return_arr)



def get_expiry_day(food_index):
    qty = Food_Items.find({"food_index":food_index})[0]['fridge']['min']
    return qty


print(match_recipes(1))
