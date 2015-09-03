var _ = require('lodash');

var options = require('./options');
var Store = require('./store');

module.exports = {
    getMarkerPos: function () {
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

};