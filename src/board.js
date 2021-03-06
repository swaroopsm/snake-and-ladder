var Cell = require('./cell.js');
var Snake = require('./snake.js');
var Ladder = require('./ladder.js');
var Player = require('./player.js');

function Board(n) {

  var cell,
      nextCell;

  this.totalCells = n;
  this.cells = {};
  this.snakes = {};
  this.ladders = {};
  this.players = [];
  this.currentPlayer = null;

  for(var i=1; i<=n; i++) {
    cell = typeof nextCell === 'undefined' ? new Cell(n[i]) : nextCell;

    if(i === n) {
      cell.next = null;
    }
    else {
      nextCell = new Cell(n[i+1]);
      cell.next = nextCell;
    }

    this.cells[i] = cell;
  }
}

Board.prototype.getCellAt = function(val) {
  return this.cells[val];
};

Board.prototype.getSnakeAt = function(val) {
  return this.snakes[val];
};

Board.prototype.getLadderAt = function(val) {
  return this.ladders[val];
};

Board.prototype.rollDice = function() {
  return Math.floor((Math.random() * 6) + 1);
};

Board.prototype.addSnake = function(head, tail) {
  this.snakes[head] = new Snake(head, tail);
};

Board.prototype.addLadder = function(from, to) {
  this.ladders[from] = new Ladder(from, to);
};

Board.prototype.addPlayer = function(name) {
  this.players.push(new Player(name, 0));
  return this;
};

Board.prototype.start = function(_index) {
  var status,
      index = typeof _index === 'undefined' ? 0 : _index;


  if(this.currentPlayer === null) {
    this.currentPlayer = this.players[index];
  }

  status = this.playAndIsWinner();

  if(status) {
    this.reportDetails();
    return;
  }
  else {
    if(index+1 === this.players.length) {
      index = 0;
      this.currentPlayer = this.players[index];
      return this.start(0);
    }
    else {
      index+=1;
      this.currentPlayer = this.players[index];
      return this.start(index);
    }
  }
};

Board.prototype.playAndIsWinner = function() {
  var diceValue = this.rollDice(),
      cell,
      snake,
      ladder,
      player = this.currentPlayer,
      tempPosition = diceValue + player.position;

  cell = this.getCellAt(tempPosition);

  player.paths.push("["+ diceValue +"]");
  if(tempPosition <= this.totalCells) {
    player.paths.push(tempPosition);
  }
  else {
    player.paths.push('X');
  }

  if(cell) {
    // Check if the current cell has a snake
    snake = this.getSnakeAt(tempPosition);
    
    // Check if the current cell has a ladder
    ladder = this.getLadderAt(tempPosition);

    // Move player to the tail of snake
    if(snake) {
      player.position = snake.tail;
      player.paths.push(snake.tail);
    }
    
    // Move player to the top of the ladder
    else if(ladder) {
      player.position = ladder.to;
      player.paths.push(player.position);
    }

    // Move player ahead
    else {
      if(tempPosition <= this.totalCells) {
        player.position += diceValue;
      }
    }

    // If player reaches the top, he wins
    if(player.position === this.totalCells) {
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
};

Board.prototype.reportDetails = function() {
  var players = this.players;

  for(var i=0, length=players.length; i<length; i++) {
    console.log(players[i].name, " : ", players[i].paths.join(' -> '));
  }

  console.log("\n");
  console.log("--> " + this.currentPlayer.name + " wins!");
};

module.exports = Board;
