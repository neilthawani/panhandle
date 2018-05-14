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

let main = async function() {
    var projectName = "";
    projectName = await validateArgs(argv);

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

        try {
            await files.initializeProject("blueprints", cwd, projectName);
        } catch(error) {
            console.log("Error initializing project:", error);
        }

        try {
            await config.setupPackageJson(cwd, projectName);
        } catch(error) {
            console.log("Error setting up package.json", error);
        }

        console.log("\n");
        console.log("Finished creating project:", chalk.yellow(projectName));
        console.log("\n");
    }
};

main();
