var Store = require('./puzzle-game-level/store');

module.exports = {

    '1. Simple': {
        displayName: 'Все просто',
        markers: [
            'orange',
            'green'
        ],

        places: {
            'sun': {
                coord: [100, 200],
                spriteName: 'sun', 
                onStart: true,
                group: 'suns',
                interactive: true,
                options: {
                    popupText: 'Sun is shining!',
                    needColor: 'orange',
                    openPlace: 'grow'
                }
            },
            'nextSun': {
                coord: [100, 100],
                spriteName: 'sun', 
                onStart: true,
                group: 'suns',
                interactive: true,
                options: {
                    popupText: 'Sun is shining!',
                    needColor: 'orange',
                    openPlace: 'grow'
                }
            },
            'grow': {
                coord: [150, 200],
                onStart: true,
                interactive: true,
                options: {
                    needColor: 'green',
                    onColorizeAnimation: 'some_animation',
                    getColor: 'blue'
                }
            },
            'earth': {
                coord: [190, 200],
                onStart: true,
                interactive: true,
                options: {
                    needColor: 'blue'
                }
            },
            'someObject': {
                coord: [50, 50],
                spriteName: 'sun',
                interactive: false
            }
        },

        statistic: {
            needForColorize: 3
        },
        screenplay: {
            'giveBlue': {
                placesColorized: ['sun', 'grow'],
                // placeFalse: [],
                amimation: 'some',
                result: {
                    getColor: 'blue',
                    execute: function () {
                        var obj = Store.levelObjList.places.sun;
                        var tw = this.game.add.tween(obj);
                        tw.to( { x: 200, y: 100, alpha: 0 }, 1000, Phaser.Easing.Linear.NONE, true, 0, 20, true);
                        tw.start();
                    }
                } 
                
            }
        }
    },

    '2. Standart': {
        displayName: 'Посложнее...',
        markers: [
            'orange',
            'green'
        ],

        places: {
            'sun': {
                coord: [100, 200],
                onStart: true,
                options: {
                    needColor: 'orange',
                    openPlace: 'grow'
                }
            },
            'grow': {
                coord: [150, 200],
                onStart: false,
                options: {
                    needColor: false,
                    onColorizeAnimation: 'some_animation',
                    getColor: 'blue'
                }
            },
            'earth': {
                coord: [190, 200],
                onStart: true,
                options: {
                    needColor: 'blue'
                }
            },
        },
        statistic: {
            needForColorize: 2
        }
    }

};
