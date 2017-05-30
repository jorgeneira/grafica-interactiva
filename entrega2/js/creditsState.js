let creditsState = {

    config: {

        labelStyle: {

            font: "bold 15px Arial",

            fill: "#FFFFFF"

        },

        copyStyle: {

            font: "12px Arial",

            fill: "#000000"

        },

        subTitleStyle: {
            font: "bold 19px Arial",

            fill: "#FFFFFF"
        },

        descriptionStyle: {

            font: "bold 18px Arial",

            fill: "#000",

            boundsAlignH: "left",

            boundsAlignV: "top",

            align: "left"
        }

    },

    preload() {

        game.load.image('bgHome', 'images/homeBg.jpg');

        game.load.spritesheet('backBtn', 'images/back.jpg', 57, 32);
    },

    create() {

        game.add.image(0, 0, 'bgHome');

        this.addBackBtn();

        this.buildCredits();
    },

    buildCredits(){

        game.add.text(600, 350, 'Creado Por:', this.config.descriptionStyle)
            .anchor.setTo(0.5);

        game.add.text(600, 400, 'Jorge Neira Angulo', this.config.subTitleStyle)
            .anchor.setTo(0.5);

        game.add.text(600, 450, 'Gráfica Interactiva', this.config.labelStyle)
            .anchor.setTo(0.5);

        game.add.text(600, 470, '2017 - I', this.config.labelStyle)
            .anchor.setTo(0.5);

        game.add.text(600, 570, '*Age of Mythology es Propiedad de \nMicrosoft', this.config.copyStyle)
            .anchor.setTo(0.5);

    },

    addBackBtn(){

        game.add.button(93, 652, 'backBtn', () => game.state.start('homeState'), this, 2, 1, 2, 1);

        game.add.text(160, 660, 'Regresar', this.config.labelStyle);

        return this;

    },


};