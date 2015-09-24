#!/usr/bin/env bash

command -v npm >/dev/null 2>&1 || { echo >&2 "Couldn't find node/npm on path!. Try installing it (e.g. 'brew install node')"; exit 1; }

[[ "$PWD" == *frontend/app ]] || cd ./frontend/app
[[ "$PWD" == *frontend/app ]] || { echo >&2 "Couldn't locate the js folder! This script must be run from either the folder or the project root folder"; exit 1; }

npm install

NPM_COMMAND=${1-build}
npm run ${NPM_COMMAND}
