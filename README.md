# Exploding File

This is a node module to allow flexible path structures when you don't know how complex they are going to be. Simply put, it will require() a file if it exists. Failing that, it will look inside a specified directory and require() every file within it.

## Usage

Example usage:

    var explodingFile = require('exploding-file');
    explodingFile('path/to/articles-controller.js', 'controllers', { strict: true });

This looks for articles-controller.js within path/to/ and requires it. If it doesn't exist, it require()s all .js files within path/to/controllers/ instead. Because the strict option is set to true then if nothing is found to require() then an error is thrown.
