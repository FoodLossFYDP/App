import numpy as np

def match_recipes(inventory_list, recipe):
    inventory = np.array(inventory_list)
    recipe_vector = np.array(recipe)
    remainder_vector = np.subtract(inventory.copy(), recipe_vector)
    missing_items = []
    for index, item in enumerate(remainder_vector):
        print(item)
        if item < 0: 
            missing_items.append(index)
    return(missing_items)

match_recipes([0,1,2], [0,1,3])