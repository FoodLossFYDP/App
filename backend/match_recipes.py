import numpy as np
import math


food_item_map = {
                    0: ["cake",5],
                    1: ["banana",3],
                    2: ["apple",2],
                    3: ["probitics",4],
                    4: ["strawberry",3]
                }

Ingredients = [1,1,1,1,1]

Recipes = [ [1,0,1,0,1],
            [0,1,1,1,1] ]

def match_recipes(inventory_list, recipes):
    inventory = np.asarray(inventory_list)
    inv_len = len(inventory)
    recipes = np.asarray(recipes)
    recipe_difference_vectors = inventory - recipes
    # print("Missing Items:")
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
                    # print("-> "+str(food_item_map[id_f][0]))
                else:            # we got this ingredient we just need to findd the recipe_difference_vector
                    expiry_days += food_item_map[id_f][1]
        percentage_missing = num_missing/num_ingredients
        expiry_days_ratio = expiry_days/num_ingredients
        obj_function = pnercentage_missing + expiry_days_ratio
        rankings.append([obj_function,id_r])
        rankings = sorted(rankings, key=lambda x : x[0])
    return rankings


print(match_recipes(Ingredients, Recipes))
