#!/bin/sh

echo Running app

FLASK_PATH="./backend"

source $FLASK_PATH/venv/bin/activate
dev_appserver.py $FLASK_PATH/app.yaml