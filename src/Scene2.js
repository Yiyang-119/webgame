// src/Scene2.js
import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene2' });
    }

    preload() {
        // 加载第二个背景、按钮和对话框资源
        this.load.image('bg-2', 'assets/images/2-bg-关卡选择.png');
        this.load.image('bt-2-1', 'assets/images/2-bt-关卡按钮1.png');
        this.load.image('bt-2-2', 'assets/images/2-bt-关卡按钮2.png');
        this.load.image('bt-2-3', 'assets/images/2-bt-关卡按钮3.png');
        this.load.image('db-2-cat', 'assets/images/2-db-对话框-猫.png');
        this.load.image('db-2-narrator', 'assets/images/2-db-对话框-旁白.png');

        this.load.image('c1', 'assets/images/2-c1-第一章.png');
        this.load.image('c2', 'assets/images/2-c1-第一章.png');
        // this.load.image('c2', 'assets/images/2-c2-第二章.png');
    }

    create() {
        // 计算中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;

        // 添加第二个背景，初始透明度为 0
        this.background = this.add.image(this.centerX, this.centerY, 'bg-2');

        // 添加按钮，初始透明度为 0，初始缩放为 80%
        this.button1 = this.add.image(this.centerX - 800, this.centerY + 90, 'bt-2-1').setInteractive();
        this.button1.setScale(0.8);

        this.button2 = this.add.image(this.centerX - 50, this.centerY + 350, 'bt-2-2').setInteractive();
        this.button2.setScale(0.8);

        this.button3 = this.add.image(this.centerX + 700, this.centerY, 'bt-2-3').setInteractive();
        this.button3.setScale(0.8);

        // 定义对话内容队列
        this.dialogQueue = [
            { speaker: '猫', text: '你好', dialogKey: 'db-2-cat' },
            { speaker: '猫', text: '点击按钮开始游戏', dialogKey: 'db-2-cat' },
        ];

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                // 按钮淡入完成后，添加交互事件
                this.addButtonInteractivity(this.button1, "Scene3");
                this.addButtonInteractivity(this.button2, "Scene10");
                this.addButtonInteractivity(this.button3, "Scene18");
            }
        });

        // 开始对话
        this.transitionManager = new TransitionManager(this);

        this.transitionManager.fadeIn({
            onComplete: () => {
                this.dialogManager.start();
            }
        });

    }



    addButtonInteractivity(button, chapter) {
        // 鼠标悬停事件
        button.on('pointerover', () => {
            this.tweens.add({
                targets: button,
                scale: 1.0,
                duration: 200,
                ease: 'Power2',
            });
        });

        // 鼠标移出事件
        button.on('pointerout', () => {
            this.tweens.add({
                targets: button,
                scale: 0.8,
                duration: 200,
                ease: 'Power2',
            });
        });

        // 鼠标点击事件
        button.on('pointerdown', () => {
            // 创建点击效果，例如按钮缩小
            this.tweens.add({
                targets: button,
                scale: 0.7,
                duration: 100,
                yoyo: true,
                ease: 'Power2',
                onComplete: () => {
                    this.transitionManager.fadeOut({
                        fadeDuration: 2000,
                        onComplete: () => {
                            console.log('淡出2完成');
                            this.scene.start(chapter);
                        }
                    });
                }
            });
        });
    }
}
