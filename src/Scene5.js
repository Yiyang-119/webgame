// src/Scene5.js

import DialogManager from './DialogManager.js';

import TransitionManager from './TransitionManager.js';

export default class Scene5 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene5' });
    }

    preload() {
        // 加载背景、对话框资源
        this.load.image('db-5-cat', 'assets/images/5-db-对话框-猫.png');
        this.load.image('db-5-user', 'assets/images/5-db-对话框-人.png');
        this.load.image('yd-5-c', 'assets/images/5-ydc-宅院大门关.png');
        this.load.image('yd-5-o', 'assets/images/5-ydo-宅院大门开.png');
    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;

        this.transitionManager = new TransitionManager(this);

        // 添加关闭的大门背景，但暂时设置为不可见，等待淡入完成后显示
        this.background = this.add.image(this.centerX, this.centerY, 'yd-5-c');


        // 初始化对话索引
        this.dialogIndex = 0;

        // 定义对话内容队列
        this.dialogQueue = [
            { speaker: '猫', text: '我们到了', dialogKey: 'db-5-cat', textOffsetX: +100, textOffsetY: -50 },
            { speaker: '人', text: '哇！好气派的大门', dialogKey: 'db-5-user' },
            { speaker: '猫', text: '瞧你没出息那样', dialogKey: 'db-5-cat' },
            { speaker: '死者家属', text: '你来了？快进来，点击大门就可以了', dialogKey: 'db-5-cat' }
        ];

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.enableGateInteraction();
            }
        });


        // 进行画面逐渐亮起的效果（淡入）
        this.transitionManager = new TransitionManager(this);

        this.transitionManager.fadeIn({
            onComplete: () => {
                // 开始对话
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
            this.background.setTexture('yd-5-o');

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
                        // 切换到下一个场景（例如 Scene5）
                        this.scene.start('Scene6');
                    }
                });


            }
        });
    }

}
