from main import app
from main import *
import unittest
import logging

""" UNIT TESTING FOR FLASK"""

class FlaskTestCase(unittest.TestCase):
    #Ensure that Flask was setup correctly
    def test_mainpage(self):
        tester = app.test_client(self)
        response = tester.get('/',content_type = 'html/text')
        self.assertEqual(response.status_code, 200)

    def test_loading_Inventory(self):
        tester = app.test_client(self)
        response = tester.get('/get_inventory?houseId=1',content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

    def test_add_to_inventory(self):
        tester = app.test_client(self)
        response = tester.get('/add_inventory?houseId=1&item=Zucchini&qty=1&username=Ali Akram',content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

    def test_remove_from_inventory(self):
        tester = app.test_client(self)
        response = tester.get('/remove_inventory?houseId=1&item=Zucchini&qty=1&username=Ali Akram',content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

    def test_loading_Grocery_List(self):
        tester = app.test_client(self)
        response = tester.get('/get_grocery_list?houseId=1',content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

    def test_add_to_Grocery_List(self):
        tester = app.test_client(self)
        response = tester.get('/add_to_grocery_list?houseId=1&item=Zucchini&qty=1&username=Ali Akram',content_type = 'application/json')
        self.assertEqual(response.status_code, 200)

    def test_remove_from_Grocery_List(self):
        tester = app.test_client(self)
        response = tester.get('/remove_from_grocery_list?houseId=1&item=Zucchini&qty=1&username=Ali Akram',content_type = 'application/json')
        self.assertEqual(response.status_code, 200)


if __name__ == '__main__':
    unittest.main()
