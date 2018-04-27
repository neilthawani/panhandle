#!/usr/bin/env node --harmony

var chalk = require("chalk");
var clear = require("clear");
// var co = require("co");
var figlet = require("figlet");
// var prompt = require("co-prompt");
// var program = require("commander");

const argv = require('minimist')(process.argv.slice(2));
const initializer = require("./lib/initializer");

initializer.createProject(argv["_"]);

// ph new "testproject"
// creates an object: { _: 'new', 'testproject'}
// read minimist docs to get more ideas on what to do

// const files = require('./lib/files');
// const inquirer  = require('./lib/inquirer');

// Spinner
// const CLI         = require('clui');
// const Spinner     = CLI.Spinner;
// sets up a spinner on the console, stops when you ask it to
// const status = new Spinner('Authenticating you, please wait...');
// status.start();
// status.stop();

// asks user for credentials, then logs it
// const run = async () => {
//   const credentials = await inquirer.askGithubCredentials();
//   console.log(credentials);
// }
// run();

// program.arguments('<project name>')
        // .option('-u, --username <username>', 'The user to authenticate as')
        // .option('-p, --password <password>', 'The user\'s password')
        // .options('new', 'new <project name>')
        // .action(function(file) {
        //     co(function *() {
        //         var username = yield prompt('username: ');
        //         var password = yield prompt.password('password: ');
        //         console.log('user: %s pass: %s file: %s',
        //         username, password, file);
        //         console.log(chalk.bold.cyan('Snippet created: ') + file);
        //     });
        // })
        // .parse(process.argv);

// snippet -u kannonboy -p correcthorsebatterystaple my_awesome_file
// outputs:
// user: kannonboy pass: correcthorsebatterystaple file: my_awesome_file
// to the console

// running
// ph --help
// outputs a man page for the 'snippet' command, as noted above in the params for .option
