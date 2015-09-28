module.exports = {

    preload: function () {
        this.game.load.image('marker_blue', 'img/blue-marker.png');

        // var preloadSprite = this.add.sprite(400, 300, 'marker_blue');
        // preloadSprite.anchor.setTo(0.5);
        // this.load.setPreloadSprite(preloadSprite);
        
        this.stage.backgroundColor = 0xffffff;
        this.game.load.image('marker_orange', 'img/orange-leaflet-marker-icon.png');
        this.game.load.image('marker_green', 'img/green-leaflet-marker-icon.png');
        this.game.load.image('marker_black', 'img/sashas-gray-leaflet-marker-icon.png');
        // this.game.load.image('place_red', 'img/trash.png');
        // this.game.load.image('place_green', 'img/1418916390_settings-24.png');
        this.game.load.spritesheet('place_grow', 'img/trash.png', 10, 10, 2);
        this.game.load.spritesheet('place_sun', 'img/1418916390_settings-24.png', 10, 10, 2);
        this.game.load.spritesheet('place_earth', 'img/1419427888_world-24.png', 10, 10, 2);
        this.game.load.bitmapFont('font-desyrel', 'font/desyrel.png', 'font/desyrel.xml');
        this.game.load.bitmapFont('test-font', 'font/font.png', 'font/font.fnt');

        this.game.load.image('simplePopup', 'img/simplePopup.png');
        this.game.load.image('checkmark', 'img/1422279008_checkmark-24-24.png');
    },

    create: function () {
        this.game.state.start('start-menu');
    }

};
