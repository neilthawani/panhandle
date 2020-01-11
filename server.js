var liveServer = require("live-server");
var childProcess = require("child_process");

var params = {
	open: false,
	ignore: "node_modules",
	file: "*", // TODO: set this for 404
	wait: 0,
	logLevel: 2
};

// NOTE: If CSS doesn't build,
// this will fail silently if you have typos in your SASS.
// Run `npm run build-css` to test and the console will show an error if this is the case.
// Sometimes, if build works but watch doesn't, you will have to run
// `watch-css` from the terminal manually. It should be ok then.

// Upon blog post creation, run `npm run build-md`.
childProcess.exec("npm run build-views && npm run build-css && npm run watch-views && npm run watch-css", {
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

/*
liveServer:
params: {
    port: set the server port, defaults to 8080
    host: set the address to bind to, defaults to 0.0.0.0 or process.env.IP
    root: set root directory that's being served, defaults to cwd
    open: if false, then it won't load browser by default
    ignore: comma-separated string for paths to ignore
    file: when set, serve this file (server root relative) for every 404 (useful for SPAs)
    wait: set delay (ms) before loading after changes are made
    mount: mount a directory to a route (e.g., [['/components', './node_modules']])
    logLevel: 0 = errors only, 1 = some logs, 2 = lots of logs
    middleware: takes an array of Connect-compatible middleware that are injected into the server middleware stack (e.g., [function(req, res, next) { next(); }])
}

nodemon and watch-css:
https://github.com/hellobrian/blogs/tree/master/watch-and-compile-your-sass-with-npm
*/
