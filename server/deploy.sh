#!/bin/bash

echo What should the version be?
read VERSION

docker build -t zeyadomran/squizapi:$VERSION .
docker push zeyadomran/squizapi:$VERSION
ssh root@143.198.144.82 "docker pull zeyadomran/squizapi:$VERSION && docker tag zeyadomran/squizapi:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"
