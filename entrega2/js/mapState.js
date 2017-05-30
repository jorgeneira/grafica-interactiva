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

            font: "15px Arial",

            fill: "#FFFFFF",

            boundsAlignH: "left",

            boundsAlignV: "top",

            align: "left"
        }

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

            .setData();


        this.addGods();

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

        let godBtn = game.add.button(godX, godY, 'gods', () => this.showGodData(god), this, god.frame, god.frame);

        godBtn.events.onInputOver.add(() => this.showDescription(god.name), this);

        godBtn.events.onInputOut.add(this.hideDescription, this);

        game.add.text(godX + 64, godY + 128, god.name, this.config.godNameStyle)
            .anchor
            .setTo(0.5, 0);
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

        console.log(this.data);

        return this;

    },

    buildArcaica(god){

        let bg1 = game.add.graphics(687, 88).beginFill(0x365A5A).drawRect(0, 0, 390, 150).endFill();

        let godName = game.add.text(882, 93, god.name.toUpperCase(), this.config.godNameStyle);
        godName.anchor.setTo(0.5, 0);

        let arcaica = game.add.text(882, 120, 'Edad Arcaica', this.config.subTitleStyle);
        arcaica.anchor.setTo(0.5, 0);

        this.activeGodInfo.add(bg1);

        this.activeGodInfo.add(godName);

        this.activeGodInfo.add(arcaica);

        god.powers.forEach((p, pI) => this.addPower(p, pI, god), this);

        return this;

    },

    buildClasica(god){

        let bg1 = game.add.graphics(687, 255).beginFill(0x365A5A).drawRect(0, 0, 390, 150).endFill();

        let ageName = game.add.text(882, 265, 'Edad Clásica', this.config.subTitleStyle);
        ageName.anchor.setTo(0.5, 0);

        this.activeGodInfo.add(bg1);

        this.activeGodInfo.add(ageName);

        god.ages[0].minorGods.forEach((mg, mgI) => this.addMinorGod(255, mg, mgI, god.ages[0].minorGods), this);

        let mythUnits = god.ages[0].mythUnits[0].concat(god.ages[0].mythUnits[1]);

        mythUnits.forEach((mg, mgI) => this.addMythUnit(255, mg, mgI, mythUnits), this);

        return this;

    },

    buildHeroica(god){

        let bg1 = game.add.graphics(687, 423).beginFill(0x365A5A).drawRect(0, 0, 390, 150).endFill();

        let ageName = game.add.text(882, 433, 'Edad Heróica', this.config.subTitleStyle);
        ageName.anchor.setTo(0.5, 0);

        this.activeGodInfo.add(bg1);

        this.activeGodInfo.add(ageName);

        god.ages[1].minorGods.forEach((mg, mgI) => this.addMinorGod(423, mg, mgI, god.ages[1].minorGods), this);

        let mythUnits = god.ages[1].mythUnits[0].concat(god.ages[1].mythUnits[1]);

        mythUnits.forEach((mg, mgI) => this.addMythUnit(423, mg, mgI, mythUnits), this);

        return this;

    },

    showGodData(god){

        if (this.activeGodInfo) this.activeGodInfo.removeAll();

        this.activeGodInfo = game.add.group();

        this.buildArcaica(god)

            .buildClasica(god)

            .buildHeroica(god);


    },

    addPower(powerName, powerIndex, god){

        let spacer = 10;

        let powersWidth = (god.powers.length * 64) + (god.powers.length - 1) * spacer;

        let powersStartX = 882 - (powersWidth / 2);

        let powerX = powersStartX + (64 + spacer) * powerIndex;

        let power = game.add.sprite(powerX, 160, 'powers');

        power.frame = this.data.powers[powerName].frame;

        power.inputEnabled = true;

        power.events.onInputOver.add(() => this.showDescription(this.data.powers[powerName].info), this);

        power.events.onInputOut.add(this.hideDescription, this);

        this.activeGodInfo.add(power);

    },

    addMinorGod(ageY, minorGodName, minorGodIndex, minorGods){

        let spacer = 20;

        let minorGodsWidth = (minorGods.length * 64) + (minorGods.length - 1) * spacer;

        let minorGodsStartX = 882 - (minorGodsWidth / 2);

        let minorGodX = minorGodsStartX + (64 + spacer) * minorGodIndex;

        let minorGod = game.add.sprite(minorGodX, ageY + 35, 'minorGods');

        minorGod.frame = this.data.minorGods[minorGodName].frame;

        minorGod.inputEnabled = true;

        minorGod.input.useHandCursor = true;

        minorGod.events.onInputOver.add(() => this.showDescription(this.data.minorGods[minorGodName].info), this);

        minorGod.events.onInputOut.add(this.hideDescription, this);

        this.activeGodInfo.add(minorGod);

    },

    addMythUnit(ageY, mythUnitName, mythUnitIndex, mythUnits){

        let spacer = 20;

        let mythUnitsWidth = (mythUnits.length * 32) + (mythUnits.length - 1) * spacer;

        let mythUnitsStartX = 882 - (mythUnitsWidth / 2);

        let mythUnitX = mythUnitsStartX + (32 + spacer) * mythUnitIndex;

        let mythUnit = game.add.sprite(mythUnitX, ageY + 109, 'mythUnits');

        mythUnit.frame = this.data.mythUnits[mythUnitName].frame;

        mythUnit.inputEnabled = true;

        mythUnit.input.useHandCursor = true;

        mythUnit.events.onInputOver.add(() => this.showDescription(this.data.mythUnits[mythUnitName].info), this);

        mythUnit.events.onInputOut.add(this.hideDescription, this);

        this.activeGodInfo.add(mythUnit);

    },

    showDescription(text){

        if (this.activeDescription) this.activeDescription.removeAll();

        this.activeDescription = game.add.group();

        let bg1 = game.add.graphics(687, 595).lineStyle(5, 0xBFA414, 1).beginFill(0x365A5A).drawRect(0, 0, 390, 90).endFill();

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