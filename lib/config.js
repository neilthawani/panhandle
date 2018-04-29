const async = require("async");
const await = require("await"); // async/await and promises
const chalk = require("chalk"); // colorful terminal text
const childProcess = require("child_process");
// const writePkg = require("write-pkg"); // write JSON obj to package.json

var dependencies = require("../package/dependencies");
var inquirer = require("./inquirer");

module.exports = {
    // To run server, add "main": "index.js".
    setupPackageJson: function(cwd, projectName) {
        console.log("setupPackageJson", "cwd", cwd, "projectName", projectName);

        // childProcess.exec("npm init --yes", {
        // childProcess.exec("sh lib/build.sh", {
        //         // "cwd": `${cwd}/${projectName}`,
        //         "cwd": `${cwd}`,
        //         "shell": true
        //     },
        //     (error, stdout, stderr) => {
        //         console.log("Wrote", chalk.yellow.bold("package.json"));
        //         console.log(`${stdout}`);
        //
        //         if (stderr || error !== null) {
        //             console.log(`exec error: ${error}`);
        //         }
        // });

        // re: npm docs: What is the "prompt" function?

        // TODO?: Figure out how to do async/await.
        // Do you just need the next version of JS? Babel?
        const run = async () => {
          console.log("run");
          const credentials = await inquirer.askGithubCredentials();
          console.log(credentials);
        }
        run();

        // var fields = await inquirer.populateProjectFields();
        // tree["description"] = fields.description;
        // tree["author"] = fields.author;

        // > npm set init.author.email "wombat@npmjs.com"
        // > npm set init.author.name "ag_dubs"
        // > npm set init.license "MIT"
    }
};
