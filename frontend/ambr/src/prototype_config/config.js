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