#!/bin/sh

echo Running backend build

AMBR_PATH="./frontend/ambr"
FLASK_PATH="./backend"

cd $AMBR_PATH
npm run build
cd ../..

# for file in $AMBR_PATH/build/static/*;
# do 
# cp -v "$file" $FLASK_PATH/static/"${file%.csv}"
# done 

cp -va $AMBR_PATH/build/static/. $FLASK_PATH/static/

cp -v $AMBR_PATH/build/index.html $FLASK_PATH/templates/index.html

