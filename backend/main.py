from flask import Flask 
import json

app = Flask(__name__)

@app.route("/", methods=['GET'])
def main():
    pass
    #return render_template('index.html')

@app.route("/inventory", methods=['GET'])
def get_inventory():
    return json.dumps({'inventory': 'ayo'}), 200, {'ContentType':'application/json'}

@app.route("/update", methods=['POST'])
def update_inventory():
    pass



