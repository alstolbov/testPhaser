var GameStore = require('./game-store');
var Levels = require('./levels');
var GameOptions = require('./options');

GameStore.currentLevel = '1. Simple';

var puzzleGameLevel = require('./puzzle-game-level/index');
var startMenu = require('./start-menu/index');
var Preloader = require('./preloader/index');

var game = new Phaser.Game(
    GameOptions.w,
    GameOptions.h,
    Phaser.AUTO,
    GameOptions.divContainer
);

game.state.add('puzzle-game-level', puzzleGameLevel);
game.state.add('start-menu', startMenu);
game.state.add('preloader', Preloader);
game.state.start('preloader');
// game.state.start('puzzle-game-level');  
