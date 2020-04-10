export class ChoosePlayerScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ChoosePlayerScene' });
  }

  preload() {
    this.load.image('menu-background', 'assets/menu-background.jpg');
    this.load.image('player-harry', 'assets/harry.png');
    this.load.image('player-ron', 'assets/ron.png');
  }

  create() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    const background = this.add.image(0, 0, 'menu-background').setOrigin(0, 0);
    background.setScale(width / background.displayWidth, height / background.displayHeight);

    const spaceBetween = width * 0.1;
    const player1XOffset = width / 3 - spaceBetween / 2;
    const player2XOffset = (width * 2) / 3 + spaceBetween / 2;

    const players = {
      player1: 'player-harry',
      player2: 'player-ron',
    };

    let player1 = this.add.text(width * 0.15, height * 0.1, 'PLAYER 1').setScale(3.00)
        .setShadow(3,1,"black", 2, true, true);
    this.add.sprite(player1XOffset, height * 0.675, 'player-harry').setScale(0.75);

    let player2 = this.add.text(width * 0.65, height * 0.1, 'PLAYER 2 ').setScale(3.00)
        .setShadow(3,1,"black", 2, true, true);
    this.add.sprite(player2XOffset, height * 0.675, 'player-ron').setScale(0.75);

    this.add
      .text(width * 0.44, height * 0.1, 'SWITCH').setScale(3.00)
        .setShadow(3,1,"black", 2, true, true)
      .setInteractive()
      .on('pointerdown', () => {
        if (player1.text == 'PLAYER 1') {
          player1.setText('PLAYER 2');
          players.player1 = 'player-ron';
          player2.setText('PLAYER 1');
          players.player2 = 'player-harry';
        } else {
          player1.setText('PLAYER 1');
          players.player1 = 'player-harry';
          player2.setText('PLAYER 2');
          players.player2 = 'player-ron';
        }
      });

    this.add
      .text(width * 0.48, height * 0.2, 'GO').setScale(3)
        .setShadow(3,1,"black", 2, true, true)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start('GameScene');
      });
  }
}
