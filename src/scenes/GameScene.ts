import { Character, Player } from '@/domain';

const VELOCITY = 5;

const playerToImage: Record<Character, string> = {
  [Character.Harry]: 'player-harry-broom',
  [Character.Ron]: 'player-ron-broom',
};

interface Data {
  players: Record<Player, Character>;
}

interface PlayerInfo {
  character: Character;
  sprite?: Phaser.Physics.Arcade.Sprite;
}

export const SceneKey = 'GameScene';

export default class GameScene extends Phaser.Scene {
  players: Record<Player, PlayerInfo>;

  constructor() {
    super({ key: SceneKey });
  }

  init(data: Data) {
    this.players = {
      [Player.Player1]: {
        character: data.players[Player.Player1],
      },
      [Player.Player2]: {
        character: data.players[Player.Player2],
      },
    };
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

    this.players[Player.Player1].sprite = this.physics.add
      .sprite(width * 0.3, height, playerToImage[this.players[Player.Player1].character])
      .setScale(0.3);
    //@ts-ignore
    this.players[Player.Player1].sprite.body.allowGravity = false;

    this.players[Player.Player2].sprite = this.physics.add
      .sprite(width * 0.6, height, playerToImage[this.players[Player.Player2].character])
      .setScale(0.3);
    this.players[Player.Player2].sprite.flipX = true;
    //@ts-ignore
    this.players[Player.Player2].sprite.body.allowGravity = false;

    this.players[Player.Player1].sprite.setCollideWorldBounds(true);
    this.players[Player.Player2].sprite.setCollideWorldBounds(true);
    this.players[Player.Player1].sprite.setGravity(0);

    const ball = this.physics.add.sprite(width / 2, height / 2, 'ball').setScale(0.15);
    ball.setBounce(0.2);
    ball.setCollideWorldBounds(true);
  }

  update() {
    const player1Keys: any = this.input.keyboard.addKeys('W,S,A,D');
    const player2Keys = this.input.keyboard.createCursorKeys();

    // Player 1 controls
    if (player1Keys.A.isDown) {
      this.players[Player.Player1].sprite.x -= VELOCITY;
    } else if (player1Keys.D.isDown) {
      this.players[Player.Player1].sprite.x += VELOCITY;
    }
    if (player1Keys.W.isDown) {
      this.players[Player.Player1].sprite.y -= VELOCITY;
    } else if (player1Keys.S.isDown) {
      this.players[Player.Player1].sprite.y += VELOCITY;
    }

    // Player 2 controls
    if (player2Keys.left.isDown) {
      this.players[Player.Player2].sprite.x -= VELOCITY;
    } else if (player2Keys.right.isDown) {
      this.players[Player.Player2].sprite.x += VELOCITY;
    }
    if (player2Keys.up.isDown) {
      this.players[Player.Player2].sprite.y -= VELOCITY;
    } else if (player2Keys.down.isDown) {
      this.players[Player.Player2].sprite.y += VELOCITY;
    }
  }
}
