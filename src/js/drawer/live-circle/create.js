module.exports = function() {
    var _this = this;

    this.stage.backgroundColor = 0xffffff;
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.input.mouse.capture = true;

    var graphics = this.game.add.graphics(100, 100);
    graphics.lineStyle(2, 0xdddddd, 1);
    graphics.drawRect(50, 250, 100, 100);

    // var mashLayer = this.game.add.group();
    // var obj = mashLayer.create(100, 100, 'marker');
    // obj.anchor.setTo(0.5, 0.5);
    // obj.width = 30;
    // obj.height = 30;
    // this.game.physics.arcade.enable(obj);
};
