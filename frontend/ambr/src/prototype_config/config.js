export const inventoryItems = [
    {
        houseId: "20652932",
        qty:"0.5 kg", 
        item: "Linguini", 
        dateUpdated:"Added Tuesday, November 16", 
        uncertainQty: false,
        expiringSoon: false,
    },
    {
        houseId: "20652932",
        qty: "10", 
        item: "Apples", 
        dateUpdated: "Added Monday, November 15", 
        uncertainQty: true, 
        tips: ["Squeeze the apples to make delicious apple juice!"], 
        updateQtySuggestions: [1,2,3],
        expiringSoon: true,
    }, 
    {
        houseId: "20652932",
        qty:"5", 
        item: "Oranges", 
        dateUpdated:"Added Monday, November 15", 
        uncertainQty: false,
        expiringSoon: false,
    },
    {
        houseId: "20652932",
        qty:"0.5 kg", 
        item: "Broccoli", 
        dateUpdated:"Added Sunday, November 14", 
        uncertainQty: false,
        expiringSoon: true,
    },
    {
        houseId: "20652932",
        qty:"", 
        item: "Parmesean", 
        dateUpdated:"Added Friday, November 13", 
        uncertainQty: true,
        updateQtySuggestions: [1,2,3],
        expiringSoon: false,
    },
];

export const recipeItems = [{
    imageUrl: "https://www.goodfood.com.au/content/dam/images/g/x/w/l/b/v/image.related.wideLandscape.940x529.gy0k5x.png/1507504076203.jpg",
    itemTitle: "Linguini with Broccoli",
    itemDetail: "An easy to cook linguini with delicious flavour and healthy ingredients.",
    recipe: {
        recipeName: "Linguini with Broccoli",
        recipeId: "0001",
        steps: [
          "Bring a large pot of lightly salted water to a boil. Add pasta and cook for 8 to 10 minutes or until al dente; drain.",
          "Steam broccoli with 2 tablespoons water in microwave for 6-7 minutes.",
          "In 10-inch skillet, heat olive oil and butter over low heat. Stir in garlic (more or less to suit your tastes) and red pepper slices; saute gently.",
          "Drain broccoli and add to skillet. Sprinkle lightly with garlic salt and saute broccoli and peppers until soft.",
          "Toss vegetable mixture with hot pasta. Sprinkle with Parmesan cheese."
        ],
        ingredients: [
          "1 pound linguini pasta", 
          "1 pound fresh broccoli chopped", 
          "3 tablespoons extra virgin olive oil",
          "1 tablespoon butter"
        ]
      }
    }
];

export const groceryItems = [
    {   
        id: "32134",
        name: "Alfredo Sauce",
        qty: 1,
        checked: false,
    },
    {
        id: "32499",
        name: "Chilli Flakes",
        qty: 1,
        checked: true,
    },
    {
        id: "94483",
        name: "Garlic cloves",
        qty: 2,
        checked: false,
    }
]

export const foodItems = [
    {"name":"apples","fridge":{"min":30,"max":60},"freezer":{"min":-1,"max":-1},"counter":{"min":7,"max":14},"tags":["produce", "fruit"]},
    {"name":"avocados","fridge":{"min":7,"max":10},"freezer":{"min":-1,"max":-1},"counter":{"min":3,"max":4},"tags":["produce"]},
    {"name":"blueberries","fridge":{"min":5,"max":10},"freezer":{"min":180,"max":240},"counter":{"min":2,"max":3},"tags":["produce", "fruit"]},
    {"name":"bananas","fridge":{"min":2,"max":9},"freezer":{"min":60,"max":90},"counter":{"min":2,"max":7},"tags":["produce", "fruit"]},
    {"name":"cherries","fridge":{"min":5,"max":10},"freezer":{"min":180,"max":240},"counter":{"min":2,"max":3},"tags":["produce", "fruit"]},
    {"name":"coconut","fridge":{"min":14,"max":21},"freezer":{"min":180,"max":240},"counter":{"min":7,"max":7},"tags":["produce", "fruit"]},
    {"name":"figs","fridge":{"min":5,"max":7},"freezer":{"min":180,"max":240},"counter":{"min":2,"max":5},"tags":["produce", "fruit"]},
    {"name":"grapes","fridge":{"min":5,"max":10},"freezer":{"min":90,"max":150},"counter":{"min":3,"max":5},"tags":["produce", "fruit"]},
    {"name":"lemons","fridge":{"min":30,"max":60},"freezer":{"min":-1,"max":-1},"counter":{"min":14,"max":24},"tags":["produce", "fruit"]},
    {"name":"limes","fridge":{"min":30,"max":60},"freezer":{"min":-1,"max":-1},"counter":{"min":14,"max":24},"tags":["produce", "fruit"]},
    {"name":"oranges","fridge":{"min":30,"max":60},"freezer":{"min":-1,"max":-1},"counter":{"min":14,"max":21},"tags":["produce", "fruit"]},
    {"name":"peaches","fridge":{"min":4,"max":5},"freezer":{"min":180,"max":270},"counter":{"min":3,"max":4},"tags":["produce", "fruit"]},
    {"name":"pineapple","fridge":{"min":4,"max":5},"freezer":{"min":90,"max":150},"counter":{"min":2,"max":3},"tags":["produce", "fruit"]},
    {"name":"pomegranate","fridge":{"min":21,"max":21},"freezer":{"min":-1,"max":-1},"counter":{"min":null,"max":null},"tags":["produce", "fruit"]},
    {"name":"strawberries","fridge":{"min":5,"max":7},"freezer":{"min":180,"max":240},"counter":{"min":1,"max":2},"tags":["produce", "fruit"]},
    {"name":"tomatoes","fridge":{"min":14,"max":14},"freezer":{"min":-1,"max":-1},"counter":{"min":7,"max":7},"tags":["produce"]},
    {"name":"asparagus","fridge":{"min":5,"max":7},"freezer":{"min":-1,"max":-1},"counter":{"min":null,"max":null},"tags":["produce","vegetable"]},
    {"name":"broccoli","fridge":{"min":7,"max":14},"freezer":{"min":-1,"max":-1},"counter":{"min":null,"max":null},"tags":["produce","vegetable"]},
    {"name":"carrots","fridge":{"min":28,"max":35},"freezer":{"min":-1,"max":-1},"counter":{"min":null,"max":null},"tags":["produce","vegetable"]},
    {"name":"cauliflower","fridge":{"min":7,"max":21},"freezer":{"min":-1,"max":-1},"counter":{"min":null,"max":null},"tags":["produce","vegetable"]},
]