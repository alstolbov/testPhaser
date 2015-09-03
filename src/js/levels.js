module.exports = {

    '1. Simple': {
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
                onStart: true,
                options: {
                    needColor: 'green',
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
            needForColorize: 3
        },
        screenplay: {
            'giveBlue': {
                placesColorized: ['sun', 'grow'],
                // placeFalse: [],
                amimation: 'some',
                result: {
                    getColor: 'blue'
                } 
                
            }
        }
    },

    '2. Standart': {
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
