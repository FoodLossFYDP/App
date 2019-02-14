# Base Repo for Ambr



## Steps for Installing
1. Download appengine_config.py and app.yaml and save it to /backend
2. In /backend, run `virtualenv venv` in the terminal. Activate the virtual environment by entering `source venv/bin/activate`. You should see (venv) next to the terminal input line. Verify the python version is 2.7.10 by entering `python -V`. 
3. Set up a `virtualenv` in python and `activate` it
4. run `pip install -r requirements.txt` in the backend directory
5. go to frontend/ambr and run `npm install`
6. go to /app and run `chmod 755 build.sh`
7. run `./build.sh`
8. run `chmod 755 run.sh`
9. run `./run.sh`


### Frontend
React


### Backend
Python + Flask


### Data
MongoDB
