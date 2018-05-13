var chalk = require("chalk"); // colorful terminal text
const fs = require('fs-extra');
const path = require('path');

module.exports = {
    createProjectDirectory(projectName) {
        if (!fs.existsSync(projectName)){
            fs.mkdirSync(projectName);
        }

        console.log("Created project directory:", chalk.yellow(projectName));
        console.log("\n");
    },
    copyProjectContents(projectName) {
        var sourceDir = `${process.cwd()}/blueprints`,
            destinationDir = `${projectName}`;

        fs.copy(sourceDir, destinationDir, error => {
            if (error) {
                console.error(error);
            } else {
                console.log("Copied project contents to destination folder.");
            }
        });
    },
    editBaseTemplate(projectName) {
        var baseLayoutFilePath = `${process.cwd()}/blueprints/views/layouts/base.hbs`;
        var fileContents = fs.readFileSync(baseLayoutFilePath).toString();
        var contentsToWrite = fileContents.replace("{{projectName}}", projectName);

        fs.writeFileSync(baseLayoutFilePath, contentsToWrite);
    },
    printFolderContents(sourceDirName, cwd, projectName) {
        var targetDir = `${cwd}/${projectName}`;

        console.log("Created folders and files in:", chalk.yellow(targetDir));
        console.log("\n");

        var folderContents = this.getFolderContents(sourceDirName, { includeRelativeBase: true, sortAscending: true });
        folderContents = this.formatText(folderContents, projectName);

        for (var i = 0; i < folderContents.length; i++) {
            console.log(folderContents[i]);
        }
    },

    getFolderContents(sourceDirName, options) {
        // returns an array of the files in the specified project directory
        var _getAllFilesFromFolder = function(sourceDirName) {
            var results = [];

            fs.readdirSync(sourceDirName).forEach(function(file) {
                file = `${sourceDirName}/${file}`;
                var stat = fs.statSync(file);

                if (stat && stat.isDirectory()) {
                    results.push(file)
                    results = results.concat(_getAllFilesFromFolder(file))
                } else {
                    results.push(file);
                }
            });

            return results;

        };

        var folderContents = _getAllFilesFromFolder(sourceDirName);

        if (options.includeRelativeBase) {
            folderContents.unshift(sourceDirName);
        }

        if (options.sortAscending) {
            folderContents = folderContents.sort();
        }

        return folderContents;
    },
    formatText: function(folderContents, projectName) {
        return folderContents.map((fileOrFolder) => {
            var prependedUnderscores = "";
            if (fileOrFolder.includes("/")) {
                for (var char = 0; char < fileOrFolder.length; char++) {
                    if (fileOrFolder[char] === "/") {
                        prependedUnderscores += "__";
                    }
                }

                fileOrFolder = fileOrFolder.slice(fileOrFolder.lastIndexOf("/") + 1, fileOrFolder.length);

                fileOrFolder = `|${prependedUnderscores} ${fileOrFolder}`;
            } else {
                fileOrFolder = `| ${projectName}`;
            }

            return fileOrFolder;
        });
    }
};
