'use strict';

var fs = require('fs'),
    path = require('path');

module.exports = function(filepath, explode_to, options) {

    options = options || {};

    // Validate parameters.
    if (!filepath) {
        return console.error('The exploding-file module expects the first parameter to be the path to a potential file.');
    }
    if (!explode_to) {
        return console.error('The exploding-file module expects the second parameter to be a directory to require if the given file does not exist.');
    }

    // If file exists, require it!
    if (fs.existsSync(filepath)) return require(filepath);

    // explode_to should be relative to the file directory.
    var explode_dir = path.join(path.dirname(filepath), explode_to);
    var errmsg = 'Exploding file `' + filepath + '` does not exist, nor exploded to `' + explode_dir + '`.';

    // Does explode_dir exist?
    fs.stat(explode_dir, function(err, stat) {
        if (err || !stat.isDirectory())
            return options.strict && console.error(errmsg);

        // If yes, require all .js files in the dir.
        var output = fs.readdirSync(explode_dir).filter(function(file) {
            return /(.*)\.(js|coffee)$/.test(file);
        });

        // Return output or throw error in strict mode.
        if (output.length) return output.forEach(function(file) {
            return require(path.join(explode_dir, file));
        });
        return options.strict && console.error(errmsg);
    });
};
