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
            { speaker: '人', text: '(What a beautiful place)', dialogKey: 'dialog-user' },
            { speaker: '猫', text: '[Meow] Yes, this is the sea we have specially selected! A very dreamy piece of ocean that can bring gentleness and beauty to those who come to it, the king picked it well, didnt he?', dialogKey: 'dialog-cat' },
            { speaker: '死者家属', text: '(Family of the departed)[in tears] You finally see the sea, its the sea you have always dreamed of!', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: '(Family of the departed) [sobbing and telling a story] When my mom was little, she lived on an island near the ocean.', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: '(Family of the departed) My grandma supported her and her sisters by fishing every day as her job. She told me that what she looked forward to most every day when she was a child was sitting on the beach and watching the sun gradually rise over the surface of the sea, and that she would feel immensely happy and contented at such times.', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: '(Family of the departed) Later, because of the national policy, she left the island and came to the city. Then she and my father gave birth to me, Since that day, she has been tirelessly toiling and working hard to support my sister and me, striving to earn money and provide us with a better living environment. ', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: '(Family of the departed) I always thought that when I grew up and made money, I would take her to see many, many oceans and welcome that wonderful moment. But after taking her to see it a few times, she slowly got old and couldnt walk anymore, so she never saw the sea since ten years ago.', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: '(Family of the departed) But she always chanted about seeing the sea, always remembering the ocean, some time ago, she felt that she could not do so she told us to let us bury her ashes in the ocean, so that after her death, she can also see the sea forever ....... Now I come to fulfil your wish,mom.', dialogKey: 'dialog-user' },

            
            { speaker: '人', text: '[weeping] Your mother will be happy to see such a beautiful sea', dialogKey: 'dialog-user' },
            { speaker: '人', text: '（whimpering, whimpering, whimpering）', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: 'Family of the departed: Thank you, I hope that in her next life she will not be so hard, and can enjoy ocean happily.', dialogKey: 'dialog-user' },
            { speaker: '人', text: 'I am sure she will.', dialogKey: 'dialog-user' },
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
                // 在黑屏后切换到第十幕
                this.scene.start('Scene10'); // 假设你要跳转到第10幕
            }
        });
    }
}