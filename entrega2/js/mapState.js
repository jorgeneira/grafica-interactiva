/**
 * Este estado corresponde al mapa de las civilizaciones del
 * Age of Mythology
 */
let mapState = {

    /**
     * En cada uno de los estados incluí un objeto Config que almacena
     * variables especificas de cada estado.
     */
    config: {

        /**
         * Estilos del nombre de las civilizaciones y del boton volver.
         */
        labelStyle: {
            font: "bold 15px Arial",
            fill: "#FFFFFF"
        },

        /**
         * Estilo del nombre de los dioses mayores.
         */
        godNameStyle: {
            font: "bold 17px Arial",
            fill: "#BFA414"
        },

        /**
         * Estilo del nombre de las edades.
         */
        subTitleStyle: {
            font: "17px Arial",
            fill: "#FFFFFF"
        },

        /**
         * Estilo de la descripción de cada uno de los elemetos.
         */
        descriptionStyle: {
            font        : "15px Arial",
            fill        : "#FFFFFF",
            boundsAlignH: "left",
            boundsAlignV: "top",
            align       : "left"
        },

        /**
         * Coordenada X del panel de infromación de la derecha.
         */
        areaInfoX: 687,

        /**
         * Coordenada Y del panel de infromación de la derecha.
         */
        areaInfoY: 88,

        /**
         * Ancho de cada uno de los bloques de las edades.
         */
        ageWidth: 390,

        /**
         * Alto de cada uno de los bloques de las edades.
         */
        ageHeight: 150,

        /**
         * Espacio entre cada uno de los bloques de las edades.
         */
        ageSpacer: 15,

        /**
         * Espacio horizontal entre los elementos del arbol de las edades.
         */
        ageElementSpacerX: 20,

        /**
         * Espacio Vertical entre los elementos del arbol de las edades.
         */
        ageElementSpacerY: 10,

        /**
         * Lista de las edades del mapa.
         */
        ages: ['Edad Arcaica', 'Edad Clásica', 'Edad Heróica']

    },

    /**
     * En esta propiedad se almacerá un Group de phaser que
     * contiene todos los elementos del arbol de cada dios.
     */
    activeGodInfo: false,

    /**
     * En esta propiedad se almacerá un Group de phaser que
     * contiene todos los elementos relacionados con el bloque
     * de Descripción.
     */
    activeDescription: false,

    /**
     * Aqui voy a cargar el JSON con toda la información de
     * las civilizaciones.
     */
    data: {},

    /**
     * Metodo Preload de Phaser, se cargan los recursos
     * externos que se van a usar en el estado.
     */
    preload() {

        // Fondo de la escena.
        game.load.image('bgMain', 'images/mainBg.jpg');

        // Fondo del contenido.
        game.load.image('bgContent', 'images/contentBg.png');

        // El botón volver.
        game.load.spritesheet('backBtn', 'images/back.jpg', 57, 32);

        // Un spritesheet con todos los dioses mayores.
        game.load.spritesheet('gods', 'images/gods.png', 128, 128);

        // Un spritesheet con todos los dioses menores.
        game.load.spritesheet('minorGods', 'images/minorGods.png', 64, 64);

        // Un spritesheet con todas las unidades míticas..
        game.load.spritesheet('mythUnits', 'images/mythUnits.png', 32, 32);

        // Un spritesheet con todos los poderes.
        game.load.spritesheet('powers', 'images/powers.png', 64, 64);

        // Un JSON con la info de las civilaciones.
        game.load.json('data', 'json/data.json');
    },

    /**
     * Metodo create de Phaser, se costruye el escenario.
     *
     * Mi idea es mantener los metodos de phaser lo más limpios
     * posible, así es más facil percibir la estructura de la
     * aplicación y navegar a través de los metodos.
     *
     * Para ello dividí el proceso en métodos encadenados, que
     * devuelven this de manera que se pueden encadenar con la
     * notación de punto para no tener que repetir la palabra this en cada llamada.
     */
    create() {

        // Añadó el fondo de la escena.
        this.addMainBackground()

            // Añado el fondo del contenido
            .addContentBackground()

            // Añado el boton de volver.
            .addBackBtn()

            // Cargo el JSON en la propiedad data de  mas arriba.
            .setData()

            // Añado los dioses mayores al escenario.
            .addGods();

    },

    addMainBackground() {

        // Añadó el fondo de la escena.
        game.add.image(0, 0, 'bgMain');

        return this;
    },

    addContentBackground(){

        // Añado el fondo del contenido
        game.add.image(5, 20, 'bgContent').scale.setTo(1.11, 1.14);

        return this;
    },

    addBackBtn(){

        // Añado el boton de volver.
        game.add.button(93, 652, 'backBtn', () => game.state.start('homeState'), this, 2, 1, 2, 1);

        // Añado el label del botonvolver.
        game.add.text(160, 660, 'Regresar', this.config.labelStyle);

        return this;

    },

    setData(){

        // Cargo el JSON en la propiedad data de  mas arriba.
        this.data = game.cache.getJSON('data');

        return this;

    },

    addGods() {

        /**
         * Utilizó el methodo forEach del array con las nombres de las
         * civilizaciones de los dioses para ir cargando los de cada
         * una.
         */
        Object.keys(this.data.gods).forEach(this.addCivGods, this);

    },

    /**
     * Este método se encarga de crear cada grupo de Dioses de
     * cada civilización.
     *
     * @param civName
     * @param civIndex
     */
    addCivGods(civName, civIndex){

        let civX = 100;

        let civY = 120 + (150 * civIndex);

        // Agrego el nombre de la civilación al escenario.
        game.add.text(civX, civY, civName, this.config.labelStyle);

        // Agrego cada dios al escenario.
        this.data.gods[civName]
            .forEach((g, gI) => this.addSingleCivGod(g, gI, civX, civY), this);

    },

    /**
     * Este método procesa cada uno de los dioses mayores.
     *
     * @param god
     * @param godIndex
     * @param civX
     * @param civY
     */
    addSingleCivGod(god, godIndex, civX, civY){

        /**
         * Calculo la pocisión de cada dios.
         */
        let godX = civX + 110 + (140 * godIndex);

        let godY = civY - 50;

        /**
         * Añado el boton del dios mayor correspondiente.
         */
        let godBtn = game.add.button(godX, godY, 'gods', () => {

            /**
             * Al hacer click o tocar se carga la información de cada dios.
             */
            return this.showGodData(god);

        }, this, god.frame, god.frame);

        /**
         * Al poner el cursor sobre cada boton de dios mayor se muestra el nombre
         * en el area de descripción de abajo a la derecha.
         */
        godBtn.events.onInputOver.add(() => {

            return this.showDescription(god.name + '\n\nClick para más Info!');

        }, this);

        /**
         * Al Quitar el cursor del dios se desaparece el area de descripción.
         */
        godBtn.events.onInputOut.add(this.hideDescription, this);

        /**
         * Le pongo el nombre a cada dios.
         */
        game.add.text(godX + 64, godY + 128, god.name, this.config.godNameStyle)
            .anchor
            .setTo(0.5, 0);
    },

    /**
     * Esta función se encarga de contruir la información de cada una
     * de las edades de cada Dios mayor.
     *
     * @param god
     * @param ageName
     * @param ageIndex
     */
    buildAge(god, ageName, ageIndex){

        /**
         * Calculo la coordenada Y del panel de la edad recibida.
         */
        let ageBaseY = this.config.areaInfoY + (this.config.ageHeight + this.config.ageSpacer) * ageIndex;

        /**
         * Creo cada el fondo del bloque de la edad. Es solo un rectangulo de color plano.
         */
        let bg1 = game.add.graphics(this.config.areaInfoX, ageBaseY)
            .beginFill(0x365A5A)
            .drawRect(0, 0, this.config.ageWidth, this.config.ageHeight)
            .endFill();

        /**
         * Calculo la pocisión del encabezado de cada edad.
         */
        let ageHeadingX = this.config.areaInfoX + (this.config.ageWidth / 2);

        let ageHeadingY = ageIndex ? ageBaseY + 10 : ageBaseY + 32;

        /**
         * Añado el encabezado de la edad.
         */
        let ageHeading = game.add.text(ageHeadingX, ageHeadingY, ageName, this.config.subTitleStyle);
        ageHeading.anchor.setTo(0.5, 0);

        /**
         * Añado los elmentos al grupo para poder eliminarlos todos al tiempo.
         */
        this.activeGodInfo.add(bg1);

        this.activeGodInfo.add(ageHeading);

        /**
         * El comportamiento de la funcion es ligeramente diferente si se trata de la primera edad
         * ya que esta no tiene dioses menores ni unidades miticas, en cambio si tiene poderes
         * otorgados por el Dios mayor.
         */
        if (ageIndex === 0) {

            /**
             * Muestro el nombre del dios mayor en la primera sección.
             */
            let godName = game.add.text(ageHeadingX, ageBaseY + 5, god.name.toUpperCase(), this.config.godNameStyle);
            godName.anchor.setTo(0.5, 0);

            /**
             * Muestro los poderes otorgados.
             */
            god.powers.forEach((p, pI) => this.addAgeElement(ageBaseY, 'powers', p, pI, 64, god.powers), this);

            /**
             * Añado los elmentos al grupo para poder eliminarlos todos al tiempo.
             */
            this.activeGodInfo.add(godName);

        } else {

            /**
             * Añado los dioses menores al escenario.
             */
            god.ages[ageIndex - 1].minorGods.forEach((mg, mgI) => {

                return this.addAgeElement(ageBaseY, 'minorGods', mg, mgI, 64, god.ages[ageIndex - 1].minorGods);

            }, this);

            /**
             * Añado las unidades miticas.
             */
            let mythUnits = god.ages[ageIndex - 1].mythUnits[0].concat(god.ages[ageIndex - 1].mythUnits[1]);

            mythUnits.forEach((mg, mgI) => {

                return this.addAgeElement(ageBaseY, 'mythUnits', mg, mgI, 32, mythUnits);

            }, this);

        }

    },

    /**
     * Carga el panel de infromación.
     *
     * @param god
     */
    showGodData(god){

        if (this.activeGodInfo) this.activeGodInfo.removeAll();

        this.activeGodInfo = game.add.group();

        this.config.ages.forEach((ageName, ageIndex) => this.buildAge(god, ageName, ageIndex));

    },

    /**
     * Esta funcion añade cada uno de los sprites que componen el arbol
     * de cada Dios
     *
     * @param ageY
     * @param type
     * @param name
     * @param index
     * @param size
     * @param elementSet
     */
    addAgeElement(ageY, type, name, index, size, elementSet){

        /**
         * Calculo el tamaño y posicion del elemento
         */
        let elementsWidth = (elementSet.length * size) + (elementSet.length - 1) * this.config.ageElementSpacerX;

        let elementsStartX = (this.config.areaInfoX + this.config.ageWidth / 2) - (elementsWidth / 2);

        let elementX = elementsStartX + (size + this.config.ageElementSpacerX) * index;

        let spacerY = type === 'mythUnits' ? 64 + this.config.ageElementSpacerY : 0;

        let elementY = type === 'powers' ? ageY + 72 : ageY + 35;

        let element = game.add.sprite(elementX, elementY + spacerY, type);

        /**
         * Asigno el frame correspondiente en el spritesheet.
         */
        element.frame = this.data[type][name].frame;

        /**
         * Habilito las interacciones para hacer que aparezca la
         * descripcion cuando se le ponga el cursos.
         */
        element.inputEnabled = true;

        /**
         * Hago que aparezca la manita en lugar de la flecha.
         */
        element.input.useHandCursor = true;

        /**
         * Añado la acción al evento onInputOver que hará que salga la descripción de los elementos.
         */
        element.events.onInputOver.add(() => this.showDescription(this.data[type][name].info), this);

        element.events.onInputOut.add(this.hideDescription, this);

        this.activeGodInfo.add(element);
    },

    /**
     * Muestro la descripción recibida como parametro en el area de descripción
     *
     * @param text
     */
    showDescription(text){

        if (this.activeDescription) this.activeDescription.removeAll();

        this.activeDescription = game.add.group();

        let bg1 = game.add.graphics(687, 595).lineStyle(5, 0xBFA414, 1)
            .beginFill(0x365A5A)
            .drawRect(0, 0, 390, 90)
            .endFill();

        let description = game.add.text(695, 605, text, this.config.descriptionStyle);

        description.wordWrap = true;

        description.wordWrapWidth = 380;

        this.activeDescription.add(bg1);

        this.activeDescription.add(description);
    },

    /**
     * Elimino los elementos del grupo con la descripción.
     */
    hideDescription(){

        this.activeDescription.removeAll();

    }

};