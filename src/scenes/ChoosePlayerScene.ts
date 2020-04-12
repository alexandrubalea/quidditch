import { Character, Player } from '@/domain';
import { SceneKey as GameScene } from '@/scenes/GameScene';

const characterToImage: Record<Character, string> = {
  [Character.Harry]: 'player-harry',
  [Character.Ron]: 'player-ron',
};

interface PlayerInfo {
  character: Character;
  sprite?: Phaser.GameObjects.Sprite;
}

export const SceneKey = 'ChoosePlayerScene';

export default class ChoosePlayerScene extends Phaser.Scene {
  constructor() {
    super({ key: SceneKey });
  }

  preload() {
    this.load.image('menu-background', 'assets/menu-background.jpg');
    this.load.image(characterToImage[Character.Harry], 'assets/harry.png');
    this.load.image(characterToImage[Character.Ron], 'assets/ron.png');
  }

  private switchPlayers(players: Record<Player, PlayerInfo>, offsets: Record<Player, number>) {
    [players[Player.Player1], players[Player.Player2]] = [players[Player.Player2], players[Player.Player1]];
    players[Player.Player1].sprite.x = offsets[Player.Player1];
    players[Player.Player2].sprite.x = offsets[Player.Player2];
  }

  create() {
    const height = this.game.renderer.height;
    const width = this.game.renderer.width;

    const background = this.add.image(0, 0, 'menu-background').setOrigin(0, 0);
    background.setScale(width / background.displayWidth, height / background.displayHeight);

    const spaceBetween = width * 0.15;
    const offsets: Record<Player, number> = {
      [Player.Player1]: width / 3 - spaceBetween / 2,
      [Player.Player2]: (width * 2) / 3 + spaceBetween / 2,
    };

    const players: Record<Player, PlayerInfo> = {
      [Player.Player1]: {
        character: Character.Harry,
      },
      [Player.Player2]: {
        character: Character.Ron,
      },
    };

    // Add text for players
    this.add
      .text(offsets[Player.Player1], height * 0.1, 'PLAYER 1')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5);

    this.add
      .text(offsets[Player.Player2], height * 0.1, 'PLAYER 2 ')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5);

    // Add player models
    let harry = this.add
      .sprite(offsets[Player.Player1], height * 0.675, characterToImage[Character.Harry])
      .setScale(0.75);
    let ron = this.add.sprite(offsets[Player.Player2], height * 0.675, characterToImage[Character.Ron]).setScale(0.75);

    players[Player.Player1].sprite = harry;
    players[Player.Player2].sprite = ron;

    // Add buttons
    this.add
      .text(width * 0.5, height * 0.1, 'SWITCH')
      .setScale(3.0)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.switchPlayers(players, offsets);
      });

    this.add
      .text(width * 0.5, height * 0.2, 'GO')
      .setScale(3)
      .setShadow(3, 1, 'black', 2, true, true)
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.start(GameScene, {
          players: {
            [Player.Player1]: players[Player.Player1].character,
            [Player.Player2]: players[Player.Player2].character,
          },
        });
      });
  }
}
