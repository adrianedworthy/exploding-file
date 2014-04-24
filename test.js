var explodingFile = require('./exploding-file');

explodingFile(__dirname + '/path/to/articles-controller.js', 'controllers', { strict: true });
explodingFile(__dirname + '/path/to/foo.js', 'controllers', { strict: true });
explodingFile(__dirname + '/path/to/foo.js', 'controller', { strict: true });
explodingFile(__dirname + '/path/to/foo.js', 'control');
