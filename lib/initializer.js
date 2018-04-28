var chalk = require("chalk"); // colorful terminal text
var clear = require("clear"); // imports shell command
var figlet = require("figlet"); // large ASCII art styled text

const CLI         = require('clui');
const Spinner     = CLI.Spinner;

const files = require("./files");

module.exports = {
    createProject: function(argv) {
        var projectName = "";
        projectName = this.validateArgs(argv);

        if (projectName.length) {
            clear();
            console.log(
                chalk.yellow.bold(
                    figlet.textSync('Panhandle', { horizontalLayout: 'full' })
                )
            );

            console.log("Creating project:", chalk.yellow(projectName));
            console.log("\n");

            // files.createProjectDirectory(projectName);
            console.log("Created project directory:", chalk.yellow(projectName));

            // files.copyProjectContents(projectName);
            // files.editBaseTemplate(projectName);

            // TODO: Uncomment later.
            // var cwd = `${process.cwd()}`;
            // var targetDir = `${cwd}/${projectName}`;
            // console.log("Created folders and files in:", chalk.yellow(targetDir));
            // files.printFolderContents("blueprints", projectName);

            // To create this project in /blueprints, you'll need
            // the package.json and its scripts... basically everything from the row school website
            // h2h folder <---
            // is there a way to write to a package.json file from a node project in node???
            // is there a way to run a command from a directory so you can
            // install their packages for them?

            console.log("\n");
        }
    },
    validateArgs(argv) {
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
    },
};
