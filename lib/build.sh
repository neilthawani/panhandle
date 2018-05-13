#!/bin/sh



echo "Building package.json"
echo "In build.sh"
echo `pwd`
echo argv
echo args
# TODO: Figure out how to run npm in cwd/projectName
# Also see how to catch errors, because it's halting the script here
# npm init

# Get args from npm package.json settings object
# // > npm set init.author.email "wombat@npmjs.com"
# // > npm set init.author.name "ag_dubs"
# // > npm set init.license "MIT"
