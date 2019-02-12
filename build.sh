#!/bin/sh

echo Running backend build

AMBR_PATH="./frontend/ambr"
FLASK_PATH="./backend"

if [ ! -f $FLASK_PATH/config.json ]
then
    echo Enter mongo username
    read username
    echo Enter mongo password
    read password 
    
    touch $FLASK_PATH/config.json
    echo "{\n\t\"mongo_user\": \"$username\",\n\t\"mongo_password\": \"$password\"\n}" > $FLASK_PATH/config.json
else
    echo Config file exists...
fi

cd $AMBR_PATH
npm run build
cd ../..



cp -va $AMBR_PATH/build/static/. $FLASK_PATH/static/

cp -v $AMBR_PATH/build/index.html $FLASK_PATH/templates/index.html

