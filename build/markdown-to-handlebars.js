const fs = require('fs');
const showdown  = require('showdown');
const beautifyHtml = require('js-beautify').html;
const path = require("path");

// use this to append new blog posts to blog/index.hbs

// Usage:
// node build/markdown-to-handlebars src/markdown/blog/ src/views/templates/blog/
// aliased as `npm run build-md` in package.json

var args = process.argv.slice(2);
var from = args[0];
var toFolder = args[1];

var isDirectory;

try {
    isDirectory = fs.lstatSync(from).isDirectory();
} catch(e) {
    console.error("Error\n", e);
    process.exit(0);
}

if (isDirectory) {
    console.log(`Parsing files in directory "${from}" to "${toFolder}"`);

    var showdownConverter = new showdown.Converter(),
        blogPostArray = [];

    var files = fs.readdirSync(from);
    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        if (path.extname(file) !== ".md") {
            continue;
        }

        var fileSlug = file.split(".")[0];
        var markdownFile = fs.readFileSync(`${from}${fileSlug}.md`).toString();
        var jsonFile = fs.readFileSync(`${from}${fileSlug}.json`).toString();
        var jsonData = JSON.parse(jsonFile);

        var title = jsonData["title"];
        var createdAt = jsonData["created_at"];
        var tags = jsonData["tags"];

        var titleString = `<h1 class="blog-post-title">${title}</h1>`;
        var subtitleString = `<h1 class="blog-post-subtitle">${jsonData['subtitle']}</h1>`;
        var postAsHtml = `<article class="blog-post-content">${showdownConverter.makeHtml(markdownFile)}</article>`;
        var createdAtString = `<p class="blog-post-created-at">Published ${createdAt}</p>`;
        var tagsString = tags.map((tag) => {
            return `<span class="blog-post-tag">${tag}</span>`;
        }).join("");
        var tagsSection = `<p class="blog-post-tags">${tagsString}</p>`;

        var fileContents = `<div class="blog-post-container">\n\n${titleString}\n\n${postAsHtml}\n\n${tagsSection}\n\n${createdAtString}\n\n</div>`,
            formattedFileContents = beautifyHtml(fileContents),
            fullTemplate = `{{#> base}}\n\n${formattedFileContents}\n\n{{/base}}`;

        var filenameToWrite = `${toFolder}${fileSlug}`;
        fs.writeFileSync(`${filenameToWrite}.hbs`, fullTemplate);
        blogPostArray.push({ "filename": `blog/${fileSlug}`, "title": title, "createdAt": createdAt, "tags": tagsString });
    }

    var indexFileContents = '<div class="blog-post-item-list"><h1 class="text-center">All Posts</h1>\n\n',
        blogPostArray = blogPostArray.sort(function(a, b) {
            return new Date(a["createdAt"]) - new Date(b["createdAt"]);
        }).reverse();

    for (var i = 0; i < blogPostArray.length; i++) {
        var blogPostObj = blogPostArray[i],
            filename = blogPostObj["filename"],
            title = blogPostObj["title"],
            subtitle = blogPostObj["subtitle"],
            createdAt = blogPostObj["createdAt"],
            tags = blogPostObj["tags"];

        var link = `<a class="blog-post-item-link" href="${filename}.html">${title}</a>`,
            tags = `<p class="blog-post-item-tags">${tags}</p>`,
            datestamp = `<p class="blog-post-item-created-at">Published ${createdAt}</p>`;

        var postItem = `<div class="blog-post-item">${link}\n\n${tags}\n\n${datestamp}</div>\n\n`

        indexFileContents += postItem;
    }

    var formattedIndexFileContents = beautifyHtml(indexFileContents),
        fullIndexTemplate = `{{#> base}}\n\n${formattedIndexFileContents}\n\n{{/base}}`;

    fs.writeFileSync(`${toFolder}index.hbs`, fullIndexTemplate)
}
