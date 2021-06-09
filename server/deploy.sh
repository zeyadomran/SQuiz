#!/bin/bash

echo What should the version be?
read VERSION

docker build -t zeyadomran/squizapi:$VERSION .
docker push zeyadomran/squizapi:$VERSION
ssh root@142.93.15.218 "docker pull zeyadomran/squizapi:$VERSION && docker tag zeyadomran/squizapi:$VERSION dokku/squizapi:$VERSION && dokku deploy squizapi $VERSION"
