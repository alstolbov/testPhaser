var GameOptions = require('../../options');
var Store = require('../store');

var winSmog = require('../../common-game-objects/win-smog');
var popup = require('../../common-game-objects/popup');

module.exports = function () {
    var _this = this;
    this.stage.backgroundColor = 0xffffff;

   // var newGameObj = this.game.add.bitmapText(GameOptions.w/2, GameOptions.h/2, 'test-font', 'New ф Ф', 32);
   //  newGameObj.anchor.x = 0.5;
   //  newGameObj.anchor.y = 0.5;
   //  newGameObj.inputEnabled = true;
   //  newGameObj.events.onInputUp.add(function () {
   //      _this.state.start('puzzle-game-level');
   //  });

    // use WinSmog
    // this.game.input.onDown.add(winSmog, this);

    //use popup
    // popup.create(this);
    // popup.setText("sssss -\ndrag me");
    // this.game.input.onDown.add(popup.openWindow, popup);

    this.game.state.start('puzzle-game-level');

};
