import * as Phaser from 'phaser';

import {ChoosePlayerScene, GameScene, MenuScene} from '@/scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
  type: Phaser.AUTO,
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  parent: 'game',
  backgroundColor: '#000000',
};

const game = new Phaser.Game(gameConfig);

game.scene.add('MenuScene', new MenuScene());
game.scene.add('ChoosePlayerScene', new ChoosePlayerScene());
game.scene.add('GameScene', new GameScene());
game.scene.start('MenuScene');
