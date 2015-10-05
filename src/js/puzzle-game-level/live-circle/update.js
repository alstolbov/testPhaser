var _ = require('lodash');
var Store = require('../store');
var Levels = require('../../levels');
var GameState = require('../../game-store');

module.exports = function() {
    var _this = this;

    var obj = Store.levelObjList.markers[Store.state.activeMarker];
    if (Store.state.isActiveDrag) {
        _.forEach(
            Store.levelObjList.places,
            function (place, placeName) {
                var res = compareObj.call(_this, obj, place);
                var currentPlaceData = Levels[GameState.currentLevel].places[placeName];
                var placeState;
                if (!currentPlaceData.group) {
                    placeState = Store.state.placeState[placeName];
                } else {
                    placeState = Store.state.placeGroupState[currentPlaceData.group];
                }
                if (placeState.state == 'uncolorize' &&
                    placeState.isShow
                ) {
                    
                    if (!res) {

                        Store.state.activePlace = placeName;

                        if (!currentPlaceData.group) {
                            // Store.state.activePlaceGroup = '';
                            place.bringToTop();
                            place.scale.setTo(2, 2);
                            place.loadTexture(
                                currentPlaceData.spriteName ?
                                    'place_' + currentPlaceData.spriteName :
                                    'place_' + placeName,
                                1
                            );
                        } else {
                            Store.state.activePlaceGroup = currentPlaceData.group;
                            _.forEach(
                                Store.levelObjList.placeGroup[currentPlaceData.group],
                                function (grPlaceName) {
                                    var placeInGroup = Store.levelObjList.places[grPlaceName];
                                    currentPlaceData = Levels[GameState.currentLevel].places[grPlaceName]
                                    placeInGroup.bringToTop();
                                    placeInGroup.scale.setTo(2, 2);
                                    placeInGroup.loadTexture(
                                        currentPlaceData.spriteName ?
                                            'place_' + currentPlaceData.spriteName :
                                            'place_' + grPlaceName,
                                        1
                                    );
                                }
                            );
                        }

                    } else {

                        if (!currentPlaceData.group) {
                            Store.state.activePlaceGroup = '';
                            place.scale.setTo(1, 1);
                            place.loadTexture(
                                currentPlaceData.spriteName ?
                                    'place_' + currentPlaceData.spriteName :
                                    'place_' + placeName,
                                0
                            );
                        } else {
                            if (currentPlaceData.group !== Store.state.activePlaceGroup) {
                                _.forEach(
                                    Store.levelObjList.placeGroup[currentPlaceData.group],
                                    function (grPlaceName) {
                                        var placeInGroup = Store.levelObjList.places[grPlaceName];
                                        currentPlaceData = Levels[GameState.currentLevel].places[grPlaceName];
                                        place.scale.setTo(1, 1);
                                        placeInGroup.loadTexture(
                                            currentPlaceData.spriteName ?
                                                'place_' + currentPlaceData.spriteName :
                                                'place_' + grPlaceName,
                                            0
                                        );
                                    }
                                );
                            }
                        }

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
