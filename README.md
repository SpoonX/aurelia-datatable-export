# Datatable export

[![Build Status](https://travis-ci.org/SpoonX/aurelia-datatable-export.svg)](https://travis-ci.org/SpoonX/aurelia-datatable-export)
[![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

Datatable export for Aurelia. Works well with [aurelia-datatable](http://aurelia-orm.spoonx.org/components.html).

## Uses

Aurelia-datatable-export needs following plugins installed and configured:

* [aurelia-view-manager](https://www.npmjs.com/package/aurelia-view-manager)

## Documentation

The [changelog](doc/CHANGELOG.md) provides you with information about important changes.

## Installation

### Aureli-Cli

Run `npm i aurelia-datatable-export --save` from your project root.

Aurelia-datatable-export uses `json2csv`, so add following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`:

```js
"dependencies": [
  "json2csv",
  {
    "name": "aurelia-datatable-export",
    "path": "../node_modules/aurelia-datatable-export/dist/amd",
    "main": "aurelia-datatable-export",
    "resources": [
      "bootstrap/datatable-export.html"
    ]
  },
  // ...
],
```

### Jspm

Run `jspm i aurelia-datatable-export` from your project root.

Aurelia-datatable-export uses `json2csv`, so add following to the `bundles.dist.aurelia.includes` section of `build/bundles.js`:

```js
  "json2csv",
  "aurelia-datatable-export",
  "[aurelia-datatable-export/**/*.js]",
  "aurelia-datatable-export/**/*.html!text",
```

If the installation results in having forks, try resolving them by running:

```sh
jspm inspect --forks
jspm resolve --only registry:package-name@version
```

### Webpack

Run `npm i aurelia-datatable-export --save` from your project root.

And add `aurelia-datatable-export` in the `coreBundles.aurelia` section of your `webpack.config.js`.

### Typescript

Npm-based installations pick up the typings automatically. For Jspm-based installations, run `typings i github:spoonx/aurelia-datatable-export` or add `"aurelia-datatable-export": "github:spoonx/aurelia-datatable-export",` to your `typings.json` and run `typings i`.
