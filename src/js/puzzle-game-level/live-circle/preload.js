module.exports = function() {
    // this.scale.pageAlignHorizontally = true;
    this.game.load.image('marker_orange', 'img/orange-leaflet-marker-icon.png');
    this.game.load.image('marker_green', 'img/green-leaflet-marker-icon.png');
    this.game.load.image('marker_blue', 'img/blue-marker.png');
    this.game.load.image('marker_black', 'img/sashas-gray-leaflet-marker-icon.png');
    // this.game.load.image('place_red', 'img/trash.png');
    // this.game.load.image('place_green', 'img/1418916390_settings-24.png');
    this.game.load.spritesheet('place_grow', 'img/trash.png', 10, 10, 2);
    this.game.load.spritesheet('place_sun', 'img/1418916390_settings-24.png', 10, 10, 2);
    this.game.load.spritesheet('place_earth', 'img/1419427888_world-24.png', 10, 10, 2);
}
