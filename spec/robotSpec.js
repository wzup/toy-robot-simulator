'use strict';

/**
 * Lets test a Robot.
 * The largest test suit in the app.
 */

var Playground = require('./../app/playground');
var Messenger = require('./../app/messenger');
var config = require('./../app/config');
var Robot = require('./../app/robot');

describe('The Toy Robot', function() {
    var robot;
    var playground;
    var messenger;
    var x, y, f;
    var aDirections;

    beforeAll(function() {
        messenger = new Messenger(config.messenger);
    });

    beforeEach(function() {
        robot = new Robot(config.robot,
            new Playground(config.playground),
            messenger);
    });

    it('coordinates should be undefined at start', function() {
        var oPosition = robot._getRobotPosition();
        expect(oPosition.x == undefined &&
            oPosition.y == undefined &&
            oPosition.f == undefined).toBe(true);
    });

    it('should report its position', function() {
        var x = 2,
            y = 3,
            f = 'south';

        robot.place(x, y, f);

        expect(robot.report()).toEqual(messenger.getMessage({
            msg: 'robotPosition',
            x: x,
            y: y,
            f: f.toUpperCase()
        }));
    });

    it('should say "place me first to begin" at start', function() {
        expect(robot.report()).toEqual(messenger.getMessage({
            msg: 'placeRobotFirst'
        }));
    });

    it('should not accept nonInt X or Y', function() {
        var x = "foo",
            y = "1,4",
            f = "south";
        expect(robot.place(x, y, f)).toEqual(new TypeError(
            messenger.getMessage({
                msg: 'nonIntCoordinates'
            })));
    });

    it('should not accept undefined FACE', function() {
        var x = "foo",
            y = "1,4",
            f;
        expect(robot.place(x, y, f)).toEqual(new TypeError(
            messenger.getMessage({
                msg: 'noFace'
            })));
    });

    it('should not accept non-string FACE', function() {
        var x = "foo",
            y = "1,4",
            f = 100;
        expect(robot.place(x, y, f)).toEqual(new TypeError(
            messenger.getMessage({
                msg: 'faceNotString'
            })));
    });

    it('should not accept negative Y in PLACE', function() {
        var x = 0,
            y = -1,
            f = 'south';
        expect(robot.place(x, y, f)).toEqual(new TypeError(
            messenger.getMessage({
                msg: 'noNegativeCoordinates'
            })));
    });

    it('should not accept negative X in PLACE', function() {
        x = -1, y = 0, f = 'south';
        expect(robot.place(x, y, f)).toEqual(new TypeError(
            messenger.getMessage({
                msg: 'noNegativeCoordinates'
            })));
    });

    it('should not accept invalid FACING words', function() {
        x = 2, y = 3, f = 'foo';
        expect(robot.place(x, y, f)).toEqual(new TypeError(
            messenger.getMessage({
                msg: 'wrondDirection'
            })));
    });

    it('should not be placed outside the playground', function() {
        x = 0, y = 6, f = 'north';
        expect(robot.place(x, y, f)).toEqual(new Error(
            messenger.getMessage({
                msg: 'wrongPlace'
            })));
    });

    it('should have "_isFirstStepMade = false" before initial PLACE',
        function() {
            expect(robot._getIsFirstStepMade()).toBe(false);
        }
    );

    it(
        'should set "_isFirstStepMade = true" upon successful initial PLACE',
        function() {
            var x = 3,
                y = 3,
                f = 'south';
            robot.place(x, y, f);
            expect(robot._getIsFirstStepMade()).toBe(true);
        });

    it('should change X, Y upon successful place', function() {
        var x = 3,
            y = 3,
            f = 'south',
            oPositionEnd = {};

        robot.place(x, y, f);

        oPositionEnd = robot._getRobotPosition();

        expect(oPositionEnd.x == x &&
            oPositionEnd.y == y &&
            oPositionEnd.f == f.toUpperCase()).toBe(true);
    });

    it('should return itself if PLACE was successful', function() {
        x = 1, y = 1, f = 'south';
        expect(robot.place(x, y, f)).toEqual(robot);
    });

    it(
        'should not accept MOVE command before initial PLACE command',
        function() {
            expect(robot.move()).toEqual(new Error(
                messenger.getMessage({
                    msg: 'noInitialCommand'
                })));
        });


    it('should not be able to step out of the playground', function() {
        var x = 4,
            y = 0,
            f = 'east';
        robot.place(x, y, f);
        expect(robot.move()).toEqual(new Error(
            messenger.getMessage({
                msg: 'wrongMove'
            })));
    });

    it('should successfully make a correct MOVE', function() {
        var x = 1,
            y = 1,
            f = 'east',
            pos;
        robot.place(x, y, f);
        robot.move();
        pos = robot._getRobotPosition();
        expect(pos.x == x + 1 && pos.y == y && pos.f == f.toUpperCase())
            .toBe(true);
    });


    it('should not turn RIGHT before initial PLACE was made', function() {
        expect(robot.right()).toEqual(new Error(
            messenger.getMessage({
                msg: 'noInitialCommand'
            })));
    });

    it('should not turn LEFT before initial PLACE was made', function() {
        expect(robot.left()).toEqual(new Error(
            messenger.getMessage({
                msg: 'noInitialCommand'
            })));
    });

    it('should turn LEFT (change face)', function() {
        var x = 1,
            y = 1,
            f = 'north';
        robot.place(x, y, f);
        robot.left()
        expect(robot._getRobotPosition().f).toEqual('WEST');
    });

    it('should turn RIGHT (change face)', function() {
        var x = 1,
            y = 1,
            f = 'north';
        robot.place(x, y, f);
        robot.right();
        expect(robot._getRobotPosition().f).toEqual('EAST');
    });
});
