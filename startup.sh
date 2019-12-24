#!/bin/sh

printf "*** Initialize server ***\n"
cd server && npm install

printf "*** Initialize client ***\n"
cd ../client && npm install

printf "*** Create data folder ***\n"
cd ../ && mkdir data
cd data
mkdir pending
mkdir duplicates
mkdir uploads
cd uploads
mkdir img
mkdir vid

printf "*** Create db folder ***\n"
cd ../../ && mkdir db

printf "*** Initialize database ***\n"
cd server/src/scripts && node startupDB.js

printf "*** Add execution rights to other scripts ***\n"
cd ../../../ && chmod +x run.sh
