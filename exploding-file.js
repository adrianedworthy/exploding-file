"use strict";

module.exports = function(file, explode_to, options) {

    var fs = require('fs'),
        path = require('path');

    // Default options.
    var defaultOptions = {
        strict: false
    };
    
    // Combine options with default options.
    if (typeof options === 'undefined') {
        options = {};
    }
    for (var k in defaultOptions) {
        if (typeof options[k] === 'undefined') {
            options[k] = defaultOptions[k];
        }
    }

    // Validate parameters.
    if (typeof file === 'undefined') {
        throw "The exploding-file module expects the first parameter to be the path to a potential file.";
    }
    if (typeof explode_to === 'undefined') {
        throw "The exploding-file module expects the second parameter to be a directory to require if the given file doesn't exist.";
    }

    // Take note of where the file lives.
    var file_dir = path.dirname(file);

    // Strip the .js extension.
    file = file_dir + path.sep + path.basename(file, '.js');

    // Does file exist?
    fs.exists(file, function(file_exists) {
        if (file_exists) {
        
            // Require it!
            return require(file);
            
        } else {

            // explode_to should be relative to file_dir.
            var explode_dir = file_dir + path.sep + explode_to;

            // Does explode_dir exist?
            fs.exists(explode_dir, function(dir_exists) {
                if (dir_exists) {

                    // If yes, require all .js files in the dir.
                    var output = [];
                    fs.readdirSync(explode_dir).forEach(function(item) {
                        if (path.extname(item) === '.js') {
                            output.push(require(explode_dir + path.sep + path.basename(item, '.js')));
                        }
                    });
                    
                    // Return output or throw error in strict mode.
                    if (output.length) {
                        return output;
                    } else {
                        if (options.strict) {
                            throw "Exploding file '" + file + "' does not exist and also hasn't exploded to '" + explode_dir + "'.";
                        }
                    }
                    
                } else {
                
                    // If not, only strict mode returns error.
                    if (options.strict) {
                        throw "Exploding file '" + file + "' does not exist and neither does '" + explode_dir + "'.";
                    }
                    
                }
            });
        }
    });

}
