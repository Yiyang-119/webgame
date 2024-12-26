// src/Scene13.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

class Scene13 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene13' });
    }

    preload() {
        // 加载背景、角色、对话框、档案袋等资源
        this.load.image('bg-13', 'assets/images/13-dre-殡仪馆化妆间.png');
        this.load.image('dialog-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('dialog-user', 'assets/images/4-db-对话框-人.png');
    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;


        // 添加背景
        this.background = this.add.image(this.centerX, this.centerY, 'bg-13');

        // 初始化对话索引
        this.dialogIndex = 0;

        // 定义对话内容队列
        this.dialogQueue = [
            {
                speaker: '猫',
                text: '这里是殡仪馆的遗体化妆间，是殡仪师用来工作化妆的地方',
                dialogKey: 'dialog-cat'
            },
            {
                speaker: '猫',
                text: '现在我们开始进入工作状态吧',
                dialogKey: 'dialog-cat'
            }
        ];


        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.enableGateInteraction();
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

    enableGateInteraction() {
        // 使大门可交互
        this.background.setInteractive();

        // 添加鼠标悬停效果（可选）
        // this.background.on('pointerover', () => {
        //     this.background.setTint(0xcccccc);
        // });
        // this.background.on('pointerout', () => {
        //     this.background.clearTint();
        // });

        // 点击事件
        this.background.on('pointerdown', () => {
            // 移除交互
            this.background.disableInteractive();

            // 切换为打开的大门背景
            // this.background.setTexture('yd-5-o');

            // 相机拉进，进入效果
            this.cameraZoomIn();
        });
    }

    cameraZoomIn() {
        // 使用 Tween 动画来缩放相机
        this.tweens.add({
            targets: this.cameras.main,
            zoom: 2, // 缩放到2倍
            duration: 3000, // 持续时间3秒
            ease: 'Linear',
            onComplete: () => {
                // 缩放动画完成后，切换到下一个场景
                this.transitionManager.fadeOut({
                    onComplete: () => {
                        // 切换到下一个场景
                        this.scene.start('Scene14');
                    }
                });


            }
        });
    }
}

export default Scene13;