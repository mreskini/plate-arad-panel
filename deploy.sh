#!/bin/bash

echo "=====> Starting deployment <====="

# Pulling from repo
echo "[1/4] Pulling"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/plate-arad-panel-github
git pull origin arad

# Install dependencies
echo "[2/4] Installing"
npm install

# Build the project
echo "[3/4] Building"
npm run build

# Deploy to web directory
echo "[4/4] Deploying"
rm -rf /var/www/html/panel/*
cp -r dist/* /var/www/html/panel/

echo "=====> Completed <====="