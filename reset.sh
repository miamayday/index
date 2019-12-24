#!/bin/sh

rm -rf data
rm -rf db

mkdir data
cd data
mkdir pending
mkdir duplicates
mkdir uploads
cd uploads
mkdir img
mkdir vid

cd ../../ && mkdir db

cd server/src/scripts && node startupDB.js
