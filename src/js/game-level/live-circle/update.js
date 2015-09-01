var _ = require('lodash');
var Store = require('../store');

module.exports = function() {
    var _this = this;
    var obj = Store.levelObjList.colors['green'];
    if (Store.state.isActiveDrag) {
        var res = _this.compareObj(obj, Store.levelObjList.trash);
        if (!res) {
            Store.levelObjList.trash.scale.setTo(2, 2);
            Store.levelObjList.trash.loadTexture('trashSprite', 1);
        } else {
            Store.levelObjList.trash.scale.setTo(1, 1);
            Store.levelObjList.trash.loadTexture('trashSprite', 0);
        }

        // _.forEach(
        //     Store.levelObjList.colors,
        //     function (obj, objName) {
        //         var res = _this.compareObj(obj, Store.levelObjList.trash);
        //         if (!res) {
        //             Store.levelObjList.trash.scale.setTo(2, 2);
        //             Store.levelObjList.trash.loadTexture('trashSprite', 1);
        //         } else {
        //             Store.levelObjList.trash.scale.setTo(1, 1);
        //             Store.levelObjList.trash.loadTexture('trashSprite', 0);
        //         }
        //     }
        // );
    }
}
