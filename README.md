# API Blueprint to S3

**A complete workflow for converting API Blueprint to hosted documentation on S3**

## tl;dr

Create, build, and deploy your API documentation with a single command:
```
$ gulp create && gulp build && gulp deploy --env=prod
```

## Installation

Clone the repository:
```
$ git clone git@github.com:philipbrown/api-blueprint-s3.git && cd api-blueprint-s3
```

Delete the existing git repository:
```
$ rm -R .git
```

Create a new git repository:
```
$ git init
```

Install the dependencies from NPM:
```
$ npm install
```

Create a `config.json` file from the example:
```
$ cp config.json.example config.json
```

## Writing the source files

For each section of your documentation, create a new file under the `source` directory. The `create` process will concatenate each section into a single file.

Once you are ready to create your API Blueprint document, run the following command:
```
$ gulp create
```

You can also `watch` this directory to automatically build the blueprint whenever you make a change and save the document:
```
$ gulp watch
```

## Building the documentation

Once you are ready to convert your blueprint into HTML documentation, run the following command:
```
$ gulp build
```

This process uses [aglio](https://github.com/danielgtaylor/aglio) to parse the blueprint and render it as HTML. See that repository for full configuration options and details of the available themes.

## Deploying to S3

When you are ready to deploy to S3, run the following command:
```
$ gulp deploy --env=(dev|prod)
```
