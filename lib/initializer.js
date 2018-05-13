var chalk = require("chalk"); // colorful terminal text
var clear = require("clear"); // imports shell command
var figlet = require("figlet"); // large ASCII art styled text

const CLI         = require('clui');
const Spinner     = CLI.Spinner;

const config = require("./config");
const files = require("./files");

var validateArgs = function(argv) {
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

var createProject = async function(argv) {
    var projectName = "";
    projectName = validateArgs(argv);

    if (projectName.length) {
        clear();
        console.log(
            chalk.yellow.bold(
                figlet.textSync('Panhandle', { horizontalLayout: "full" })
            )
        );

        console.log("Creating project:", chalk.yellow(projectName));
        console.log("\n");

        // files.createProjectDirectory(projectName);
        console.log("Created project directory:", chalk.yellow(projectName));
        console.log("\n");

        // TODO: Verify contents of sourceDir and destinationDir in this method.
        // Otherwise, it works fine.
        // files.copyProjectContents(projectName);

        // files.editBaseTemplate(projectName);

        var cwd = `${process.cwd()}`;
        var targetDir = `${cwd}/${projectName}`;
        console.log("Created folders and files in:", chalk.yellow(targetDir));
        console.log("\n");
        // files.printFolderContents("blueprints", projectName);

        // TODO: Is there a way to write to a package.json file from another project?
        // There are several parts of the npm init script that would best be handled natively.
        // Is there a way to run a command from a directory so you can install their packages for them?
        var packageJsonConfig = await config.setupPackageJson(cwd, projectName);

        // TODO: Copy editable params from panhandle/config files to ${projectName}/config/config.js
        // this.writeConfigFile(packageJsonConfig);

        // console.log("\n");
        // console.log("Finished creating project:", chalk.yellow(projectName));
        // console.log("\n");
    }
};

var writeConfigFile = function() {
    // Prompt them if they want to change the defaults from src/views/etc...
};

module.exports = {
    createProject: createProject
};
