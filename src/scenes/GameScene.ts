export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    this.load.image('game-background', 'assets/background.png');
    this.load.image('player-harry', 'assets/harry.png');
    this.load.image('player-ron', 'assets/ron.png');
    this.load.image('ball', 'assets/ball.png');
  }

  create() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    const background = this.add.image(0, 0, 'game-background').setOrigin(0, 0);
    background.setScale(width / background.displayWidth, height / background.displayHeight);

    const players = {
      player1: this.physics.add.sprite(width*0.3,  height, 'player-harry').setScale(0.3),
      player2: this.physics.add.sprite(width*0.6, height, 'player-ron').setScale(0.3),
    };

    players.player1.setCollideWorldBounds(true);
    players.player2.setCollideWorldBounds(true);

    const ball = this.physics.add.sprite(width/2, height/2, 'ball').setScale(0.15);
    ball.setBounce(0.2);
    ball.setCollideWorldBounds(true);
  }
}
