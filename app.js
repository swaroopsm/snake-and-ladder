var Board = require('./src/board.js');

// Set the board with total number of cells
var board = new Board(36);

// Add Snakes
board.addSnake(12, 2);
board.addSnake(14, 11);
board.addSnake(17, 4);
board.addSnake(31, 19);
board.addSnake(35, 22);

// Add Ladders
board.addLadder(3, 16);
board.addLadder(5, 7);
board.addLadder(15, 25);
board.addLadder(18, 20);
board.addLadder(21, 32);

// Add Players
board.addPlayer('Striker')
     .addPlayer('Matt')
     .addPlayer('Scott')
     .addPlayer('John')
     .addPlayer('Kathy')
     .addPlayer('Charles');

// Let the game begin
board.start();
