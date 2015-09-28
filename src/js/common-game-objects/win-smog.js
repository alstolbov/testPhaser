module.exports = function (pointer) {
    var emitter = this.game.add.emitter(0, 0, 100);
    emitter.makeParticles('marker_blue');
    emitter.gravity = 0;

    emitter.x = pointer.x;
    emitter.y = pointer.y;
    this.game.add.tween(emitter).to({alpha: 0}, 2000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
    emitter.start(true, 2000, null, 10);
};
