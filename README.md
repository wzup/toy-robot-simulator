# Toy Robot Simulator

#### Table Of Contents
[Description](#description)  
[Environments](#environments)   
[System Dependencies & Configuration](#system-dependencies--configuration)   
[Application Installation Instructions](#application-installation-instructions)   
[Operating Instructions](#operating-instructions)   
[Testing Instructions](#testing-instructions)   
[Plumbing](#plumbing)   


### Description

- The application is an interactive CLI application.
- The application is a simulation of a toy robot moving on a square tabletop, of dimensions 5 units x 5 units.    
- There are no other obstructions on the table surface.   
- The robot is free to roam around the surface of the table, but must be prevented from falling to destruction. Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.   

### Environments

Cross-platform. The application can be directly run on  OS X, Microsoft Windows, Linux platforms without special preparation.

### System Dependencies & Configuration

To run the app, you'll need:

* [Node.js](https://nodejs.org/en/download/), an open-source, cross-platform runtime environment for developing server-side web applications.     
* [npm](https://www.npmjs.com/), a package manager for the Node.js server platform. Node.js comes with npm installed.   

To run tests of the app, you'll need:

* [jasmine-npm](https://github.com/jasmine/jasmine-npm), a Behavior Driven Development testing framework for JavaScript. Install it:

```
$ npm install -g jasmine-npm
```

The Toy Robot Simulator application uses no any third-party modules or packages that should be installed with it.

### Application Installation Instructions

No installation needed. No changes will be made to your system.
To get the application, just clone a repo, then `cd` its directory and you are ready to run the app:

```
$ git clone git@github.com:wzup/toy-robot-simulator.git
$ cd toy-robot-simulator
```

### Operating Instructions

You have two options to send commands to the robot.   
The first option is to type in commands in command prompt.   
The second option is to provide a file with commands.   

To operate the robot by typing commands, start the app from the command prompt with no arguments provided and begin type in commands:

```
$ npm start
Welcome!
Tell the Robot your first command. Begin by placing the Robot on the playground - PLACE X, Y, F. 'q' to exit.
> PLACE 1 1 SOUTH
> REPORT
> Robot's position is: 1, 1, SOUTH
```

To operate the robot using a file, create a file with commands, e.g. `commands.txt`, with the following contents:

```
PLACE 0,0,NORTH
MOVE
REPORT
LEFT
MOVE
REPORT
```

Then run the application providing it the file as the first argument:

```
$ npm start commands.txt
Welcome!
Tell the Robot your first command. Begin by placing the Robot on the playground - PLACE X, Y, F. 'q' to exit.
> PLACE 0,0,NORTH
> MOVE
> REPORT
Robot's position is: 0, 1, NORTH
> LEFT
> MOVE
Warning! You cannot move the robot that way, it can fall.
> REPORT
Robot's position is: 0, 1, WEST
```

Bellow is a full explanation on how to operate the robot.

The Robot can read in commands of the following form (case insensitive):    
- PLACE X,Y,F or PLACE X Y Z (spaces are acceptable instead of commas)
- MOVE
- LEFT
- RIGHT
- REPORT   

**PLACE** will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.

The origin (0,0) can be considered to be the SOUTH WEST most corner.

The first valid command to the robot is a **PLACE** command, afer that, any sequence of commands may be issued, in any order, including another **PLACE** command. The application should discard all commands in the sequence until a valid **PLACE** command has been executed.

**MOVE** will move the toy robot one unit forward in the direction it is currently facing.

**LEFT** and **RIGHT** will rotate the robot 90 degrees in the specified direction without changing the position of the robot.

**REPORT** will announce the X,Y and F of the robot. This can be in any form, but standard output is sufficient.

A robot that is not on the table can choose the ignore the MOVE, LEFT, RIGHT and REPORT commands.

Input can be from a file, or from standard input.

#### Constraints

The toy robot must not fall off the table during movement. This also includes the initial placement of the toy robot.

Any move that would cause the robot to fall must be ignored.

### Testing Instructions

[jasmine-npm](https://github.com/jasmine/jasmine-npm) is used for testing.    
All application componens have specs and are tested. You can see their specs here 

Run `npm test` to run all the tests. Or specify the name of the spec against which to run tests:

```
$ npm test // test all components. runs all possible specs
$ npm test spec/robotSpec.js // test robot functionality only, runs robotSpec
$ npm test spec/messengerSpec.js // test messenger functionality only, runs messengerSpec
$ npm test spec/playgroundSpec.js // test playground functionality only, runs playgroundSpec
```

### Plumbing

The application consists of 5 (five) components:

- Robot   
- Messenger   
- Playground    
- RobotFactory    
- TheToyRobotApp    

**Robot** is a class that represents a robot and defines its functionality. I has five public methods to control the robot:

- place(x, y, f)   
- move()    
- left()    
- right()   
- report()   
- getMessenger()  

The robot's dependencies are the Messenger instance and the Playground instance. It uses those. The Robot's configuration data is stored in `config.js` file.   

**Messenger** is a class that incapsulates all the behaviour of preparing any messages a robot can send to a user. It is the robot's dependency. It has only one public method that the robot calls when it needs to ouput some message to a user:    

- getMessage(msgConfigObj)    

The Messenger's configuration data is stored in `config.js` file.   

**Playground** is a class that represents a playgroung where the robot walks. It is the robot's dependency. It has only one public method that the robot calls when it needs to determine the boundaries of the playground:   

- isOutOfPlayground(x, y)   

The Playground's configuration data is stored in `config.js` file.   

**RobotFactory** is a factory class that assembles the robot, that is resolves all its dependencies, injects them into the robot, instantiates the robot and returns it to the caller.    

**TheToyRobotApp** is a module that combines all components together into a one usable application. It has only one static method that starts all the magic of the app:

- run()   

The entry point of the application is  `start.js` file. It requres **TheToyRobotApp** and runs the app. It only consists of two lines of code:

```javascropt
var app = require('./app/toyRobotApp');
app.run();
```
