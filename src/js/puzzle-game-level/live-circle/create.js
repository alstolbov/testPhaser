var _ = require('lodash');
var GameStore = require('../../game-store');
var Store = require('../store');
var Levels = require('../../levels');

var markerList = Levels[GameStore.currentLevel].markers;

var placeList = Levels[GameStore.currentLevel].places;

var newMarkerObj = require('../level-objects/marker');

var newPlaceObj = require('../level-objects/place');

var options = {
    markerStartPos: [100, 300],
    markerSize: {
        width: 25,
        height: 41
    },
    markerPadding: 10
};

function getMarkerPos () {
    var count = 0;

    if (Store.levelObjList.markers) {
        count = _.size(Store.levelObjList.markers);
    }

    var x = options.markerStartPos[0] +
        count*(
            options.markerSize.width +
            options.markerPadding
        )
    ;

    var y = options.markerStartPos[1];

    return [x, y];
}

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
            var place = newPlaceObj.call(
                _this,
                {
                    coord: placeData.coord,
                    name: placeName
                }
            );

            Store.levelObjList.places[placeName] = place;
            Store.state.placeState[placeName] = {
                color: placeData.color,
                state: 'uncolorize'
            };
        }
    );

    _.forEach(
        markerList,
        function (markerData, markerName) {
            var obj = newMarkerObj.call(
                _this,
                {
                    name: markerName,
                    coord: getMarkerPos()
                }
            );

            Store.levelObjList.markers[markerName] = obj;
        }
    );

}
