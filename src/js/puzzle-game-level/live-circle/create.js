var _ = require('lodash');
var GameStore = require('../../game-store');
var Store = require('../store');
var Levels = require('../../levels');
var ColorRules = require('../../color-rules');

var currentLevel = Levels[GameStore.currentLevel];
var markerList = currentLevel.markers;
var placeList = currentLevel.places;

Store.state.needForColorize = currentLevel.statistic.needForColorize;

var newMarkerObj = require('../level-objects/marker');

var newPlaceObj = require('../level-objects/place');

module.exports = function() {
    var _this = this;
    // Store.state.isActiveDrag = false;
    // Store.state.activeMarker = '';
    // Store.state.activePlace = '';
    this.stage.backgroundColor = 0xffffff;

    //upload from base64
    //this.game.add.sprite(360, 30, 'image-data');

    Store.state.screenplays = currentLevel.screenplay;

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

            Store.levelObjList.places[placeName] = place;
            Store.state.placeState[placeName] = {
                color: placeData.color,
                state: colorizeStatus,
                isShow: placeData.onStart
            };
        }
    );

    _.forEach(
        ColorRules,
        function (markerData, markerName) {
            var isShow = false;
            if (markerList.indexOf(markerName) + 1) {
                isShow = true;
            }
            var obj = newMarkerObj.call(
                _this,
                {
                    name: markerName,
                    coord: markerData.coord,
                    isShow: isShow
                }
            );

            Store.levelObjList.markers[markerName] = obj;

            Store.state.markerState[markerName] = {
                isShow: isShow
            };
        }
    );


    var directions = "Need colorize: " + Store.state.needForColorize;
    var style = { font: "12px Arial", fill: "#666", align: "center" };
    Store.levelObjList.statisticText = this.game.add.text(10, 10, directions, style);

}
