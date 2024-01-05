#!/bin/bash

retryCount=0
maxCount=5;

while [[ $retryCount -le $maxCount ]]; 
do
    echo "Trying to migrate database"
    sleep 1
    npx prisma migrate deploy
    if [ $? -gt 0 ]; then retryCount=$(( $retryCount + 1)); fi;
    if [ $? -eq 0 ]; then retryCount=$(( $retryCount + $maxCount )); fi;
done

sleep 1

if [[ $? -eq 0 ]]; then node server.js; fi;
if [[ $? -gt 0 ]]; then exit 1; fi;