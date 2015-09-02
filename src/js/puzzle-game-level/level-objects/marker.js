var Store = require('../store');

module.exports = function (data) {
    var markerSprite = 'marker_' + data.name;
    var markerObj = this.add.sprite(data.coord[0], data.coord[1], markerSprite);
    markerObj.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enable(markerObj);

    markerObj.inputEnabled = true;
    markerObj.input.enableDrag();
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
};

function onDragStart (sprite, pointer) {
    sprite.alpha = 0.5;
    Store.state.isActiveDrag = true;
};

function onDragStop (currentSprite){
    Store.state.isActiveDrag = false;
    var endSprite;
    var isNeed = true;
    var currentPlaceStore;

    if (Store.levelObjList.places[Store.state.activePlace]) {
        endSprite = Store.levelObjList.places[Store.state.activePlace];
        endSprite.scale.setTo(1, 1);
        currentPlaceStore = Store.state.placeState[Store.state.activePlace];
        isNeed = !this.game.physics.arcade.overlap(
            currentSprite,
            endSprite,
            function() {
                if (Store.state.activeMarker == currentPlaceStore.color &&
                    currentPlaceStore.state == 'uncolorize'
                ) {
                    // currentSprite.input.draggable = false;
                    // currentSprite.position.copyFrom(endSprite.position); 
                    // currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y);
                    Store.state.placeState[Store.state.activePlace].state = 'colorize';
                }
                currentSprite.position.copyFrom(currentSprite.originalPosition);
            }
        );
    }

    currentSprite.alpha = 1;
    
    if (isNeed) {
        currentSprite.position.copyFrom(currentSprite.originalPosition);
    }

    Store.state.activeMarker = '';
    Store.state.activePlace = '';
};
