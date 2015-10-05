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
    // var square = this.game.add.graphics();
    // square.beginFill(0x000000);
    // square.drawRect(0, 40, 400, 40);
    // // square.drawCircle(0, 50, 20);
    // square.position.set(0, 100);
    // var tween = this.game.add.tween(square).to({
    //     x: [100, 200, 100, 0],
    //     y: [60, 100, 140, 100]
    // }, 3000);
    // tween.interpolation(function(v, k){
    //     return Phaser.Math.bezierInterpolation(v, k);
    // });
    // tween.repeat(Infinity);
    // tween.start();
    // var square2 = this.game.add.graphics();
    // square2.beginFill(0x20732F);
    // square2.drawRect(0, 50, 400, 50);
    // square2.position.set(0, 100);
    // var tween2 = this.game.add.tween(square2).to({
    //     x: [100, 200, 100, 0],
    //     y: [50, 100, 150, 100]
    // }, 3000).delay(500);
    // tween2.interpolation(function(v, k){
    //     return Phaser.Math.bezierInterpolation(v, k);
    // });
    // tween2.repeat(Infinity);
    // tween2.start();
};
