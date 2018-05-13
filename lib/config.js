const chalk = require("chalk"); // colorful terminal text
const childProcess = require("child_process");
const prompt = require("prompt");

var dependencies = require("../package/dependencies");

module.exports = {
    setupPackageJson: function(cwd, projectName) {
        var settings = {
            "name": projectName,
            "description": "",
            "author": "",
            "dependencies": dependencies
        };

        var schema = {
            properties: {
                about: {
                    message: "Enter a description for your project."
                },
                name: {
                    message: "What is your name?"
                }
            }
        };

        prompt.start();

        prompt.get(schema, function (error, result) {
            settings.description = result.about;
            settings.author = result.name;
        });

        // childProcess.exec(`npm set init ${settings} && npm init`,
        childProcess.exec(`echo 'grah'`, (error, stdout, stderr) => {
                console.log("Wrote", chalk.yellow.bold("package.json"));
                console.log(`${stdout}`);

                if (stderr || error !== null) {
                    console.log(`exec error: ${error}`);
                }
        });
    }
};
