#!/bin/bash

echo "Installing dependencies for backend..."
cd ./backend && npm install
echo "Installing dependencies for frontend..."
cd ../frontend && npm install

exit 0
