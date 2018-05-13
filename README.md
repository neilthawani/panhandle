# panhandle

Compile Handlebars Templates in a Github Pages Static Site

### Requirements

- [Node.js](nodejs.org)

### Installation Steps

1. Clone this repository.
2. Run `npm install`
3. Install the module globally using `npm install -g`
4. Run `panhandle new <project-name>`

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

### Building:

Run:

`npm start`

from the command line, given the default parameters in `index.js`. This outputs `.html` files to the `cwd` in the same folder structure as your compiled `src/views/templates` folder.

### License

[The MIT License (MIT)](https://opensource.org/licenses/MIT)
