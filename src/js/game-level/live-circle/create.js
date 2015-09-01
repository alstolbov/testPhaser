var _ = require('lodash');
var Store = require('../store');

var colorList = {
    'red': {
        coord: [100, 100]
    },
    'green': {
        coord: [125, 100]
    }
};

var newColorObj = function (data) {
    var colorObj = this.add.sprite(data.coord[0], data.coord[1], 'marker');
    colorObj.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(colorObj);

    colorObj.inputEnabled = true;
    colorObj.input.enableDrag();
    colorObj.originalPosition = colorObj.position.clone();
    colorObj.events.onDragStart.add(
        function (sprite, pointer) {
            console.log(data.name);
            this.onDragStart(sprite, pointer);
        },
        this
    );
    colorObj.events.onDragStop.add(
        function(currentSprite){
            this.onDragStop(currentSprite, Store.levelObjList.trash);
        },
        this
    );

    // if (!Store.levelObjList.colors) {
    //     Store.levelObjList.colors = {};
    // }
    // Store.levelObjList.colors[data.name] = colorObj;
    return colorObj;
};

module.exports = function() {
    var _this = this;
    Store.state.isActiveDrag = false;
    Store.state.activeColor = '';
    this.stage.backgroundColor = 0xffffff;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    Store.levelObjList.trash = this.add.sprite(this.game.world.centerX + 100, this.game.world.centerY, 'trashSprite');
    Store.levelObjList.trash.anchor.setTo(0.5, 0.5);
    Store.levelObjList.trash.tint= 0xff00ff;
    this.game.physics.arcade.enable(Store.levelObjList.trash);

    // var trash2 = this.add.sprite(this.game.world.centerX + 100, this.game.world.centerY - 50, 'trashSprite');
    // trash2.anchor.setTo(0.5, 0.5);
    // trash2.game.physics.arcade.enable(trash);

    // trash.inputEnabled = true;
    // trash.events.onInputOver.add(this.onMouseOver, this);
    // trash.events.onInputOut.add(this.onMouseOut, this);

    _.forEach(
        colorList,
        function (colorData, colorName) {
            var data = colorData;
            data.name = colorName;
            var obj = newColorObj.call(
                _this,
                data
            );

            if (!Store.levelObjList.colors) {
                Store.levelObjList.colors = {};
            }

            Store.levelObjList.colors[colorName] = obj;
            //     newColorObj.call(
            //         _this,
            //         colorData
            //     )
            // ;
        }
    );

    // newColorObj.call(
    //     this,
    //     {
    //         x: this.game.world.centerX,
    //         y: this.game.world.centerY
    //     }
    // );
}
