// src/Scene8.js

import DialogManager from './DialogManager.js';

export default class Scene8 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene8' });
    }

    preload() {
        // 加载所有需要的资源
        this.load.image('bg-closed', 'assets/images/8-bg-1-火葬场背景-门关闭.png');
        this.load.image('bg-half', 'assets/images/8-bg-2-火葬场背景-半开门.png');
        this.load.image('bg-open', 'assets/images/8-bg-2-火葬场背景-全开门.png');
        this.load.image('bg-front', 'assets/images/8-bg-0-火葬场背景上层图片.png');

        this.load.image('corpse-car', 'assets/images/8-bcv-抬尸车.png');
        this.load.image('bone-box-car', 'assets/images/8-cccv-抬骨灰盒车.png');
        this.load.image('bone-box', 'assets/images/8-cc-骨灰盒.png');
        this.load.image('dialog-user', 'assets/images/5-db-对话框-人.png');


    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;

        // 添加初始背景（门关闭）
        this.background = this.add.image(this.centerX, this.centerY, 'bg-closed');

        this.add.image(this.centerX, this.centerY, 'bg-front').setDepth(2);
        // 添加抬尸车
        this.corpseCar = this.add.image(this.centerX + 180, this.centerY + 228, 'corpse-car').setDepth(1).setInteractive();

        // 初始化对话索引
        this.dialogIndex = 0;


        // 定义初始对话内容队列
        this.dialogQueue = [
            { speaker: '火葬场员工', text: 'Crematorium Staff: Hello! This is the crematorium. Please hand over the body to us', dialogKey: 'dialog-user' },
            { speaker: '人', text: 'OK', dialogKey: 'dialog-user' },
        ];

        // 创建对话管理器，并在对话结束时执行后续操作
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                // 显示抬尸车交互提示
                this.showCorpseCarInteraction();
                // this.animateBoneBoxCarOut();
            }
        });

        // 开始对话
        this.dialogManager.start();
    }

    showCorpseCarInteraction() {

        // 实现闪烁效果（渐变变白）
        const blinkTween = this.tweens.add({
            targets: this.corpseCar,
            alpha: { from: 1, to: 0.7 },
            duration: 500,
            yoyo: true,  // 往返闪烁
            repeat: -1,  // 无限次重复
            ease: 'Sine.easeInOut'
        });

        // 提示玩家点击抬尸车
        this.corpseCar.on('pointerdown', () => {
            blinkTween.stop()
            this.handleCorpseCarClick();
        });


    }

    handleCorpseCarClick() {
        // 移除点击事件以防多次触发
        this.corpseCar.disableInteractive();

        // 开始门的开启动画
        this.openDoorsSequence();
    }

    openDoorsSequence() {
        // 定义门开启的顺序图片
        const doorSequence = ['bg-half', 'bg-open'];
        let currentStep = 0;

        // 创建一个定时事件来切换门的状态
        this.time.addEvent({
            delay: 1000, // 每1秒切换一次
            repeat: doorSequence.length - 1,
            callback: () => {
                if (currentStep < doorSequence.length) {
                    this.background.setTexture(doorSequence[currentStep]);
                    currentStep++;
                }
            },
            callbackScope: this
        });

        // 在门完全开启后执行抬骨灰盒车的动画
        this.time.delayedCall(doorSequence.length * 1200, () => {
            this.animateBoneBoxCarIn();
        }, [], this);
    }

    animateBoneBoxCarIn() {
        // // 添加抬骨灰盒车
        // this.boneBoxCar = this.add.image(-100, this.centerY + 150, 'bone-box-car');
        // this.boneBoxCar.setScale(0.5).setDepth(1); // 初始缩放

        // 创建移动和缩小的动画
        this.tweens.add({
            targets: this.corpseCar,
            x: this.centerX + 1200,
            y: this.centerY + 100,
            scale: 0.5,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => {
                // 关闭门
                this.closeDoorsSequence();
            }
        });
    }

    closeDoorsSequence() {
        // 定义门关闭的顺序图片
        const doorSequence = ['bg-half', 'bg-closed'];
        let currentStep = 0;

        // 创建一个定时事件来切换门的状态
        this.time.addEvent({
            delay: 1000, // 每1秒切换一次
            repeat: doorSequence.length - 1,
            callback: () => {
                if (currentStep < doorSequence.length) {
                    this.background.setTexture(doorSequence[currentStep]);
                    currentStep++;
                }
            },
            callbackScope: this
        });

        // 在门完全关闭后销毁抬shi车
        this.time.delayedCall(doorSequence.length * 500, () => {
            this.corpseCar.destroy();

            // 继续后续对话
            this.continueAfterCarAnimation();
        }, [], this);
    }

    continueAfterCarAnimation() {
        // 定义后续对话内容队列
        this.dialogQueue = [
            { speaker: '火葬场员工', text: 'Crematorium Staff: "Alright, please wait here quietly for the next step.', dialogKey: 'dialog-user' },
            { speaker: '人', text: 'Ok', dialogKey: 'dialog-user' },
        ];

        // 创建对话管理器，并在对话结束时执行等待动画
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.fadeOut();
            }
        });

        // 开始对话
        this.dialogManager.start();
    }

    fadeOut(onComplete) {
        const blackScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
            .setOrigin(0, 0).setDepth(3);
        blackScreen.alpha = 0;

        this.tweens.add({
            targets: blackScreen,
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                this.time.delayedCall(2000, () => {
                    const txt = this.add.text(this.centerX, this.centerY, '30 minutes later......', { fontSize: '80px', fill: '#ffffff' }).setOrigin(0, 0).setDepth(4)
                    this.time.delayedCall(2000, () => {
                        blackScreen.destroy();
                        txt.destroy();
                        this.fadeIn();
                    }, [], this);
                }, [], this);
            }
        });
    }

    fadeIn(onComplete) {
        this.background = this.add.image(this.centerX, this.centerY, 'bg-closed').setDepth(0);
        this.cameras.main.fadeIn(2000, 0, 0, 0); // 2秒内从黑色淡入
        this.cameras.main.once('camerafadeincomplete', () => {
            this.time.delayedCall(1000, () => { this.processingComplete(); }, [], this);
        });
    }

    processingComplete() {
        // 定义处理完成后的对话内容队列
        this.dialogQueue = [
            { speaker: '火葬场员工', text: 'Crematorium Staff: OK now, please ask the family to come and take the urn', dialogKey: 'dialog-user' },
        ];

        // 创建对话管理器，并在对话结束时设置骨灰盒交互
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.openFurnaceDoorSequence();
            }
        });

        // 开始对话
        this.dialogManager.start();
    }


    openFurnaceDoorSequence() {
        // 开启火炉门的动画
        const doorSequence = ['bg-half', 'bg-open'];
        let currentStep = 0;

        this.time.addEvent({
            delay: 1000,
            repeat: doorSequence.length,
            callback: () => {
                if (currentStep < doorSequence.length) {
                    this.background.setTexture(doorSequence[currentStep]);
                    currentStep++;
                }
            },
            callbackScope: this
        });

        // 在门完全开启后执行抬骨灰盒车滑出动画
        this.time.delayedCall(doorSequence.length * 1200, () => {
            this.animateBoneBoxCarOut();
        }, [], this);
    }

    animateBoneBoxCarOut() {
        // 添加抬骨灰盒车
        this.boneBoxCarOut = this.add.image(this.centerX + 1200, this.centerY, 'bone-box-car').setScale(0.5).setDepth(1);

        // 创建移动和放大的动画（向左移动并逐渐放大）
        this.tweens.add({
            targets: this.boneBoxCarOut,
            x: this.centerX - 10,
            y: this.centerY + 10,
            scale: 1,
            duration: 4000,
            ease: 'Power2',
            onComplete: () => {
                // 关闭火炉门
                this.closeFurnaceDoorSequence();
            }
        });


    }

    closeFurnaceDoorSequence() {
        // 定义门关闭的顺序图片
        const doorSequence = ['bg-half', 'bg-closed'];
        let currentStep = 0;

        // 创建一个定时事件来切换门的状态
        this.time.addEvent({
            delay: 1000, // 每0.5秒切换一次
            repeat: doorSequence.length,
            callback: () => {
                if (currentStep < doorSequence.length) {
                    this.background.setTexture(doorSequence[currentStep]);
                    currentStep++;
                }
            },
            callbackScope: this
        });

        // 在门完全关闭后显示骨灰盒交互
        this.time.delayedCall(doorSequence.length * 1200, () => {
            // this.boneBoxCarOut.destroy();
            this.setupBoneBoxInteraction();
        }, [], this);
    }

    setupBoneBoxInteraction() {
        // 添加骨灰盒的交互
        // 添加骨灰盒但初始为隐藏状态
        this.boneBox = this.add.image(this.centerX - 95, this.centerY + 186, 'bone-box');
        this.boneBox.setScale(1).setAlpha(1).setDepth(2);


        // 定义对话内容队列
        this.dialogQueue = [
            { speaker: '死者家属', text: 'Family of the departed:  [Receiving the urn] Okay, thank you!', dialogKey: 'dialog-user' },
            { speaker: 'Atropos’', text: '[Meowing] Go, go help people with sea burials!', dialogKey: 'dialog-user' },
            { speaker: '人', text: 'I see you wrote that you choose sea burial, now come with us and step onto our funeral home ship, lets help you!', dialogKey: 'dialog-user' },
            { speaker: '死者家属', text: 'Ok', dialogKey: 'dialog-user' },
        ];

        // 创建对话管理器，并在对话结束时淡出场景
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.boneBox.setInteractive();
                this.boneBox.on('pointerover', () => {
                    this.tweens.add({
                        targets: this.boneBox,
                        scale: 1.1,
                        duration: 200,
                        ease: 'Power2',
                    });
                });

                // 鼠标移出事件
                this.boneBox.on('pointerout', () => {
                    this.tweens.add({
                        targets: this.boneBox,
                        scale: 1,
                        duration: 200,
                        ease: 'Power2',
                    });
                });

                this.boneBox.on('pointerdown', () => {
                    this.tweens.add({
                        targets: this.boneBox,
                        scale: 2,
                        alpha: 1,
                        duration: 1000,
                        ease: 'Power2',
                        onComplete: () => {
                            this.tweens.add({
                                targets: this.boneBox,
                                scale: 4,
                                alpha: 0,
                                duration: 1000,
                                ease: 'Power2',
                                onComplete: () => {
                                    this.boneBox.destroy();
                                    this.fadeOutScene();
                                }

                            })
                        }
                    });

                });

            }
        });

        // 开始对话
        this.dialogManager.start();
    }



    fadeOutScene() {
        // 逐渐黑屏
        const wightScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0xffffff)
            .setOrigin(0, 0).setDepth(4);
        wightScreen.alpha = 0;

        this.tweens.add({
            targets: wightScreen,
            alpha: 1,
            duration: 2000,
            onComplete: () => {
                // 切换到下一个场景（例如 Scene9）
                this.scene.start('Scene9');
            }
        });
    }
}
