const chalk = require("chalk"); // colorful terminal text
const childProcess = require("child_process");

var dependencies = require("../package/dependencies");

module.exports = {
    setupPackageJson: async function(cwd, projectName) {
        var targetDir = `${cwd}/${projectName}`;

        // TODO: Add description and author fields as prompt.
        var settings = {
            "name": projectName,
            "dependencies": dependencies
        };

        // TODO: Fix this. It doesn't install packages.
        console.log("Installing packages...");

        await childProcess.exec(`npm init ${settings}`, {
            cwd: targetDir
        }, (error, stdout, stderr) => {
            console.log("Wrote", chalk.yellow.bold("package.json"));
            console.log(`${stdout}`);

            if (stderr || error !== null) {
                console.log(`exec error: ${error}`);
            }

            return true;
        });
    }
};
