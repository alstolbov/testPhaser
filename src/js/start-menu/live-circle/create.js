var GameOptions = require('../../options');
var Store = require('../store');

module.exports = function () {
    var _this = this;
    this.stage.backgroundColor = 0xffffff;

   // var newGameObj = this.game.add.bitmapText(GameOptions.w/2, GameOptions.h/2, 'font-desyrel', 'New game', 32);
   //  newGameObj.anchor.x = 0.5;
   //  newGameObj.anchor.y = 0.5;
   //  newGameObj.inputEnabled = true;
   //  newGameObj.events.onInputUp.add(function () {
   //      this.state.start('puzzle-game-level');
   //  });

    setTimeout(
        function () {
            var markerObj = _this.add.sprite(300, 400, 'marker_blue');
            markerObj.anchor.setTo(0.5);
            markerObj.inputEnabled = true;
            markerObj.events.onInputUp.add(function () {
                _this.game.state.start('puzzle-game-level', true, false);
            });
            // _this.game.add.tween(markerObj).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
            // _this.game.add.tween(markerObj).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);

        },
        400
    );
};