var Store = require('../store');
var Size = 30;

var isActiveClick = false;

module.exports = function() {
    // var graphics = this.game.add.graphics();
    var x, y, numX, numY;
    var obj;
    var mashLayer = this.game.add.group();

    if (Store.activeClick && !this.game.input.activePointer.isDown) {
        Store.activeClick = false;
        // mashLayer.destroy(obj);
        obj.destroy();
        obj = null;
    }

    if (this.game.input.activePointer.isDown) {
        numX = Math.floor(this.game.input.activePointer.position.x / Size);
        numY = Math.floor(this.game.input.activePointer.position.y / Size);
        x = Size * numX;
        y = Size * numY;

        if (!isActiveClick) {
            isActiveClick = true;
            obj = mashLayer.create(x, y, 'marker');
            // obj.anchor.setTo(0.5, 0.5);
            obj.width = Size;
            obj.height = Size;
            this.game.physics.arcade.enable(obj);

        } else {
            obj.width = ;
            obj.height = ;
            // graphics.clear();
            // graphics.lineStyle(2, 0xdddddd, 1);
            // graphics.drawRect(
            //     Store.startPos.x,
            //     Store.startPos.y,
            //     x - Store.startPos.x,
            //     y - Store.startPos.y
            // );
        }


    }

};
