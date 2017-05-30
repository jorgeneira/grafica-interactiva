/**
 * Este estado corresponde al inicio de la aplicación.
 * Contiene un menu de navegación.
 */
let homeState = {

    menu: {

        /**
         * Defino los botones del menu en un objeto para poder
         * añadirlos al juego sin tener que repetir lineas de
         * código. El Key corresponde al estado que se carga
         * y el Value al texto del botón.
         *
         * mapState y creditsState es el nombre de los estado
         * que se iniciaran con los botones.
         *
         */
        mapState: 'Iniciar Mapa',

        creditsState: 'Créditos'
    },
    /**
     * En cada uno de los estados incluí un objeto Config que almacena
     * variables especificas de cada estado.
     */
    config: {

        /**
         * Estilos del texto de los botones
         */
        btnStyle: {

            // Defino la fuenta
            font: "bold 15px Arial",

            // Defino el Color
            fill: "#000000",

        }

    },

    /**
     * Metodo Preload de Phaser, se cargan los recursos
     * externos que se van a usar en el estado.
     */
    preload() {

        /**
         * Cargo la imagen de fondo.
         */
        game.load.image('bgHome', 'images/homeBg.jpg');

        /**
         * Cargo un spritesheet que contiene los 3 estados de los botones.
         */
        game.load.spritesheet('menuBtn', 'images/button2.jpg', 220, 32);
    },

    /**
     * Metodo create de Phaser, se costruye el escenario.
     */
    create() {

        /**
         * Añado el fondo al escenario.
         */
        game.add.image(0, 0, 'bgHome');

        /**
         * Añado el Menu de navegación al escenario.
         */
        this.buildMenu();
    },

    /**
     * Esta funcion me permite añadir botones de forma dinamica
     * Sin estar repitiendo llamadas al methodo game.add.button
     */
    buildMenu(){

        /**
         * El truco para que funcione es seguir la convención
         * que mencioné arriba, las keys del objeto son los nombres de los
         * estados y los valores los labels.
         */
        Object.keys(this.menu).forEach(this.addButton, this);
    },

    addButton(key, index){

        let btnX = 483;

        let btnY = 334 + (42 * index);

        /**
         * Con esta linea voy añadiento los botones a asociandoles su respectiva acción.
         *
         * Usé un arrow function para pasar una funcion anonima que en su interior
         * llama game.state.start con el estado respectivo.
         */
        game.add.button(btnX, btnY, 'menuBtn', () => game.state.start(key), this, 2, 1, 3, 1);

        game.add.text(btnX + 110, btnY + 5, this.menu[key], this.config.btnStyle)
            .anchor
            .setTo(0.5, 0);

    }


};