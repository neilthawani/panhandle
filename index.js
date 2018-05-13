#!/usr/bin/env node --harmony

var chalk = require("chalk"); // colorful terminal text
var clear = require("clear"); // imports shell command
var figlet = require("figlet"); // large ASCII art styled text

const CLI         = require('clui');
const Spinner     = CLI.Spinner;

const config = require("./lib/config");
const files = require("./lib/files");

const argv = require('minimist')(process.argv.slice(2))._;

let validateArgs = function(argv) {
    var hasValidArgs = argv[0] === "new" && argv.length > 1;

    if (!hasValidArgs) {
        console.log("\n");
        console.log(chalk.yellow.bold("Usage:"), chalk.red("panhandle new <project name>"));
        console.log("\n");
        process.exit(0);
    } else {
        var projectName = argv.slice(1, argv.length).join("-");
        return projectName;
    }
};

// TODO: Put an async/await here and in front of every other method before a console.log.
let main = function() {
    var projectName = "";
    projectName = validateArgs(argv);

    if (projectName.length) {
        var cwd = `${process.cwd()}`;

        clear();
        console.log(
            chalk.yellow.bold(
                figlet.textSync("Panhandle", { horizontalLayout: "full" })
            )
        );
        console.log("Creating project:", chalk.yellow(projectName));
        console.log("\n");

        files.createProjectDirectory(projectName);
        files.copyProjectContents(projectName);
        files.editBaseTemplate(projectName);
        files.printFolderContents("blueprints", cwd, projectName);

        var fileWritten = await config.setupPackageJson(cwd, projectName);

        if (fileWritten) {
            console.log("\n");
            console.log("Finished creating project:", chalk.yellow(projectName));
            console.log("\n");
        }
    }
};

main();
