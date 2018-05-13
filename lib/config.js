const chalk = require("chalk"); // colorful terminal text
const childProcess = require("child_process");

var dependencies = require("../package/dependencies");
const { prompt } = require("./utils");

module.exports = {
    setupPackageJson: function(cwd, projectName) {
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
                return prompt("What are some keywords for your project? ");
            })
            .then((keywords) => {
                settings.keywords = keywords;
                return prompt("What is your name? ");
            })
            .then((author) => {
                settings.author = author;
                return 0;
            })
            .catch((error) => {
                console.log("Error: ", error);
                process.exit();
            });

        childProcess.exec(`npm set init ${settings} && npm init`
        {
            "shell": true
        }, (error, stdout, stderr) => {
                console.log("Wrote", chalk.yellow.bold("package.json"));
                console.log(`${stdout}`);

                if (stderr || error !== null) {
                    console.log(`exec error: ${error}`);
                }
        });
    }
};
