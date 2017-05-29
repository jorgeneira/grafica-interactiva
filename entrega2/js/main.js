let game = new Phaser.Game(1200, 768, Phaser.CANVAS, "mapaWrap");

game.state.add('homeState', homeState);
game.state.add('mapState', mapState);

game.state.start('mapState');


