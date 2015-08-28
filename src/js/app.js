// // var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

// // function preload () {

// //   game.load.image('logo', 'phaser.png');

// // }

// // function create () {
// //   game.stage.backgroundColor = 0xffffff;
// //   // var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
// //   // logo.anchor.setTo(0.5, 0.5);

// // }

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

var marker;
var trash;

var main_state = {

    preload: function() {
        // this.scale.pageAlignHorizontally = true;
        this.game.load.image('marker', 'img/blue-marker.png');
        this.game.load.image('trash', 'img/trash.png');
        this.game.load.spritesheet('trashSprite', 'img/trash.png', 10, 10, 2);
        
    },

    create: function() {
        this.isActiveDrag = false;
        this.stage.backgroundColor = 0xffffff;

        game.physics.startSystem(Phaser.Physics.ARCADE);

        trash = this.add.sprite(game.world.centerX + 100, game.world.centerY, 'trashSprite');
        trash.anchor.setTo(0.5, 0.5);
        trash.tint= 0xff00ff;
        this.game.physics.arcade.enable(trash);

        // trash.inputEnabled = true;
        // trash.events.onInputOver.add(this.onMouseOver, this);
        // trash.events.onInputOut.add(this.onMouseOut, this);

        marker = this.add.sprite(game.world.centerX, game.world.centerY, 'marker');
        marker.anchor.setTo(0.5, 0.5);
        this.game.physics.arcade.enable(marker);

        marker.inputEnabled = true;
        marker.input.enableDrag();
        marker.originalPosition = marker.position.clone();
        marker.events.onDragStart.add(this.onDragStart, this);
        marker.events.onDragStop.add(
            function(currentSprite){
                this.onDragStop(currentSprite, trash);
            },
            this
        );

    },

    update: function() {
        if (this.isActiveDrag) {
            var res = this.compareObj(marker, trash);
            if (!res) {
                trash.scale.setTo(2, 2);
            } else {
                trash.scale.setTo(1, 1);
            }
        }
    },

    compareObj: function (currentSprite, endSprite) {
        var _this = this;
        var isNeed = !this.game.physics.arcade.overlap(
            currentSprite,
            endSprite,
            function() {

            }
        );

        return isNeed;
    },

    // onMouseOver: function (sprite) {
    //     sprite.alpha = 0.5;
    // },

    // onMouseOut: function (sprite) {
    //     sprite.alpha = 1;
    // },

    onDragStart: function (sprite, pointer) {
        sprite.alpha = 0.5;
        this.isActiveDrag = true;
        trash.loadTexture('trashSprite', 1);
    },

    onDragStop: function(currentSprite, endSprite){
        this.isActiveDrag = false;
        endSprite.scale.setTo(1, 1);
        currentSprite.alpha = 1;
        var isNeed = !this.game.physics.arcade.overlap(
            currentSprite,
            endSprite,
            function() {
                currentSprite.input.draggable = false;
                currentSprite.position.copyFrom(endSprite.position); 
                currentSprite.anchor.setTo(endSprite.anchor.x, endSprite.anchor.y); 
            }
        );
        if (isNeed) {
            currentSprite.position.copyFrom(currentSprite.originalPosition);
        }
    }
   
};


game.state.add('main', main_state);  
game.state.start('main');  
