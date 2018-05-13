// TODO: Remove inquirer?

// const async = require("async");
// const await = require("await"); // async/await and promises
const chalk = require("chalk"); // colorful terminal text
const childProcess = require("child_process");
// const prompt = require("prompt");
// const writePkg = require("write-pkg"); // write JSON obj to package.json

var dependencies = require("../package/dependencies");
// var inquirer = require("./inquirer");
const { prompt } = require("./utils");

module.exports = {
    setupPackageJson: function(cwd, projectName) {
        // console.log("setupPackageJson", "cwd", cwd, "projectName", projectName);

        var settings = {
            "name": projectName,
            "version": "1.0.0",
            "description": "",
            "main": "index.js",
            "author": "",
            "dependencies": dependencies,
        };

        prompt("Enter a description for your project: ")
            .then((description) => {
                settings.description = description;
                return prompt("What is your name? ");
        })
        .then((author) => {
            settings.author = author;
        })
        .catch((error) => {
            console.log("Error: ", error);
            process.exit();
        });

        // childProcess.exec("npm init --yes", {
        childProcess.exec("sh lib/build.sh", {
                "cwd": `${cwd}`,
                "settings": settings,
                "shell": true
            },
            (error, stdout, stderr) => {
                console.log("Wrote", chalk.yellow.bold("package.json"));
                console.log(`${stdout}`);

                if (stderr || error !== null) {
                    console.log(`exec error: ${error}`);
                }
        });
    }
};
