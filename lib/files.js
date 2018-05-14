// TODO after readFile(s)
// fs.unlink('/file.md', (unlinkErr) => {
//     if (unlinkErr) throw unlinkErr;
// });

var chalk = require("chalk"); // colorful terminal text
const fs = require('fs-extra');
const path = require('path');

var createProjectDirectory = async function(projectName) {
    if (!fs.existsSync(projectName)){
        try {
            await fs.ensureDir(`${process.cwd()}/${projectName}`);
        } catch (error) {
            console.log(`Error creating directory: ${error}`);
        }
    }

    console.log("Created project directory:", chalk.yellow(projectName));
    console.log("\n");
};

var copyProjectContents = async function(projectName) {
    var sourceDir = `${process.cwd()}/blueprints`,
        destinationDir = `${projectName}`;

    try {
        await fs.copy(sourceDir, destinationDir, error => {
            if (error) {
                console.error(error);
            } else {
                console.log("Copied project contents to destination folder.");
            }
        });
    } catch(error) {
        console.log("Error creating project folder contents:", error);
    }
};

var editBaseTemplate = async function(projectName) {
    var baseLayoutFilePath = `${process.cwd()}/${projectName}/views/layouts/base.hbs`;

    try {
        var fileContents = await fs.readFileSync(baseLayoutFilePath).toString();
        var contentsToWrite = await fileContents.replace("{{projectName}}", projectName);
        await fs.writeFileSync(baseLayoutFilePath, contentsToWrite);
        await fs.unlink(baseLayoutFilePath);
    } catch(error) {
        console.log("Error editing base template file title:", error);
    }
};

var printFolderContents = async function(sourceDirName, cwd, projectName) {
    var targetDir = `${cwd}/${projectName}`;

    console.log("Created folders and files in:", chalk.yellow(targetDir));
    console.log("\n");

    var folderContents = getFolderContents(sourceDirName, { includeRelativeBase: true, sortAscending: true });
    folderContents = formatText(folderContents, projectName);

    for (var i = 0; i < folderContents.length; i++) {
        console.log(folderContents[i]);
    }
};

var getFolderContents = function(sourceDirName, options) {
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
};

var formatText = function(folderContents, projectName) {
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
};

module.exports = {
    initializeProject: async function(sourceDirName, cwd, projectName) {
        await createProjectDirectory(projectName);
        await copyProjectContents(projectName);
        await editBaseTemplate(projectName);
        await printFolderContents(sourceDirName, cwd, projectName);
    }
};
