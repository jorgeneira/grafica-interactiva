let mapState = {

    config: {

        labelStyle: {
            font: "bold 15px Arial",
            fill: "#FFFFFF"
        },

        godNameStyle: {
            font: "bold 17px Arial",
            fill: "#BFA414"
        },

        subTitleStyle: {
            font: "17px Arial",
            fill: "#FFFFFF"
        },

        descriptionStyle: {
            font        : "15px Arial",
            fill        : "#FFFFFF",
            boundsAlignH: "left",
            boundsAlignV: "top",
            align       : "left"
        },

        areaInfoX: 687,

        areaInfoY: 88,

        ageWidth: 390,

        ageHeight: 150,

        ageSpacer: 15,

        ageElementSpacerX: 20,

        ageElementSpacerY: 10,

        ages: ['Edad Arcaica', 'Edad Clásica', 'Edad Heróica']

    },

    activeGodInfo: false,

    activeDescription: false,

    data: {},

    preload() {

        game.load.image('bgMain', 'images/mainBg.jpg');

        game.load.image('bgContent', 'images/contentBg.png');

        game.load.spritesheet('backBtn', 'images/back.jpg', 57, 32);

        game.load.spritesheet('gods', 'images/gods.png', 128, 128);

        game.load.spritesheet('minorGods', 'images/minorGods.png', 64, 64);

        game.load.spritesheet('mythUnits', 'images/mythUnits.png', 32, 32);

        game.load.spritesheet('powers', 'images/powers.png', 64, 64);

        game.load.json('data', 'json/data.json');
    },


    create() {

        this.addMainBackground()

            .addContentBackground()

            .addBackBtn()

            .setData()

            .addGods();

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

    },

    setData(){

        this.data = game.cache.getJSON('data');

        return this;

    },

    addGods() {

        Object.keys(this.data.gods).forEach(this.addCivGods, this);

    },

    addCivGods(civName, civIndex){

        let civX = 100;

        let civY = 120 + (150 * civIndex);

        game.add.text(civX, civY, civName, this.config.labelStyle);

        this.data.gods[civName]
            .forEach((g, gI) => this.addSingleCivGod(g, gI, civX, civY), this);

    },

    addSingleCivGod(god, godIndex, civX, civY){

        let godX = civX + 110 + (140 * godIndex);

        let godY = civY - 50;

        let godBtn = game.add.button(godX, godY, 'gods', () => {

            return this.showGodData(god);

        }, this, god.frame, god.frame);

        godBtn.events.onInputOver.add(() => {

            return this.showDescription(god.name + '\n\nClick para más Info!');

        }, this);

        godBtn.events.onInputOut.add(this.hideDescription, this);

        game.add.text(godX + 64, godY + 128, god.name, this.config.godNameStyle)
            .anchor
            .setTo(0.5, 0);
    },

    buildAge(god, ageName, ageIndex){

        let ageBaseY = this.config.areaInfoY + (this.config.ageHeight + this.config.ageSpacer) * ageIndex;

        let bg1 = game.add.graphics(this.config.areaInfoX, ageBaseY)
            .beginFill(0x365A5A)
            .drawRect(0, 0, this.config.ageWidth, this.config.ageHeight)
            .endFill();

        let ageHeadingX = this.config.areaInfoX + (this.config.ageWidth / 2);

        let ageHeadingY = ageIndex ? ageBaseY + 10 : ageBaseY + 32;

        let ageHeading = game.add.text(ageHeadingX, ageHeadingY, ageName, this.config.subTitleStyle);
        ageHeading.anchor.setTo(0.5, 0);

        this.activeGodInfo.add(bg1);

        this.activeGodInfo.add(ageHeading);

        if (ageIndex === 0) {

            let godName = game.add.text(ageHeadingX, ageBaseY + 5, god.name.toUpperCase(), this.config.godNameStyle);
            godName.anchor.setTo(0.5, 0);

            god.powers.forEach((p, pI) => this.addAgeElement(ageBaseY, 'powers', p, pI, 64, god.powers), this);

            this.activeGodInfo.add(godName);

        } else {

            god.ages[ageIndex - 1].minorGods.forEach((mg, mgI) => {

                return this.addAgeElement(ageBaseY, 'minorGods', mg, mgI, 64, god.ages[ageIndex - 1].minorGods);

            }, this);

            let mythUnits = god.ages[ageIndex - 1].mythUnits[0].concat(god.ages[ageIndex - 1].mythUnits[1]);

            mythUnits.forEach((mg, mgI) => {

                return this.addAgeElement(ageBaseY, 'mythUnits', mg, mgI, 32, mythUnits);

            }, this);

        }

    },

    showGodData(god){

        if (this.activeGodInfo) this.activeGodInfo.removeAll();

        this.activeGodInfo = game.add.group();

        this.config.ages.forEach((ageName, ageIndex) => this.buildAge(god, ageName, ageIndex));

    },

    addAgeElement(ageY, type, name, index, size, elementSet){

        let elementsWidth = (elementSet.length * size) + (elementSet.length - 1) * this.config.ageElementSpacerX;

        let elementsStartX = (this.config.areaInfoX + this.config.ageWidth / 2) - (elementsWidth / 2);

        let elementX = elementsStartX + (size + this.config.ageElementSpacerX) * index;

        let spacerY = type === 'mythUnits' ? 64 + this.config.ageElementSpacerY : 0;

        let elementY = type === 'powers' ? ageY + 72 : ageY + 35;

        let element = game.add.sprite(elementX, elementY + spacerY, type);

        element.frame = this.data[type][name].frame;

        element.inputEnabled = true;

        element.input.useHandCursor = true;

        element.events.onInputOver.add(() => this.showDescription(this.data[type][name].info), this);

        element.events.onInputOut.add(this.hideDescription, this);

        this.activeGodInfo.add(element);
    },

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

    hideDescription(){

        this.activeDescription.removeAll();

    }

};