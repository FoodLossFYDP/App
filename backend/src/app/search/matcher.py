from fuzzywuzzy import fuzz
from fuzzywuzzy import process



def match(entity, e_type):
    e_list = retrieve_item_list(e_type)
    best_match = {
        word: None,
        ratio: 0
    }
    for e in e_list:
        ratio = fuzz.ratio(entity, e['name'])
        if ratio > best_match['ratio']:
            best_match['word'] = e
            best_match['ratio'] = ratio
    return best_match['word']

def retrieve_item_list(type):
    pass
    # TODO
    # query db to get all items
    # return object 
