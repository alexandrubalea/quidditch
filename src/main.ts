import * as Phaser from 'phaser';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
  type: Phaser.AUTO,
  scale: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  },
  scene: {
    preload: preload,
    create: create
  },
  parent: 'game',
  backgroundColor: '#000000'
};

function preload() {
  this.load.image('background', './assets/background.png');
}

function create() {
  this.add.image('200', '300', 'background');
}

export const game = new Phaser.Game(gameConfig);
