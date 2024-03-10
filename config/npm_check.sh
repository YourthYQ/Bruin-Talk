#!/bin/bash

{ npm --version >/dev/null 2>&1; echo "npm installed!"; } ||
    { echo >&2 "Error: npm is not installed. Installing it now..."; make install_npm; }

exit 0
