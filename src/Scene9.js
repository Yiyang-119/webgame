// src/Scene9.js

import DialogManager from './DialogManager.js';

export default class Scene9 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene9' });
    }

    preload() {
        // 加载所需资源
        this.load.image('dialog-user', 'assets/images/5-db-对话框-人.png');
        this.load.image('dialog-cat', 'assets/images/5-db-对话框-猫.png');
        this.load.image('bone-box', 'assets/images/9-bb-骨灰盒.png');
        this.load.image('back-ground', 'assets/images/9-bg-海上场景.png');
    }

    create() {
        // 获取屏幕中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;

        // 添加海上背景
        this.add.image(this.centerX, this.centerY, 'back-ground');

        // 初始化对话索引
        this.dialogIndex = 0;

        // 定义对话内容队列
        this.dialogQueue = [
            { speaker: '人', text: '（好美的地方）', dialogKey: 'dialog-user' },
            { speaker: '猫', text: '【喵】是的，这是我们专门挑选的海域！非常梦幻的一片海域，可以给来的人带来温和和美好，本王挑选的不错吧', dialogKey: 'dialog-cat' },
            { speaker: '死者家属', text: '【流泪】您终于看到大海了，这是您梦寐以求的海洋', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: '【哽咽的讲故事】我的妈妈小的时候，是生活在海洋附近的岛屿上的……（故事继续）', dialogKey: 'dialog-user' },
            { speaker: '人', text: '【流泪】看到这么美丽的海您的母亲一定会感到开心的', dialogKey: 'dialog-user' },
            { speaker: '人', text: '（呜呜呜呜呜呜）', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: '谢谢，我希望她下辈子可以不那么辛苦了，可以永远开开心心的看一辈子的海', dialogKey: 'dialog-user' },
            { speaker: '人', text: '一定会的', dialogKey: 'dialog-user' },
        ];

        // 创建对话管理器
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.showBoneBox(); // 显示骨灰盒动画
            }
        });

        // 开始对话
        this.time.delayedCall(2000, () => {
            this.dialogManager.start();

        }, [], this);
    }

    showBoneBox() {
        // 显示骨灰盒，并启动动画
        this.boneBox = this.add.image(this.centerX, this.centerY + 500, 'bone-box')
            .setOrigin(0.5)
            .setAlpha(0); // 初始时设置为不可见

        // 动画：骨灰盒上升并逐渐淡出
        this.tweens.add({
            targets: this.boneBox,
            y: this.centerY + 200, // 向上移动
            alpha: 1, // 渐变为可见
            duration: 2000, // 3秒完成上升动画
            onComplete: () => {
                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: this.boneBox,
                        y: this.centerY - 200, // 向上移动
                        alpha: 0, // 渐变为可见
                        scale: 0.5,
                        duration: 4000, // 3秒完成上升动画
                        onComplete: () => {
                            this.fadeOutScene(); // 动画完成后执行淡出效果
                        }
                    }); // 动画完成后执行淡出效果
                }, [], this);
            }
        });
    }

    fadeOutScene() {
        // 添加黑色矩形，逐渐遮盖整个画面
        const blackScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
            .setOrigin(0, 0).setDepth(3);
        blackScreen.alpha = 0;

        // 逐渐黑屏
        this.tweens.add({
            targets: blackScreen,
            alpha: 1,
            duration: 2000,
            onComplete: () => {
                // 在黑屏后切换到第二幕
                this.scene.start('Scene2'); // 假设你要跳转到第二幕
            }
        });
    }
}