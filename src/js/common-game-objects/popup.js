module.exports = {

    create: function (_this) {
        this._this = _this;
        this.text = '';
        this.tween;
        this.popup = _this.game.add.sprite(_this.game.world.centerX, _this.game.world.centerY, 'simplePopup');
        this.textStyle = { font: "12px Arial", fill: "#000000", wordWrap: true, wordWrapWidth: this.popup.width, align: "center" };
        this.popup.anchor.set(0.5);
        this.popup.inputEnabled = true;
        var pw = (this.popup.width / 2) - 35;
        var ph = (this.popup.height / 2) - 10;
        var closeButton = _this.game.make.sprite(pw, -ph, 'checkmark');
        closeButton.inputEnabled = true;
        closeButton.input.priorityID = 1;
        closeButton.events.onInputDown.add(this.closeWindow, this);
        this.popup.addChild(closeButton);
        this.popup.scale.set(0);
        // this.game.input.onDown.add(openWindow, this);
    },

    setText: function (newText) {
        this.text = newText;
    },

    openWindow: function () {
        if ((this.tween && this.tween.isRunning) || this.popup.scale.x === 1) {
            return;
        }      
        this.tween = this._this.game.add.tween(this.popup.scale).to( { x: 1, y: 1 }, 1000, Phaser.Easing.Elastic.Out, true);
        this.text = this._this.game.add.text(0, 0, this.text, this.textStyle);
        this.text.x = Math.floor(this.popup.x + this.popup.width / 2);
        this.text.y = Math.floor(this.popup.y + this.popup.height / 2);
    },

    closeWindow: function () {
        if (this.tween.isRunning || this.popup.scale.x === 0) {
            return;
        }
        this.tween = this._this.game.add.tween(this.popup.scale).to( { x: 0, y: 0 }, 500, Phaser.Easing.Elastic.In, true);
        this.text.destroy();
    }

};
