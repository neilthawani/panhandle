# panhandle

Compile Handlebars Templates in a Github Pages Static Site

### Developer's Note

If you are passionate about this idea and interested in contributing, please check out the Issues section!

### Requirements

- [Node.js](nodejs.org)

### Installation Steps

1. Clone this repository.
2. Get started!

### Sample folder structure:

```
cwd/src/views
|_layouts
|_partials
|__blog
|___post.hbs
|_templates
|__index.hbs
```

**Note:** `/templates` should always contain an `index.hbs` file, given this project's config (see `handlebars-to-html::writeFiles`, lines 47-51).

### Sample layout:

```
<!-- cwd/views/layouts/base -->
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" prefix="og: http://ogp.me/ns#">
  <head>
    <title>Title</title>
  </head>
  <link type="text/css" href="/styles/main.css" rel="stylesheet">
  <body>
  {{> @partial-block }}
  </body>
</html>
```

### Sample index template:

```
<!-- cwd/views/templates/index.hbs -->
{{#> base}}
  {{> blog/post}}
{{/base}}
```

### Blog:

"New Blog Post" displays on localhost:8080 but not in production. You can draft and preview Markdown as HTML, and Creating a Post downloads the `.md`, `.hbs`, and `.json` metadata files directly to your computer. This is because the browser doesn't have access to the user's filesystem. However, you can use the editor to easily draft and copy/paste these files into their respective directories:

- `json` and `md` files go in `src/markdown/blog`

Then run `npm run build-md` to create the `hbs` file and recompile the `src/views/template/blog/index.hbs` file so that it displays the post.

### Building:

Run:

`npm start`

from the command line, given the default parameters in `index.js`. This outputs `.html` files to the `cwd` in the same folder structure as your compiled `src/views/templates` folder.

### License

[The MIT License (MIT)](https://opensource.org/licenses/MIT)
