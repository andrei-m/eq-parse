var Tail = require('tail').Tail, 
    config = require('./config.json'),
    parse = require('./parse');

var tail = new Tail(config.logFile);

tail.on('line', function(line) {
    var parsed = parse.parseLine(line);
    if (parsed) {
        console.log(parsed);
    } else {
        console.log('[skipped] ' + line);
    }
});

