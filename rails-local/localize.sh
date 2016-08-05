#!/bin/bash

echo "localize path_to_app_dir"
if [ $1 ]; then
publicDir=`ls $1/public/labs`
cp -R app/* "$1/app/"
cp -R config/* "$1/config/"
cp -R public/* "$1//public/labs/$publicDir/js/"

cat >> "$1/.gitignore" << EOF
*/dev*/*
dev*
EOF
fi