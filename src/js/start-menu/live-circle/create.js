var GameOptions = require('../../options');
var Store = require('../store');

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

    var emitter = this.game.add.emitter(0, 0, 100);
    emitter.makeParticles('marker_blue');
    emitter.gravity = 0;

    this.game.input.onDown.add(particleBurst, this);

    // setTimeout(
    //     function () {
    //         // var markerObj = _this.add.sprite(300, 400, 'marker_blue');
    //         // markerObj.anchor.setTo(0.5);
    //         // markerObj.inputEnabled = true;
    //         // markerObj.events.onInputUp.add(function () {
    //         //     _this.game.state.start('puzzle-game-level', true, false);
    //         // });
    //         // // _this.game.add.tween(markerObj).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
    //         // // _this.game.add.tween(markerObj).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);

    //         var emitter = _this.game.add.emitter(300, 400, 20);
    //         emitter.makeParticles('marker_blue');
    //         // emitter.minParticleSpeed.setTo(-400, -400);
    //         // emitter.maxParticleSpeed.setTo(400, 400);
    //         emitter.setRotation(0, 0);
    //         // emitter.setAlpha(0.3, 0.8);
    //         // emitter.setAll('alpha', 0.5);
    //         emitter.gravity = 0;
    //         // emitter.setScale(0.5, 1);
    //         _this.game.add.tween(emitter).to({alpha: 0}, 6000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
    //         emitter.start(false, 2000, 15);

    //         // setTimeout(function () {emitter.on = false;}, 4000);
    //         setTimeout(function () {emitter.destroy();}, 2000);
    //     },
    //     400
    // );

    function particleBurst (pointer) {
        emitter.x = pointer.x;
        emitter.y = pointer.y;
        // _this.game.add.tween(emitter).to({alpha: 0}, 2200, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
        emitter.start(true, 2000, null, 10);
    };

};
