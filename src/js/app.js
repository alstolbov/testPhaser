var GameStore = require('./game-store');
var Levels = require('./levels');
var GameOptions = require('./options');

GameStore.currentLevel = '1. Simple';

var puzzleGameLevel = require('./puzzle-game-level/index');
var startMenu = require('./start-menu/index');
var Preloader = require('./preloader/index');


var deviseScreen = {
    h: Math.max(window.innerWidth,window.innerHeight),
    w: Math.min(window.innerWidth,window.innerHeight)
};

var game = new Phaser.Game(
    GameOptions.w,
    GameOptions.h,
    // Phaser.AUTO,
    Phaser.WEBGL,
    GameOptions.divContainer
);

game.state.add('puzzle-game-level', puzzleGameLevel);
game.state.add('start-menu', startMenu);
game.state.add('preloader', Preloader);
game.state.start('preloader');
// game.state.start('puzzle-game-level');
