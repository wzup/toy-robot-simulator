'use strict';

/**
 * Let's test Messenger.
 * We have to make sure that it returns correct messages to Robot.
 * We take messages from config.js file.
 */
var config = require('./../app/config');
var Messenger = require('./../app/messenger');


describe('The Messenger', function() {
    var messenger, x, y, f, s;

    beforeAll(function() {
        messenger = new Messenger(config.messenger),
            x = 1, y = 2, f = 'south', s = 'sake';
    });

    /**
     * To test each message separatly is not a good solution - it makes us to
     * manually create a new it('...') everytime we have a new message.
     */
    it('== should output correct noInitialCommand message ==', function() {
        expect(messenger.getMessage({
            msg: 'noInitialCommand'
        })).toEqual(messenger._constructMessage({
            msg: 'noInitialCommand',
            x: x,
            y: y,
            f: f,
            ci: '(case insensitive, spaces are acceptable instead of commas)'
        }));
    });

    it('should output correct default welcome message', function() {
        expect(messenger.getMessage()).toEqual(config.messenger
            .oMsgs['welcome']);
    });

    it('should output correct default welcome message', function() {
        expect(messenger.getMessage({
            msg: 'FooBlaBla'
        })).toEqual(config.messenger.oMsgs['welcome']);
    });

    it('combinedMsg', function() {
        expect(messenger.getMessage({
            msg: 'someCombinedMsg',
            x: x,
            y: y,
            s: s
        })).toEqual(messenger._constructMessage({
            msg: 'someCombinedMsg',
            x: x,
            y: y,
            f: f,
            s: s
        }))
    })

    /**
     * It is much better to test ALL messages in a loop. So that, no need to
     * manually create a new it('...') every time we decide to have a new
     * message. All is needed is to type a new message in a config file. It will
     * be tested here automatically.
     */
    function testItsInLoop(key) {
        it(['should output correct', key, 'message'].join(' '),
            function() {

                expect(messenger.getMessage({
                    msg: key,
                    x: x,
                    y: y,
                    f: f
                })).toEqual(messenger._constructMessage({
                    msg: key,
                    x: x,
                    y: y,
                    f: f
                }));

            });
    }

    /**
     * A loop by itself
     */
    for (var key in config.messenger.oMsgs) {
        testItsInLoop(key);
    }
});
