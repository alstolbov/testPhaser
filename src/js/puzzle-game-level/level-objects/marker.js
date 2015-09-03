var Store = require('../store');
var GameState = require('../../game-store');
var Levels = require('../../levels');

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
    var isNeed = true;

    if (Store.levelObjList.places[Store.state.activePlace]) {
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

                    if (currentPlaceOptions.openPlace) {
                        Store.levelObjList.places[currentPlaceOptions.openPlace].alpha = 1;
                        Store.state.placeState[currentPlaceOptions.openPlace].isShow = true;

                        var nextPlaceOptions = Levels[GameState.currentLevel].places[currentPlaceOptions.openPlace].options;
                        if (nextPlaceOptions.getColor) {
                            if (!Store.state.markerState[nextPlaceOptions.getColor].isShow) {
                                Store.levelObjList.markers[nextPlaceOptions.getColor].alpha = 1;
                                Store.levelObjList.markers[nextPlaceOptions.getColor].input.enableDrag();
                                Store.state.markerState[nextPlaceOptions.getColor].isShow = true;
                            }
                        }
                    }
                }
            }
        );
        Store.levelObjList.places[Store.state.activePlace].loadTexture('place_' + Store.state.activePlace, 0);
    }

    currentSprite.alpha = 1;
    

    currentSprite.position.copyFrom(currentSprite.originalPosition);

    Store.state.activeMarker = '';
    Store.state.activePlace = '';
};
