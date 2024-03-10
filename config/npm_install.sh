if [ -x "$(command -v apt-get)" ]; then
    sudo apt-get update
    sudo apt-get install -y nodejs npm
elif [ -x "$(command -v yum)" ]; then
    sudo yum install -y nodejs npm
elif [ -x "$(command -v dnf)" ]; then
    sudo dnf install -y nodejs npm
elif [ -x "$(command -v pacman)" ]; then
    sudo pacman -Sy nodejs npm
elif [ -x "$(command -v brew)" ]; then
    brew install node
elif [ -x "$(command -v nvm)" ]; then
    nvm install node
else
    echo "Unable to install Node.js and npm. Please install manually."
    exit 1
fi

exit 0
