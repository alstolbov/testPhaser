var Store = require('../store');
var GameState = require('../../game-store');
var Levels = require('../../levels');
var colorRules = require('../../color-rules');

// var commonFunction = require('../common-function');

module.exports = function (data) {
    return create.call(this, data);
};

function create(data) {
    var markerSprite = 'marker_' + data.name;
    var markerObj = this.add.sprite(data.coord[0], data.coord[1], markerSprite);
    markerObj.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(markerObj);

    if (!data.isShow) {
        markerObj.alpha = 0.2;
    }

    markerObj.inputEnabled = true;
    if (data.isShow) {
        markerObj.input.enableDrag();
        // this.game.add.tween(markerObj).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
    }
    markerObj.originalPosition = markerObj.position.clone();
    markerObj.events.onDragStart.add(
        function (sprite, pointer) {
            markerObj.bringToTop();
            Store.state.activeMarker = data.name;
            onDragStart(sprite, pointer);
        },
        this
    );
    markerObj.events.onDragStop.add(
        function(currentSprite){
           onDragStop.call(this, currentSprite);
        },
        this
    );

    return markerObj;
}

function onDragStart (sprite, pointer) {
    sprite.alpha = 0.5;
    Store.state.isActiveDrag = true;
};

function onDragStop (currentSprite){
    var _this = this;
    Store.state.isActiveDrag = false;
    var currentPlace;
    var currentPlaceStore;
    var currentPlaceOptions;
    var nextMarker;
    var nextMarkerStore;
    var nextMarkerOptions;
    var isNeed = true;

    var executedScreenPlay = [];

    if (Store.state.activePlace !== '' && Store.levelObjList.places[Store.state.activePlace]) {
        currentPlace = Store.levelObjList.places[Store.state.activePlace];
        currentPlace.scale.setTo(1, 1);
        currentPlaceStore = Store.state.placeState[Store.state.activePlace];
        currentPlaceOptions = Levels[GameState.currentLevel].places[Store.state.activePlace].options;
        isNeed = !this.game.physics.arcade.overlap(
            currentSprite,
            currentPlace,
            function() {
                if (Store.state.activeMarker == currentPlaceOptions.needColor &&
                    currentPlaceStore.state == 'uncolorize'
                ) {
                    // currentSprite.input.draggable = false;
                    // currentSprite.position.copyFrom(currentPlace.position); 
                    // currentSprite.anchor.setTo(currentPlace.anchor.x, currentPlace.anchor.y);
                    currentPlaceStore.state = 'colorize';
                    currentPlace.tint = 0xff00ff;
                    currentPlace.loadTexture('place_' + Store.state.activePlace, 3);
                    Store.state.needForColorize--;

                    if (Store.state.needForColorize) {
                        Store.levelObjList.statisticText.text = "Need colorize: " + Store.state.needForColorize;
                    } else {
                        Store.levelObjList.statisticText.text = 'Great!';
                    }

                    if (currentPlaceOptions.openPlace &&
                        !Store.state.placeState[currentPlaceOptions.openPlace].isShow
                    ) {
                        Store.levelObjList.places[currentPlaceOptions.openPlace].alpha = 1;
                        Store.state.placeState[currentPlaceOptions.openPlace].isShow = true;

                        var nextPlaceOptions = Levels[GameState.currentLevel].places[currentPlaceOptions.openPlace].options;
                        if (!nextPlaceOptions.needColor && 
                            nextPlaceOptions.getColor
                        ) {
                            if (!Store.state.markerState[nextPlaceOptions.getColor].isShow) {
                                Store.levelObjList.markers[nextPlaceOptions.getColor].alpha = 1;
                                Store.levelObjList.markers[nextPlaceOptions.getColor].input.enableDrag();
                                Store.state.markerState[nextPlaceOptions.getColor].isShow = true;
                            }
                        }
                    }

                    executedScreenPlay = checkScreenplay();
                    if (executedScreenPlay.length) {
                        execScreenPlay.call(_this, executedScreenPlay);
                    }
                    // console.log(executedScreenPlay);
                }
            }
        );
        Store.levelObjList.places[Store.state.activePlace].loadTexture('place_' + Store.state.activePlace, 0);
    }

    if (Store.state.activeNextMarker !== '' && Store.levelObjList.markers[Store.state.activeNextMarker]) {
        nextMarker = Store.levelObjList.markers[Store.state.activeNextMarker];
        nextMarkerStore = Store.state.markerState[Store.state.activeNextMarker];
        isNeed = !this.game.physics.arcade.overlap(
            currentSprite,
            nextMarker,
            function() {
                if (nextMarkerStore.isShow) {
                    var rules = colorRules[Store.state.activeNextMarker].mix;
                    if (rules) {
                        var createMarker = rules[Store.state.activeMarker];
                        if (rules &&
                            createMarker &&
                            !Store.state.markerState[createMarker].isShow
                        ) {
                            Store.levelObjList.markers[createMarker].alpha = 1;
                            Store.levelObjList.markers[createMarker].input.enableDrag();
                            Store.state.markerState[createMarker].isShow = true;
                        }
                    }
                }
            }
        );
    }

    currentSprite.alpha = 1;

    currentSprite.position.copyFrom(currentSprite.originalPosition);

    Store.state.activeMarker = '';
    Store.state.activePlace = '';
    Store.state.activeNextMarker = '';
};

function checkScreenplay () {
    var newScreenplays = {};
    var res = [];
    _.forEach(
        Store.state.screenplays,
        function (screenplayData, screenplayName) {
            var isExecute = true;
            _.forEach(
                screenplayData.placesColorized,
                function (place) {
                    if (Store.state.placeState[place].state !== 'colorize') {
                        isExecute = false;
                    }
                }
            )
            if (isExecute) {
                res.push(screenplayName);
            } else {
                newScreenplays[screenplayName] = screenplayData;
            }
        }
    );

    Store.state.screenplays = newScreenplays;

    return res;
};

function execScreenPlay (screenplayArray) {
    var _this = this;
    var screenplays = Levels[GameState.currentLevel].screenplay;
    _.forEach(
        screenplayArray,
        function (screenPlayName) {
            if (screenplays[screenPlayName].result.getColor) {
                getMarkerActive.call(_this, screenplays[screenPlayName].result.getColor);
            }
        }
    );
}

function getMarkerActive (markerName) {
    var marker = Store.levelObjList.markers[markerName];
    var markerState = Store.state.markerState[markerName].isShow;
    if (!Store.state.markerState[markerName].isShow) {
        marker.alpha = 1;
        marker.input.enableDrag();
        // this.game.add.tween(marker).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
        Store.state.markerState[markerName].isShow = true;
    }
}
