const fs = require('fs-extra');
const path = require('path');

module.exports = {
    createProjectDirectory(projectName) {
        if (!fs.existsSync(projectName)){
            fs.mkdirSync(projectName);
        }
    },
    copyProjectContents(projectName) {
        debugger;

        fs.copy(`${process.cwd()}/blueprints/styles`, `${projectName}/styles`, error => {
            if (error) {
                return console.error(error);
            } else {
                return console.log("Copied project contents to destination folder.");
            }
        });
    },
    editBaseTemplate(projectName) {
        // var fs = require('fs')
        // fs.readFile(someFile, 'utf8', function (err,data) {
        // if (err) {
        // return console.log(err);
        // }
        // var result = data.replace(/string to be replaced/g, 'replacement');
        //
        // fs.writeFile(someFile, result, 'utf8', function (err) {
        // if (err) return console.log(err);
        // });
        // });
    }

    // getCurrentDirectoryBase: function() {
    //     return path.basename(process.cwd());
    // },
    //
    // directoryExists: function(filePath) {
    //     try {
    //         return fs.statSync(filePath).isDirectory();
    //     } catch (err) {
    //         return false;
    //     }
    // }
};
