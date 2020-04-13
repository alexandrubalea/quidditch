import { SceneKey as MenuScene } from '@/scenes/MenuScene';
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
  score: number;
  scoreboard?: Phaser.GameObjects.Text;
  hasBall?: boolean;
  sprite?: Phaser.Physics.Arcade.Sprite;
}

export const SceneKey = 'GameScene';

export default class GameScene extends Phaser.Scene {
  players: Record<Player, PlayerInfo>;
  ball: Phaser.Physics.Arcade.Sprite;
  player1Scored: Phaser.GameObjects.Text;
  player2Scored: Phaser.GameObjects.Text;
  player1Won: Phaser.GameObjects.Text;
  player2Won: Phaser.GameObjects.Text;

  constructor() {
    super({ key: SceneKey });
  }

  init(data: Data) {
    this.players = {
      [Player.Player1]: {
        score: 0,
        hasBall: false,
        character: data.players[Player.Player1],
      },
      [Player.Player2]: {
        score: 0,
        hasBall: false,
        character: data.players[Player.Player2],
      },
    };
  }

  resetScene() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    this.ball.setVelocity(0);
    this.ball.x = width / 2;
    this.ball.y = height / 2;

    const player1 = this.players[Player.Player1].sprite;
    player1.setVelocity(0);
    player1.x = width / 2 - 200;
    player1.y = height;

    const player2 = this.players[Player.Player2].sprite;
    player2.setVelocity(0);
    player2.x = width / 2 + 200;
    player2.y = height;

    this.player1Scored.setVisible(false);
    this.player2Scored.setVisible(false);
  }

  isBallAroundPlayer(player: Phaser.Physics.Arcade.Sprite) {
    return (
      Math.sqrt(Math.pow(player.body.x - this.ball.body.x, 2) + Math.pow(player.body.y - this.ball.body.y, 2)) < 125
    );
  }

  player1HasScore(ringX: number, ringY: number) {
    return this.ball.body.deltaX() > 0 && this.ball.x > ringX && ringY - 20 < this.ball.y && this.ball.y < ringY + 100;
  }

  player2HasScore(ringX: number, ringY: number) {
    return this.ball.body.deltaX() < 0 && this.ball.x < ringX && ringY - 20 < this.ball.y && this.ball.y < ringY + 100;
  }

  player1HasWon() {
    return this.players[Player.Player1].score == 100;
  }

  player2HasWon() {
    return this.players[Player.Player2].score == 100;
  }

  increasePlayerScore(player: PlayerInfo) {
    player.score += 10;
    player.scoreboard.text = player.score.toString();
  }

  preload() {
    this.load.image('game-background', 'assets/background.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('ring', 'assets/ring.png');
    this.load.image(playerToImage[Character.Harry], 'assets/harry-broom.png');
    this.load.image(playerToImage[Character.Ron], 'assets/ron-broom.png');
  }

  create() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    const player1 = this.players[Player.Player1];

    const player2 = this.players[Player.Player2];

    const background = this.add.image(0, 0, 'game-background').setOrigin(0, 0);
    background.setScale(width / background.displayWidth, height / background.displayHeight);

    const leftRing = this.add.image(40, height, 'ring').setOrigin(0, 1);
    leftRing.scaleY = 1.1;

    const rightRing = this.add.image(width - 60, height, 'ring').setOrigin(1, 1);
    rightRing.flipX = true;
    rightRing.scaleY = 1.1;

    player1.sprite = this.physics.add.sprite(width / 2 - 200, height, playerToImage[player1.character]).setScale(0.2);
    //@ts-ignore
    player1.sprite.body.allowGravity = false;
    player1.scoreboard = this.add
      .text(40, height * 0.1, '0')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5);

    player2.sprite = this.physics.add.sprite(width / 2 + 200, height, playerToImage[player2.character]).setScale(0.2);
    player2.sprite.flipX = true;
    //@ts-ignore
    player2.sprite.body.allowGravity = false;
    player2.scoreboard = this.add
      .text(width - 40, height * 0.1, '0')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5);

    player1.sprite.setCollideWorldBounds(true);
    player2.sprite.setCollideWorldBounds(true);
    player1.sprite.setGravity(0);

    this.ball = this.physics.add.sprite(width / 2, height / 2, 'ball').setScale(0.1);
    this.ball.setBounce(0.3);
    this.ball.setDrag(0.1);
    this.ball.setCollideWorldBounds(true);

    this.player1Scored = this.add
      .text(width * 0.5, height * 0.5, 'Player 1 has scored')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setVisible(false);

    this.player2Scored = this.add
      .text(width * 0.5, height * 0.5, 'Player 2 has scored')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setVisible(false);

    this.player1Won = this.add
      .text(width * 0.5, height * 0.5, 'Player 1 has won')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setVisible(false);

    this.player2Won = this.add
      .text(width * 0.5, height * 0.5, 'Player 2 has won')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setVisible(false);
  }

  update() {
    const player1 = this.players[Player.Player1];
    const player2 = this.players[Player.Player2];

    const height = this.game.renderer.height;
    const width = this.game.renderer.width;
    const ringCenterY = height - 512 * 1.1 + 20;

    const player1Keys: any = this.input.keyboard.addKeys('W,S,A,D,Q,E');
    const player2Keys: any = this.input.keyboard.addKeys('up, down, left, right, K, L');

    // Player 1 controls
    if (player1Keys.A.isDown) {
      player1.sprite.x -= VELOCITY;
      player1.sprite.flipX = true;
    } else if (player1Keys.D.isDown) {
      player1.sprite.x += VELOCITY;
      player1.sprite.flipX = false;
    }
    if (player1Keys.W.isDown) {
      player1.sprite.y -= VELOCITY;
    } else if (player1Keys.S.isDown) {
      player1.sprite.y += VELOCITY;
    }
    if (player1Keys.Q.isDown && this.isBallAroundPlayer(player1.sprite) && !player2.hasBall) {
      //@ts-ignore
      this.ball.body.allowGravity = false;
      player1.hasBall = true;
    }
    if (player1.hasBall) {
      this.ball.x = player1.sprite.x;
      this.ball.y = player1.sprite.y;
    }
    if (player1Keys.E.isDown && player1.hasBall && !player2.hasBall) {
      player1.hasBall = false;
      //@ts-ignore
      this.ball.body.allowGravity = true;
      this.ball.setVelocity(1000, ringCenterY - player1.sprite.body.y * 1.5);
    }

    if (this.player1HasScore(width - 60, ringCenterY)) {
      this.increasePlayerScore(player1);
      if (this.player1HasWon()) {
        this.player1Won.setVisible(true);
        this.scene.pause();
        setTimeout(() => this.scene.start(MenuScene), 2000);
      } else {
        this.player1Scored.setVisible(true);
        this.scene.pause();
        setTimeout(() => {
          this.resetScene();
          this.scene.resume();
        }, 1250);
      }
    }

    // Player 2 controls
    if (player2Keys.left.isDown) {
      player2.sprite.x -= VELOCITY;
      player2.sprite.flipX = true;
    } else if (player2Keys.right.isDown) {
      player2.sprite.x += VELOCITY;
      player2.sprite.flipX = false;
    }
    if (player2Keys.up.isDown) {
      player2.sprite.y -= VELOCITY;
    } else if (player2Keys.down.isDown) {
      player2.sprite.y += VELOCITY;
    }
    if (player2Keys.K.isDown && this.isBallAroundPlayer(player2.sprite) && !player1.hasBall) {
      //@ts-ignore
      this.ball.body.allowGravity = false;
      player2.hasBall = true;
    }
    if (player2.hasBall) {
      this.ball.x = player2.sprite.x;
      this.ball.y = player2.sprite.y;
    }
    if (player2Keys.L.isDown && player2.hasBall && !player1.hasBall) {
      player2.hasBall = false;
      //@ts-ignore
      this.ball.body.allowGravity = true;
      this.ball.setVelocity(-1000, ringCenterY - player2.sprite.body.y * 1.5);
    }

    if (this.player2HasScore(100, ringCenterY)) {
      this.increasePlayerScore(player2);
      if (this.player2HasWon()) {
        this.player2Won.setVisible(true);
        this.scene.pause();
        setTimeout(() => this.scene.start(MenuScene), 2000);
      } else {
        this.player2Scored.setVisible(true);
        this.scene.pause();
        setTimeout(() => {
          this.resetScene();
          this.scene.resume();
        }, 1250);
      }
    }
  }
}
