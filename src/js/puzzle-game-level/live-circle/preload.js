module.exports = function() {
    // this.scale.pageAlignHorizontally = true;
    this.game.load.image('marker_red', 'img/red-leaflet-marker-icon.png');
    this.game.load.image('marker_green', 'img/green-leaflet-marker-icon.png');
    // this.game.load.image('place_red', 'img/trash.png');
    // this.game.load.image('place_green', 'img/1418916390_settings-24.png');
    this.game.load.spritesheet('place_sun', 'img/trash.png', 10, 10, 2);
    this.game.load.spritesheet('place_grow', 'img/1418916390_settings-24.png', 10, 10, 2);
}
