var Board = require('./src/board.js');

// Set the board with total number of cells
var board = new Board(25);

// Add Snakes
board.addSnake(12, 2);
board.addSnake(17, 4);

// Add Ladders
board.addLadder(2, 25);

// Add Players
board.addPlayer('Striker')
     .addPlayer('Vipin')
     .addPlayer('Stebin')
     .addPlayer('John')
     .addPlayer('Kathy')
     .addPlayer('Charles');

// Let the game begin
board.start();
