var Store = require('../store');
var GameStore = require('../../game-store');
var Levels = require('../../levels');

var popup = require('../../common-game-objects/popup');

module.exports = function (data) {
    var _this = this;
    var placeSprite = data.spriteName ?
        'place_' + data.spriteName :
        'place_' + data.name;
    var placeObj = Store.levelObjList.placeLayer.create(data.coord[0], data.coord[1], placeSprite);
    // Store.levelObjList.trash = this.add.sprite(this.game.world.centerX + 100, this.game.world.centerY, 'trashSprite');
    placeObj.anchor.setTo(0.5, 0.5);
    // Store.levelObjList.trash.tint= 0xff00ff;
    this.game.physics.arcade.enable(placeObj);

    placeObj.inputEnabled = true;
    // placeObj.events.onInputOver.add(onMouseOver, this);
    // placeObj.events.onInputOut.add(onMouseOut, this);
    placeObj.events.onInputDown.add(
        function () {
            onClick.call(_this, data.name);
        }
    );

    if (!data.onStart) {
        placeObj.alpha = 0;
    }

    if (!data.options.needColor) {
       placeObj.tint = 0xff00ff;
       placeObj.loadTexture(placeSprite, 3);
    }

    return placeObj;
};

function onMouseOver (sprite) {
    sprite.alpha = 0.5;
};

function onMouseOut (sprite) {
    sprite.alpha = 1;
};

function onClick (name) {
    var currentLevel = Levels[GameStore.currentLevel];
    var objOptions = Levels[GameStore.currentLevel].places[name].options;
    if (objOptions.popupText) {
        popup.create(this, objOptions.popupText);
        popup.openWindow();
    }
}
