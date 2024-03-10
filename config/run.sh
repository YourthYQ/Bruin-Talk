#!/bin/bash

# Navigate to the back-end folder
cd ./backend || { echo "Error: Backend folder ("backend") not found!"; exit 1; }

# Run npm start for the back end  in the background
npm start &

# Check if successfully ran back-end
if [ $? -ne 0]; then
    echo "Error: Failed to start back end!"
    exit 1
fi

# Navigate to the front-end folder
cd ../frontend ||
    { echo "Error: Frontend folder ("frontend") not found"; exit 1; }

# Run npm start for the front end in the foreground
npm start

# Check if successfully ran front-end
if [ $? -ne 0]; then
    echo "Error: Failed to start front end!"
    exit 1
fi

exit 0
