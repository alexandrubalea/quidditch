export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('background', 'assets/background.png');

    }

    create() {
        const height = this.game.renderer.height;
        const width = this.game.renderer.width;

        const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
        background.setScale(width / background.displayWidth, height / background.displayHeight);

        this.add
            .text(width * 0.45, height * 0.2, 'START').setScale(3)
            .setShadow(3,1,"black", 2, true, true)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('ChoosePlayerScene');
            });
    }
}