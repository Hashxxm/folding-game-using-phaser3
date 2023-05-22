import Phaser from './lib/phaser.js'
import Game from './scenes/Game.js'

var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
};

const game = new Phaser.Game(config);
game.scene.add("Game", Game);
game.scene.start("Game");
