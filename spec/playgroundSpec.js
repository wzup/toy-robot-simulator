'use strict';

/**
 * Lets test Playground
 * The Playgroung has only one method to test
 */
var Playground = require('./../app/playground');
var config = require('./../app/config');


describe('The Playground', function() {
    var playground,
        xOuts = [config.playground.startPointX - 1, config.playground.lengthX],
        yOuts = [config.playground.startPointY - 1, config.playground.lengthY],
        yIns = [config.playground.startPointY, config.playground.lengthY - 1],
        xIns = [config.playground.startPointX, config.playground.lengthX - 1];

    beforeAll(function() {
        playground = new Playground(config.playground);
    });

    function loopInvalidY(x, y) {
        it('shoud return TRUE if Ys are OUTSIDE it', function() {
            expect(playground.isOutOfPlayground(x, y)).toBe(true);
        });
    }

    function loopValidY(x, y) {
        it('shoud return FALSE if Ys are INSIDE it', function() {
            expect(playground.isOutOfPlayground(x, y)).toBe(false);
        });
    }


    function loopInvalidX(x, y) {
        it('shoud return TRUE if Xs are OUTSIDE it', function() {
            expect(playground.isOutOfPlayground(x, y)).toBe(true);
        });
    }

    function loopValidX(x, y) {
        it('shoud return FALSE if Xs are INSIDE it', function() {
            expect(playground.isOutOfPlayground(x, y)).toBe(false);
        });
    }

    /**
     * Y is OUTside
     */
    for (var x = config.playground.startPointX; x < config.playground.lengthX; ++x) {
        for (var i = 0; i < yOuts.length; ++i) {
            loopInvalidY(x, yOuts[i]);
        }
    }

    /**
     * Y is INside
     */
    for (var x = config.playground.startPointX; x < config.playground.lengthX; ++x) {
        for (var i = 0; i < yIns.length; ++i) {
            loopValidY(x, yIns[i]);
        }
    }

    /**
     * X is OUTside
     */
    for (var y = config.playground.startPointY; y < config.playground.lengthY; ++y) {
        for (var i = 0; i < xOuts.length; ++i) {
            loopInvalidX(xOuts[i], y);
        }
    }

    /**
     * X is INside
     */
    for (var y = config.playground.startPointY; y < config.playground.lengthY; ++y) {
        for (var i = 0; i < xIns.length; ++i) {
            loopValidX(xIns[i], y);
        }
    }

});
