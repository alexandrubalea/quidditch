import { SceneKey as MenuScene } from '@/scenes/MenuScene';

export const SceneKey = 'HelpScene';

export default class HelpScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKey });
  }

  preload() {
    this.load.image('background', 'assets/background.png');
  }

  create() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setScale(width / background.displayWidth, height / background.displayHeight);

    this.add
      .text(width * 0.5, height * 0.25, 'USE W, A, S, D to control player 1')
      .setScale(3)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5);

    this.add
      .text(width * 0.5, height * 0.5, 'USE UP, DOWN, LEFT, RIGHT to control player 2')
      .setScale(3)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5);

    this.add
      .text(width * 0.5, height * 0.75, 'BACK')
      .setScale(3)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.stop();
        this.scene.wake(MenuScene);
      });
  }
}
