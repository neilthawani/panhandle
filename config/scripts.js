module.exports = {
    "start": "node server.js",
    "build-css": "node-sass --include-path scss src/static/styles/main.scss styles/main.css",
    "watch-css": "nodemon -e scss -x \"npm run build-css\"",
    "build-views": "node build/build.js -d cwd -p \"src/views/partials/**/*.hbs\" -l \"src/views/layouts/**/*.hbs\" -t \"src/views/templates/**/*.hbs\" -v",
    "watch-views": "nodemon -e hbs -x \"npm run build-views\""
}
