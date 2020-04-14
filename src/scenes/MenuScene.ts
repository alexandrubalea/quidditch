import { SceneKey as HelpScene } from '@/scenes/HelpScene';

export const SceneKey = 'MenuScene';

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKey });
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.bitmapFont('myfont', 'assets/HARRYP_.bmp');
    this.load.atlas('gems', 'assets/gems.png', 'assets/gems.json');
  }

  create() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.setScale(width / background.displayWidth, height / background.displayHeight);

    // diamond animation
    var animConfig = {
      key: 'diamond',
      frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }),
      repeat: -1,
      showOnStart: true
    };

    this.anims.create(animConfig);

    var gem = this.add.sprite(width/2, 100, 'gems');

    //  Set sprite to visible false
    gem.visible = false;

    //  Sprite will have visible = true set when it starts because of 'showOnStart' property
    gem.play('diamond');

    // const startButton = this.add.bitmapText(width*0.45, height*0.2, 'myfont', 'START');
    this.add
      .text(width * 0.5, height * 0.33, 'START')
      .setScale(3)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('ChoosePlayerScene');
      });

    this.add
      .text(width * 0.5, height * 0.66, 'HELP')
      .setScale(3)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.switch(HelpScene);
      });
  }
}
