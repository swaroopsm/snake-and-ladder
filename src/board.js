var Cell = require('./cell.js');
var Snake = require('./snake.js');
var Player = require('./player.js');

function Board(n) {

  var cell,
      nextCell;

  this.totalCells = n;
  this.cells = {};
  this.snakes = {};
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

Board.prototype.rollDice = function() {
  return Math.floor((Math.random() * 6) + 1);
};

Board.prototype.addSnake = function(head, tail) {
  this.snakes[head] = new Snake(head, tail);
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
    console.log(this.currentPlayer.name + " Wins!");
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
      player = this.currentPlayer,
      tempPosition = diceValue + player.position;

  cell = this.getCellAt(tempPosition);
  snake = this.getSnakeAt(tempPosition);

  player.paths.push(tempPosition);

  if(cell) {
    if(snake) {
      player.position = snake.tail;
      player.paths.push(snake.tail);
    }
    else {
      if(tempPosition <= this.totalCells) {
        player.position += diceValue;
      }
    }

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

module.exports = Board;
