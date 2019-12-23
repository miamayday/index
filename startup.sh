#!/bin/sh

echo *** Initialize server ***
cd server && npm install

echo *** Initialize client ***
cd ../client && npm install

echo *** Create data folder ***
cd ../ && mkdir data
cd data
mkdir pending
mkdir duplicates
mkdir uploads
cd uploads
mkdir img
mkdir vid

echo *** Create db folder ***
cd ../../ && mkdir db

echo *** Initialize database ***
node server/src/scripts/startupDB.js
