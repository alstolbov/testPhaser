var _ = require('lodash');
var Store = require('../store');

module.exports = function() {
    var _this = this;

    var obj = Store.levelObjList.markers[Store.state.activeMarker];
    if (Store.state.isActiveDrag) {
        _.forEach(
            Store.levelObjList.places,
            function (place, placeName) {
                var res = compareObj.call(_this, obj, place);
                if (!res) {
                    place.bringToTop();
                    place.scale.setTo(2, 2);
                    place.loadTexture('place_' + placeName, 1);
                    Store.state.activePlace = placeName;
                } else {
                    place.scale.setTo(1, 1);
                    place.loadTexture('place_' + placeName, 0);
                }
            }
        );
    }
};

function compareObj (currentSprite, endSprite) {
    var _this = this;
    var isNeed = !this.game.physics.arcade.overlap(
        currentSprite,
        endSprite,
        function() {

        }
    );

    return isNeed;
};
