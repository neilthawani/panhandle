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

        // Note: build-views is taken care of by HandlebarsToHtml.build()
        // Can a package.json script run a JavaScript function?
        // "build-views": "node build/build.js -d cwd -p \"src/views/partials/**/*.hbs\" -l \"src/views/layouts/**/*.hbs\" -t \"src/views/templates/**/*.hbs\" -v",

        "watch-views": "nodemon -e hbs -x \"npm run build-views\""
    }
};
