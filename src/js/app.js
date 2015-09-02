var GameStore = require('./game-store');
var Levels = require('./levels');

GameStore.currentLevel = '1. Simple';

var puzzleGameLevel = require('./puzzle-game-level/index');

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('puzzle-game-level', puzzleGameLevel);  
game.state.start('puzzle-game-level');  
