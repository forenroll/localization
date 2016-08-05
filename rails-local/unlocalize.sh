#!/bin/bash

echo "unlocalize path_to_app_dir"
if [ $1 ]; then
publicDir=`ls $1/public/labs`
rm -fr "$1/app/assets/stylesheets/devcss/"
rm -fr "$1/app/controllers/dev_controller.rb"
rm -fr "$1/app/views/layouts/dev.html.haml"
rm -fr "$1/config/dev_routes/"
rm -fr "$1/public/labs/$publicDir/js/dev/"
line=`sed -n '/# load routes/='  "$1/config/application.rb"`
sed -i "$((line-1)),$((line+1)) d" "$1/config/application.rb"
sed -i '/dev/d' "$1/.gitignore"
fi