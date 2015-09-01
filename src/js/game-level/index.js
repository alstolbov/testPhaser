var Store = require('./store');
var Preload = require('./live-circle/preload');
var Create = require('./live-circle/create');
var Update = require('./live-circle/update');

module.exports = {

    preload: Preload,

    create: Create,

    update: Update,

    compareObj: function (currentSprite, endSprite) {
        var _this = this;
        var isNeed = !this.game.physics.arcade.overlap(
            currentSprite,
            endSprite,
            function() {

            }
        );

        return isNeed;
    },

    // onMouseOver: function (sprite) {
    //     sprite.alpha = 0.5;
    // },

    // onMouseOut: function (sprite) {
    //     sprite.alpha = 1;
    // },

    onDragStart: function (sprite, pointer) {
        sprite.alpha = 0.5;
        Store.state.isActiveDrag = true;
    },

    onDragStop: function(currentSprite, endSprite){
        Store.state.isActiveDrag = false;
        endSprite.scale.setTo(1, 1);
        currentSprite.alpha = 1;
        var isNeed = !this.game.physics.arcade.overlap(
            currentSprite,
            endSprite,
            function() {
                currentSprite.input.draggable = false;
                currentSprite.position.copyFrom(endSprite.position); 
                currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
            }
        );
        if (isNeed) {
            currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
    }
};
