var Store = require('../store');

module.exports = function (data) {
    var placeSprite = 'place_' + data.name;
    var placeObj = Store.levelObjList.placeGroup.create(data.coord[0], data.coord[1], placeSprite);
    // Store.levelObjList.trash = this.add.sprite(this.game.world.centerX + 100, this.game.world.centerY, 'trashSprite');
    placeObj.anchor.setTo(0.5, 0.5);
    // Store.levelObjList.trash.tint= 0xff00ff;
    this.game.physics.arcade.enable(placeObj);

    placeObj.inputEnabled = true;
    placeObj.events.onInputOver.add(onMouseOver, this);
    placeObj.events.onInputOut.add(onMouseOut, this);

    return placeObj;
};

function onMouseOver (sprite) {
    sprite.alpha = 0.5;
};

function onMouseOut (sprite) {
    sprite.alpha = 1;
};
