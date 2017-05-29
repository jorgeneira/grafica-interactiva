let homeState = {

    /**
     * Defino los botones del menu en un objeto para poder
     * añadirlos al juego sin tener que repetir lineas de
     * código. El Key corresponde al estado que se carga
     * y el Value al texto del botón.
     */
    menu: {

        mapState: 'Iniciar Mapa',

        infoState: 'Información del Juego',

        creditsState: 'Créditos'
    },

    config: {

        btnStyle: {

            font: "bold 15px Arial",

            fill: "#000000",

            boundsAlignH: "center",

            boundsAlignV: "middle"
        }

    },

    preload() {

        game.load.image('bgHome', 'images/homeBg.jpg');

        game.load.spritesheet('menuBtn', 'images/button2.jpg', 220, 32);
    },

    create() {

        game.add.image(0, 0, 'bgHome');

        this.buildMenu();
    },

    buildMenu(){

        Object.keys(this.menu).forEach(this.addButton, this);
    },

    addButton(key, index){

        let btnX = 483;

        let btnY = 334 + (42 * index);

        game.add.button(btnX, btnY, 'menuBtn', () => game.state.start(key), this, 2, 1, 3, 1);

        game.add.text(btnX + 110, btnY + 5, this.menu[key], this.config.btnStyle)
            .anchor
            .setTo(0.5, 0);

    }


};