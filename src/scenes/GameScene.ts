import { Character, Player } from '@/domain';

const playerToImage: Record<Character, string> = {
  [Character.Harry]: 'player-harry-broom',
  [Character.Ron]: 'player-ron-broom',
};

interface Data {
  players: Record<Player, Character>;
}

export class GameScene extends Phaser.Scene {
  players: Record<Player, Character>;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(data: Data) {
    this.players = data.players;
  }

  preload() {
    this.load.image('game-background', 'assets/background.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image(playerToImage[Character.Harry], 'assets/harry-broom.png');
    this.load.image(playerToImage[Character.Ron], 'assets/ron-broom.png');
  }

  create() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    const background = this.add.image(0, 0, 'game-background').setOrigin(0, 0);
    background.setScale(width / background.displayWidth, height / background.displayHeight);

    const players = {
      player1: this.physics.add.sprite(width * 0.3, height, playerToImage[this.players[Player.Player1]]).setScale(0.3),
      player2: this.physics.add.sprite(width * 0.6, height, playerToImage[this.players[Player.Player2]]).setScale(0.3),
    };

    players.player2.flipX = true;

    players.player1.setCollideWorldBounds(true);
    players.player2.setCollideWorldBounds(true);

    const ball = this.physics.add.sprite(width / 2, height / 2, 'ball').setScale(0.15);
    ball.setBounce(0.2);
    ball.setCollideWorldBounds(true);
  }
}
