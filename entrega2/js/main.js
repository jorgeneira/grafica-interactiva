/**
 * Esta aplicación corresponde a un mapa interactivo con las civilizaciones
 * del juego Age og Mythology.
 *
 * Fue creada en Javascript, usando sintaxis ES6.
 *
 * Debe ser ejecutada desde un servidor local o con Firefox ya que carga un archivo JSON
 * con la información.
 *
 * Jorge Enrique Neira Angulo
 * jeneiraa@unal.edu.co
 */
let game = new Phaser.Game(1200, 768, Phaser.CANVAS, "mapaWrap");

/**
 * Regsitro los estados de la aplicación.
 */
game.state.add('homeState', homeState);
game.state.add('mapState', mapState);
game.state.add('creditsState', creditsState);

/**
 * Inicio el estado home.
 */
game.state.start('homeState');


