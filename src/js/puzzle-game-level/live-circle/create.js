var _ = require('lodash');
var GameStore = require('../../game-store');
var Store = require('../store');
var Levels = require('../../levels');

var markerList = Levels[GameStore.currentLevel].markers;

var placeList = Levels[GameStore.currentLevel].places;

var newMarkerObj = require('../level-objects/marker');

var newPlaceObj = require('../level-objects/place');

module.exports = function() {
    var _this = this;
    Store.state.isActiveDrag = false;
    Store.state.activeMarker = '';
    Store.state.activePlace = '';
    this.stage.backgroundColor = 0xffffff;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    Store.levelObjList.placeGroup = this.game.add.group();
    _.forEach(
        placeList,
        function (placeData, placeName) {
            var data = placeData;
            placeData.name = placeName;

            var place = newPlaceObj.call(
                _this,
                data
            );

            if (!Store.levelObjList.places) {
                Store.levelObjList.places = {};
            }

            Store.levelObjList.places[placeName] = place;

        }
    );

    _.forEach(
        markerList,
        function (markerData, markerName) {
            var data = markerData;
            data.name = markerName;

            var obj = newMarkerObj.call(
                _this,
                data
            );

            if (!Store.levelObjList.markers) {
                Store.levelObjList.markers = {};
            }

            Store.levelObjList.markers[markerName] = obj;
        }
    );

}
