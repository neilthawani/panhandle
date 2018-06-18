const baseFolder = "src/";
const sassFolder = "static/styles/";

module.exports = {
    globToMatch: {
        partialsFolder: baseFolder + "views/partials/**/*.hbs",
        layoutsFolder: baseFolder + "views/layouts/**/*.hbs",
        templatesFolder: baseFolder + "views/templates/**/*.hbs"
    },
    views: {
        layoutsFolder: baseFolder + "views/layouts/",
        partialsFolder: baseFolder + "views/partials/",
        templatesFolder: baseFolder + "views/templates/"
    },
    scripts: {
        "build-css": "node-sass --include-path scss " + baseFolder + sassFolder + "main.scss styles/main.css",
        "watch-css": "nodemon -e scss -x \"npm run build-css\"",
        "watch-views": "nodemon -e hbs -x \"npm run build-views\""
    }
};
