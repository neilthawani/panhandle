// renderer from markdown to html
function renderMarkdownAsHtml() {
  var text = document.getElementById("new-post-textarea").value,
      target = document.getElementById("rendered-markdown"),
      converter = new showdown.Converter(),
      html = converter.makeHtml(text);

    target.innerHTML = html;
}

// end renderer code

var getMetaJson = function() {
    var date = new Date();
    var month = date.toLocaleString('default', { month: 'long' });

    var id = date.getTime();
    var createdAt = `${month} ${date.getDate()}, ${date.getFullYear()}`;
    var title = document.getElementById("new-post-title").value;
    var subtitle = document.getElementById("new-post-subtitle").value;
    var tags = document.getElementById("new-post-tags").value.split(",").map((tag) => {
        return tag.trim();
    });
    var slug = slugifyTitle(title);

    var metaJson = {
        "id": id,
        "title": title,
        "subtitle": subtitle,
        "created_at": createdAt,
        "slug": slug,
        "tags": tags
    };

    return metaJson;
}

var getPostAsHbs = function() {
    var metaJson = getMetaJson();

    var titleString = `<h1 class="blog-post-title">${metaJson['title']}</h1>`;
    var subtitleString = `<h1 class="blog-post-subtitle">${metaJson['subtitle']}</h1>`;
    var html = $("#rendered-markdown")[0].innerHTML;
    var postAsHtml = `<article class="blog-post-content">${html}</article>`;
    var createdAt = metaJson['created_at'];
    var createdAtString = `<p class="blog-post-created-at">Published ${createdAt}</p>`;
    var tagsString = "";
    if (metaJson["tags"].toString().length > 0) {
        tagsString = metaJson['tags'].map((tag) => {
            return `<span class="blog-post-tag">${tag}</span>`;
        }).join("");
    }
    var tagsSection = `<p class="blog-post-tags">${tagsString}</p>`;

    var fileContents = `<div class="blog-post-container">\n\n${titleString}\n\n${postAsHtml}\n\n${tagsSection}\n\n${createdAtString}\n\n{{> blog-post-comment}}\n\n</div>`;

    var fullTemplate = `{{#> base}}\n\n${fileContents}\n\n{{/base}}`;

    return fullTemplate;
}

var downloadPostContent = function() {
    var metaJson = getMetaJson();

    var markdownFilename = `${metaJson['slug']}.md`;
    var mdLink = document.createElement("a");
    mdLink.setAttribute("href", "data:text/md;chartset=utf-8" + encodeURIComponent(markdownFilename));
    mdLink.setAttribute("download", markdownFilename);
    mdLink.click();

    var jsonFileContents = JSON.stringify(metaJson, null, 2);
    var jsonFilename = `${metaJson['slug']}.json`;
    var jsonLink = document.createElement('a');
    jsonLink.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonFileContents));
    jsonLink.setAttribute('download', jsonFilename);
    jsonLink.click();

    var postAsHbs = getPostAsHbs();
    var hbsFilename = `${metaJson['slug']}.hbs`;
    var hbsLink = document.createElement('a');
    hbsLink.setAttribute('href', 'data:text/hbs;charset=utf-8,' + encodeURIComponent(postAsHbs));
    hbsLink.setAttribute('download', hbsFilename);
    hbsLink.click();
}

// markdown and json file creation upon submit
document.addEventListener('DOMContentLoaded', function(event) {
    var newPostTextarea = document.getElementById("new-post-textarea");
    if (newPostTextarea) {
        newPostTextarea.onkeyup =  renderMarkdownAsHtml;
    }

    var createPostButton = document.getElementById("create-post");
    if (createPostButton) {
        createPostButton.onclick = downloadPostContent;
    }

});

function slugifyTitle(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
}
