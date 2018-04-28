#!/usr/bin/env node

// let HandlebarsToHtml = require("../lib/handlebars-to-html");

var liveServer = require("live-server");
var childProcess = require("child_process");

var params = {
	open: false,
	file: "*", // TODO: set this
	wait: 500,
	logLevel: 2
};

childProcess.exec("npm run build-views && npm run watch-css && npm run watch-views", {
        "shell": true
    },
    (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
});

liveServer.start(params);
