var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var main_state = require('./game-level/index');

game.state.add('main', main_state);  
game.state.start('main');  
