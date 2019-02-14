#!/bin/sh

echo Running app

FLASK_PATH="./backend"
VENV="venv"

source $FLASK_PATH/$VENV/bin/activate
dev_appserver.py $FLASK_PATH/app.yaml