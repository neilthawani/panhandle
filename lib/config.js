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

        childProcess.exec("npm init --yes", {
                "shell": true
            },
            (error, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                }
        });


        // TODO: How to run npm init from this function? That is an ideal solution...

        // TODO?: Figure out how to do async/await.
        // Do you just need the next version of JS? Babel?
        // const run = async () => {
        //   const credentials = await inquirer.askGithubCredentials();
        //   console.log(credentials);
        // }
        // run();

        // var targetDir = `${cwd}/${projectName}`,
        //     tree = {
        //         "name": projectName,
        //         "version": "1.0.0",
        //         "dependencies": dependencies,
        //         "main": "server.js"
                // "scripts:" {
                //     "start": "node server.js"
                // }
            // }

        // var fields = await inquirer.populateProjectFields();
        // tree["description"] = fields.description;
        // tree["author"] = fields.author;

        // writePkg(targetDir, tree).then(function() {
        //     console.log("Wrote", chalk.yellow.bold("package.json"));
        // });

        // childProcess.execFileSync("sh /build/build.sh",
        // {
        //         "shell": true
        //     },
        //     (error, stdout, stderr) => {
        //         console.log(`stdout: ${stdout}`);
        //         console.log(`stderr: ${stderr}`);
        //         if (error) {
        //             console.log(`exec error: ${error}`);
        //         }
        // });

    }
};
