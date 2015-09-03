module.exports = {

    '1. Simple': {
        // markers: {
        //     'orange': {
        //         // coord: [300, 300]
        //     },
        //     'green': {
        //         // coord: [325, 300]
        //     }
        // },
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
