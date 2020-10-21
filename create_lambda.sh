rm -rf fooda-lambda
docker build --tag fooda fooda-backend/
id=$(docker create fooda echo)
docker cp $id:/var/task/python/lib/python3.8/site-packages fooda-lambda
docker rm -v $id
cp -R fooda-backend/* fooda-lambda/
### DEPLOY TO LAMBDA
cd fooda-lambda
zip -r9 ../fooda-lambda.zip .
cd ..
#aws lambda update-function-code --function-name api-seimys-net --zip-file fileb://fooda-lambda.zip
