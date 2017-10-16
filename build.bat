@echo off

rd/s/q "build/firmwares"
xcopy "firmwares" "build/firmwares" /S /I

rd/s/q "build/Arduino/libraries/Weeemake"
xcopy "libraries/Weeemake" "build/Arduino/libraries/Weeemake" /S /I

node "node_modules/webpack/bin/webpack.js"

cd WeeeCode
node "node_modules/webpack/bin/webpack.js"
cd ..

taskkill /f /im "WeeeCode.exe"
"build/WeeeCode.exe"