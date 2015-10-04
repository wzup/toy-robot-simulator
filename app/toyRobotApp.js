'use strict';

/**
 * The Toy Robot Simulator app. It is a module. The main goal of this module is
 * to start the app. It requires the robot instance and uses its methods to
 * operate it.
 */

/**
 * Declare and initialize variables
 */
var os = require("os"), // to have platform independent EOL
    stdin = process.stdin,
    stdout = process.stdout,
    stderr = process.stderr,
    robot = require('./robotFactory'), // a robot instance
    EOL = os.EOL, // cross-platform EOL
    fs = require('fs'), // to check if a file exists and is readable and to create a stream
    readline = require('readline'), // Readline class. To read commands from a file
    rl, // readline instance
    argv, // for cli arguments, particularly to get a file path
    messenger = robot.getMessenger(); // to create and send messages to user

stdin.setEncoding('utf8');
process.title = "== The Toy Robot =="; // sets a terminal title

argv = process.argv.slice(2); // get only the name of the file from user prompt


// read stdin
// this piece of code is for reading user's input from CLI
stdin.on('data', function(data) {
    doOutput(data);
});


// this piece of code is for reading commands from a file
if (argv.length) {
    try {
        fs.accessSync(argv[0], fs.F_OK | fs.R_OK)
    } catch (e) {
        stderr.write(messenger.getMessage({
            msg: 'fileNotFound',
            fileName: argv[0]
        }));
        process.exit();
    }


    rl = readline.createInterface({
        input: fs.createReadStream(argv[0]),
        terminal: false
    });

    // event handler. is called when a line is read from a file
    rl.on('line', function(line) {
        stdout.write(line + EOL);
        doOutput(line);
    });

    // event handler. is called when all the lines in a file have been read
    // closes a stream and exit
    rl.on('close', function() {
        rl.close();
        process.exit();
    });
}


/**
 * This parser encapsulates the task of reading a user's input, either form CLI
 * or from a file.
 *
 * @param  {String} sCommand A command from a user, like "PLACE, MOVE, etc."
 * @return {Error|String|Object} Returns either an Error instance, or a message
 * string, or the robot instance. A successful action returns robot's instance.
 * @private
 */
function doAction(sCommand) {
    var res;
    // PLACE X(,| )Y(,| )F(  *)
    if (sCommand.match(/^\s*place\s+\w+(?:,?\s*|\s+)\w+(?:,?\s*|\s+)\w+\s*$/i)) {
        var args = sCommand.trim().split(/(?:\s+|,\s*)/i).slice(1);
        res = robot.place(args[0], args[1], args[2]);
    } else if (sCommand.match(/^move\s*$/i)) {
        res = robot.move();
    } else if (sCommand.match(/^left\s*$/i)) {
        res = robot.left();
    } else if (sCommand.match(/^right\s*$/i)) {
        res = robot.right();
    } else if (sCommand.match(/^report\s*$/i)) {
        res = robot.report();
    } else {
        res = new Error(messenger.getMessage({
            msg: 'unknownCommand'
        }));
    }
    return res;
}

/**
 * Sends a response from doAction() to stdout or stderr
 * @param  {Error|String|Object} either an Error instance, or a message string,
 * or robot instance.
 * @return {undefined}      no return. the func only sends to stdout or stderr
 */
function doOutput(data) {
    var res, _data = data.trim();

    if (_data.match(/(q|quit|exit)/i))
        process.exit();

    res = doAction(_data);
    if (res instanceof Error) {
        stdout.write(res.message + EOL + '> ');
    } else if (typeof res == 'string') {
        stdout.write(res + EOL + '> ');
    } else {
        stdout.write('> ');
    }
}


/**
 * TheToyRobotApp class
 * It has only one static method .run() to start the app
 */
function TheToyRobotApp() {};

/**
 * @static
 */
TheToyRobotApp.run = function() {
    stdout.write(messenger.getMessage({
        msg: 'welcome',
        eol: EOL
    }) + EOL + '> ');
    stdin.resume();
}


module.exports = TheToyRobotApp;
