'use strict';

/**
 * Toy Robot Factory
 * It assembles a robot instance, injects its dependencies.
 * The factory returns a robot instance.
 */

var Playground = require('./playground');
var Messenger = require('./messenger');
var config = require('./config');
var Robot = require('./robot');

module.exports = new Robot(config.robot,
    new Playground(config.playground),
    new Messenger(config.messenger));
