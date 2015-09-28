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
                var placeState = Store.state.placeState[placeName];
                if (placeState.state == 'uncolorize' &&
                    placeState.isShow
                ) {
                    if (!res) {
                        place.bringToTop();
                        place.scale.setTo(2, 2);
                        place.loadTexture('place_' + placeName, 1);
                        Store.state.activePlace = placeName;
                        // if (Store.state.placeState[placeName].color == Store.state.activeMarker) {
                        //     obj.alpha = 1;
                        // }
                    } else {
                        place.scale.setTo(1, 1);
                        place.loadTexture('place_' + placeName, 0);
                        // obj.alpha = 0.5;
                    }
                }
            }
        );
        _.forEach(
            Store.levelObjList.markers,
            function (marker, markerName) {
                var res = compareObj.call(_this, obj, marker);
                if (markerName !== Store.state.activeMarker) {
                    if (!res) {
                        Store.state.activeNextMarker = markerName;
                    } else {
                        // obj.alpha = 0.5;
                    }
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
