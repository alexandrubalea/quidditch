export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('game-background', 'assets/background.png');
  }

  create() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    const background = this.add.image(0, 0, 'game-background').setOrigin(0, 0);
    background.setScale(width / background.displayWidth, height / background.displayHeight);
  }
}
