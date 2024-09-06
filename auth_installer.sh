#!/bin/bash

read -p "Do you want to install mkcert? (Y/n): " answer

if [[ "$answer" == "Y" || "$answer" == "Y" ]]; then
    echo "Installing mkcert..."
    sudo apt-get install mkcert -y
    echo "Program installed successfully."
elif [[ "$answer" == "n" || "$answer" == "N" ]]; then
    echo "Pass mkcert install process."
else
    echo "Invalid input. Please enter 'Y' or 'n'."
fi

echo "Creating new local CA..."
mkcert -install

if [ $? -eq 0 ]; then
    echo "Local CA creating successful."
else
    echo "Local CA creating failed."
    exit 1
fi

echo "Creating new certificate valid..."
mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1

if [ $? -eq 0 ]; then
    echo "Certificate valid creating successful."
else
    echo "Certificate valid creating failed."
    exit 1
fi

echo "Done."
exit 0