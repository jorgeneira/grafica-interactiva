let mapState = {

    config: {

        labelStyle: {

            font: "bold 15px Arial",

            fill: "#FFFFFF",

            boundsAlignH: "center",

            boundsAlignV: "middle"
        }

    },

    preload() {

        game.load.image('bgMain', 'images/mainBg.jpg');

        game.load.image('bgContent', 'images/contentBg.png');

        game.load.spritesheet('backBtn', 'images/back.jpg', 57, 32);

        game.load.json('data', 'json/data.json');
    },

    create() {

        this.addMainBackground()

            .addContentBackground()

            .addBackBtn();

        let phaserJSON = game.cache.getJSON('data');

        console.log(phaserJSON);

    },

    addMainBackground() {

        game.add.image(0, 0, 'bgMain');

        return this;
    },

    addContentBackground(){

        game.add.image(5, 20, 'bgContent').scale.setTo(1.11, 1.14);

        return this;
    },

    addBackBtn(){

        game.add.button(93, 652, 'backBtn', () => game.state.start('homeState'), this, 2, 1, 2, 1);

        game.add.text(160, 660, 'Regresar', this.config.labelStyle);

        return this;

    }

};