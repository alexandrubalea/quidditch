import * as Phaser from 'phaser';

import MenuScene, { SceneKey as MenuSceneKey } from '@/scenes/MenuScene';
import ChoosePlayerScene, { SceneKey as ChoosePlayerSceneKey } from '@/scenes/ChoosePlayerScene';
import GameScene, { SceneKey as GameSceneKey } from '@/scenes/GameScene';
import HelpScene, { SceneKey as HelpSceneKey } from '@/scenes/HelpScene';

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
    },
  },
  parent: 'game',
  backgroundColor: '#000000',
};

const game = new Phaser.Game(gameConfig);

game.scene.add(MenuSceneKey, new MenuScene());
game.scene.add(ChoosePlayerSceneKey, new ChoosePlayerScene());
game.scene.add(GameSceneKey, new GameScene());
game.scene.add(HelpSceneKey, new HelpScene());
game.scene.start(MenuSceneKey);
