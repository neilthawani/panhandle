// TODO: Add a build "command" to package.json::bin so that the base config updates package.json scripts.

module.exports = {
    baseFolder: "src/",
    globToMatch: {
        partialsFolder: baseFolder + "views/partials/**/*.hbs"
        layoutsFolder: baseFolder + "views/layouts/**/*.hbs",
        templatesFolder: baseFolder + "views/templates/**/*.hbs"
    },
    views: {
        layoutsFolder: baseFolder + "views/layouts/",
        partialsFolder: baseFolder + "views/partials/",
        templatesFolder: baseFolder + "views/templates/"
    },

    styles: {
        sassFolder: "static/styles/"
    }
    scripts: {
        "build-css": "node-sass --include-path scss " + baseFolder + styles.sassFolder + "main.scss styles/main.css",
        "watch-css": "nodemon -e scss -x \"npm run build-css\"",
        "watch-views": "nodemon -e hbs -x \"npm run build-views\""
    }
};
