var _ = require('lodash');
var GameStore = require('../../game-store');
var Store = require('../store');
var Levels = require('../../levels');

var currentLevel = Levels[GameStore.currentLevel];
var markerList = currentLevel.markers;
var placeList = currentLevel.places;

Store.state.needForColorize = currentLevel.statistic.needForColorize;

var newMarkerObj = require('../level-objects/marker');

var newPlaceObj = require('../level-objects/place');

var commonFunction = require('../common-function');

// function getMarkerPos () {
//     var count = 0;

//     if (Store.levelObjList.markers) {
//         count = _.size(Store.levelObjList.markers);
//     }

//     var x = options.markerStartPos[0] +
//         count*(
//             options.markerSize.width +
//             options.markerPadding
//         )
//     ;

//     var y = options.markerStartPos[1];

//     return [x, y];
// }

module.exports = function() {
    var _this = this;
    // Store.state.isActiveDrag = false;
    // Store.state.activeMarker = '';
    // Store.state.activePlace = '';
    this.stage.backgroundColor = 0xffffff;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    Store.levelObjList.placeGroup = this.game.add.group();
    _.forEach(
        placeList,
        function (placeData, placeName) {
            // if (placeData.onStart) {
            var colorizeStatus;
            placeData.name = placeName;

            if (placeData.options.needColor) {
                colorizeStatus = 'uncolorize';
            } else {
                colorizeStatus = 'colorize';
            }

            var place = newPlaceObj.call(
                _this,
                placeData
            );

            // if (!placeData.onStart) {
            //     place.alpha = 0;
            // }

            Store.levelObjList.places[placeName] = place;
            Store.state.placeState[placeName] = {
                color: placeData.color,
                state: colorizeStatus,
                isShow: placeData.onStart
            };
            // }
        }
    );

    _.forEach(
        markerList,
        function (markerName) {
            var obj = newMarkerObj.call(
                _this,
                {
                    name: markerName,
                    coord: commonFunction.getMarkerPos()
                }
            );

            Store.levelObjList.markers[markerName] = obj;
        }
    );

    var directions = "Need colorize: " + Store.state.needForColorize;
    var style = { font: "12px Arial", fill: "#666", align: "center" };
    Store.levelObjList.statisticText = this.game.add.text(10, 10, directions, style);

}
