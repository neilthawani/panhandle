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
            var cwd = `${process.cwd()}`;
            // var sourceDir = `${cwd}/blueprints`;
            var targetDir = `${cwd}/${projectName}`;
            console.log("Created folders and files in:", chalk.yellow(targetDir));
            // Do scaffolding structure...

            // files.editBaseTemplate(projectName);
            var folderContents = files.printFolderContents("blueprints");
            // console.log("typeof folderContents", typeof folderContents);
            console.log("folderContents", folderContents);

            // And the package.json and its scripts... basically everything from the row school website
            // h2h folder <---

            console.log("\n");
        }
    },
    validateArgs(argv) {
        console.log("validateArgs", argv);
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
