import * as Phaser from 'phaser';

import { MenuScene, GameScene } from '@/scenes';

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
      debug: true,
    },
  },
  parent: 'game',
  backgroundColor: '#000000',
};

const game = new Phaser.Game(gameConfig);

game.scene.add('MenuScene', new MenuScene());
game.scene.add('GameScene', new GameScene());
game.scene.start('MenuScene');
