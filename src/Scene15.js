// src/Scene15.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

class Scene15 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene15' });
    }

    preload() {


        // 蛋糕系列
        this.load.image('15-c1', 'assets/images/15-c1-蛋糕1.png');
        this.load.image('15-c2', 'assets/images/15-c2-蛋糕2.png');
        this.load.image('15-c3', 'assets/images/15-c3-蛋糕3.png');
        this.load.image('15-c4', 'assets/images/15-c4-蛋糕4.png');
        this.load.image('15-c5', 'assets/images/15-c5-蛋糕5.png');

        // 葬礼仪式布置图
        this.load.image('15-lf', 'assets/images/15-lf-布置葬礼仪式的地方.png');

        // 对话框
        this.load.image('dialog-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('dialog-user', 'assets/images/4-db-对话框-人.png');

    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;


        // 添加背景
        this.background = this.add.image(this.centerX, this.centerY, '15-lf');

        // 用户互动标志位
        this.isActedCorrectly = false;

        // 定义对话内容队列
        this.dialogQueue = [

            {
                speaker: '死者家属',
                text: '死者家属:你们好！',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: '你好，我是Atropos殡仪馆的工作人员！我们昨晚已经给叶晚禾画好妆了，穿好寿衣了。现在，我们该给孩子进行葬礼风格的确定以及布置，请问您这边有什么对于葬礼的要求吗？',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:好的，谢谢您。葬礼的风格......',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:【沉思片刻】请打扮成甜品主题的吧',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:禾禾她去世之前一直在忌甜品......但是她其实特别爱吃甜的',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:【苦笑】还是小孩子啊 ......',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: '好的',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:【哭泣】她特别喜欢粉色，请帮她将葬礼的颜色整体装扮成粉色......哦对，如果可以的话，哪些常用的祭拜物品也请弄成甜品风格的',
                dialogKey: 'dialog-user',
            }, {
                speaker: '人',
                text: '好的，也请您节哀，我们一定会让禾禾在天之力灵满意的',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: '【喵】是啊',
                dialogKey: 'dialog-cat',

            }, {
                speaker: '死者家属',
                text: '死者家属:【停止哭泣】谢谢您们，那我交给您了',
                dialogKey: 'dialog-user',
            }, {
                speaker: '人',
                text: '好的，请放心',
                dialogKey: 'dialog-user',
            },
        ];





        this.items = [
            {
                key: '15-c1',
                imageKey: '15-c1',
                x: -500,
                y: -200,
                targetOffsetX: -300,    // 相对于角色的水平偏移量
                targetOffsetY: -300     // 相对于角色的垂直偏移量
            }, {
                key: '15-c2',
                imageKey: '15-c2',
                x: -500,
                y: 500,
                targetOffsetX: -100,    // 相对于角色的水平偏移量
                targetOffsetY: -100     // 相对于角色的垂直偏移量
            },
            {
                key: '15-c3',
                imageKey: '15-c3',
                x: 0,
                y: 500,
                targetOffsetX: 100,    // 相对于角色的水平偏移量
                targetOffsetY: -250     // 相对于角色的垂直偏移量
            },
            {
                key: '15-c4',
                imageKey: '15-c4',
                x: 500,
                y: 500,
                targetOffsetX: 100,    // 相对于角色的水平偏移量
                targetOffsetY: -75     // 相对于角色的垂直偏移量
            },
            {
                key: '15-c5',
                imageKey: '15-c5',
                x: 500,
                y: -200,
                targetOffsetX: 200,    // 相对于角色的水平偏移量
                targetOffsetY: -200     // 相对于角色的垂直偏移量
            },
        ];



        this.transitionManager = new TransitionManager(this);

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.transitionManager.fadeOut({
                    onComplete: () => {

                        // 创建一个全屏的纯黑背景
                        const blackBackground = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
                            .setOrigin(0, 0);

                        // 定义要显示的文字内容
                        const fullText = '第二天早上......';
                        let currentText = '';

                        // 在屏幕中心添加文字对象，初始内容为空，透明度为 0
                        const introText = this.add.text(this.centerX, this.centerY, '', {
                            fontSize: '64px',
                            color: '#ffffff',
                            fontStyle: 'bold',
                            align: 'center',
                            wordWrap: { width: this.cameras.main.width - 100, useAdvancedWrap: true }
                        }).setOrigin(0.5);
                        introText.alpha = 0;

                        // 文字淡入（同时开始打字机效果）
                        this.tweens.add({
                            targets: introText,
                            alpha: 1,
                            duration: 500, // 0.5 秒
                            onComplete: () => {
                                // 开始打字机效果
                                let charIndex = 0;
                                const typingSpeed = 100; // 每个字符的间隔（毫秒）

                                this.time.addEvent({
                                    delay: typingSpeed,
                                    callback: () => {
                                        currentText += fullText[charIndex];
                                        introText.setText(currentText);
                                        charIndex++;
                                        console.log("Info: ", charIndex, fullText.length)
                                        if (charIndex === fullText.length) {
                                            // 文字显示完成，延迟后开始淡出
                                            this.time.delayedCall(2000, () => {
                                                // 文字淡出
                                                this.tweens.add({
                                                    targets: introText,
                                                    alpha: 0,
                                                    duration: 1000,
                                                    onComplete: () => {
                                                        // 切换到下一个对话
                                                        blackBackground.destroy();
                                                        this.background = this.add.image(this.centerX, this.centerY, '15-lf');
                                                        this.secondDialog();
                                                    }
                                                });
                                            });
                                        }
                                    },
                                    repeat: fullText.length - 1
                                });
                            }
                        });
                    }
                });
            }
        });

        // 开始对话
        this.transitionManager.fadeIn({
            onComplete: () => {
                // this.dialogManager.start();
                this.secondDialog()
            }
        });
    }


    secondDialog() {
        console.log("Second Dialog")

        // 定义对话内容队列
        this.secondDialogQueue = [

            {
                speaker: '猫',
                text: '你来了，现在我们开始布置吧',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: '诶？这么快',
                dialogKey: 'dialog-user',
            }, {
                speaker: '猫',
                text: '没错，这次的葬礼风格比较特别，所以需要提前准备，我之前已经让人买好了相关的物品，开始吧',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: '好的',
                dialogKey: 'dialog-user',
            }, {
                speaker: '猫',
                text: '首先 先从这里开始吧，看到你面前的桌子了吗？',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: '看到了',
                dialogKey: 'dialog-user',
            }, {
                speaker: '猫',
                text: '这是给孩子准备的贡品桌子，现在请帮她设计一下摆放风格，好好装饰吧',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "15-c1" }, { "show&drag": "15-c2" }, { "show&drag": "15-c3" }, { "show&drag": "15-c4" }, { "show&drag": "15-c5" },],
                displayDuration: 2000
            }
        ];

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.secondDialogManager = new DialogManager(this, {
            dialogQueue: this.secondDialogQueue,
            onComplete: () => {
                this.thirdDialog();
            }
        });

        // 开始对话
        this.transitionManager.fadeIn({
            onComplete: () => {
                this.secondDialogManager.start();
            }
        });
    }

    // 处理触发器
    async handleTrigger(trigger) {
        for (const [action, key] of Object.entries(trigger)) {

            let isNeedAct = false;
            switch (action) {
                case 'show&drag':
                    this.makeDraggable(key)
                    isNeedAct = true;
                    break;
                default:
                    console.warn(`未知的触发器动作: ${singleAction}`);
            }

            if (isNeedAct) {
                // 等待用户拖拽或点击判定
                this.isActedCorrectly = false;
                while (!this.isActedCorrectly) {
                    await new Promise(resolve => setTimeout(resolve, 100));
                }
                this.isActedCorrectly = false;
            }

            console.log(`Trigger ${trigger} completed.`);
        };
        console.log(`All triggers completed.`);
        return true;
    }

    // 显示物品
    showItem(key) {
        const item = this.items.find(item => item.key === key);
        if (item) {
            if (!this[item.key]) { // 如果物品尚未被添加到场景中
                this[item.key] = this.add.image(this.centerX + item.x, this.centerY + item.y, item.imageKey).setInteractive().setDepth(2);
                console.log(`img ${item.imageKey} has added. pos: (${this.centerX + item.x}, ${this.centerY + item.y})`);;
            } else {
                this[item.key].setVisible(true);
            }
            console.log(`img ${key} has shown.`);
            return this[item.key];
        } else {
            console.warn(`未找到物品: ${item.imageKey}`);
        }
    }

    // 使物品可拖拽，并在成功拖拽后更改纹理
    makeDraggable(key) {
        const item = this.items.find(item => item.key === key);
        const draggableItem = this[item.key] ? this[item.key] : this.showItem(item.key);

        if (item && draggableItem) {
            draggableItem.setInteractive();
            this.input.setDraggable(draggableItem);

            // 实现闪烁效果（渐变变白）
            const blinkTween = this.tweens.add({
                targets: draggableItem,
                alpha: { from: 1, to: 0.7 },
                duration: 500,
                yoyo: true,  // 往返闪烁
                repeat: -1,  // 无限次重复
                ease: 'Sine.easeInOut'
            });

            draggableItem.on('dragstart', () => {
                draggableItem.setTint(0xaaaaaa); // 拖拽时改变颜色
            });

            draggableItem.on('drag', (pointer, dragX, dragY) => {
                draggableItem.x = dragX;
                draggableItem.y = dragY;
            });

            draggableItem.on('dragend', (pointer, dropped) => {
                draggableItem.clearTint();

                // 定义拖拽成功的目标区域，这些值需要根据实际需求调整
                // 例如，假设要拖拽到人物头部区域
                let targetX = this.centerX + item.targetOffsetX;
                let targetY = this.centerX + item.targetOffsetY; // 人物头部的y坐标
                let distance = Phaser.Math.Distance.Between(draggableItem.x, draggableItem.y, targetX, targetY);

                if (distance < 400) { // 拖拽成功
                    this.isActedCorrectly = true;
                    // draggableItem.destroy(); // 拖拽成功后移除物品
                    // delete this[item.key];
                    // 如果有放到正确的位置
                    this.tweens.add({
                        targets: draggableItem,
                        x: this.centerX + item.targetOffsetX,
                        y: this.centerX + item.targetOffsetY,
                        duration: 500,
                        ease: 'Sine.easeInOut'
                    });
                    blinkTween.stop();
                    draggableItem.disableInteractive();
                } else {
                    // 如果没有放到正确的位置，物品归位
                    this.tweens.add({
                        targets: draggableItem,
                        x: this.centerX + item.x,
                        y: this.centerY + item.y,
                        duration: 500,
                        ease: 'Sine.easeInOut'
                    });
                }
            });
            console.log(`item ${item.imageKey} are Draggable.`);
        } else {
            console.warn(`无法使物品拖拽: ${key}`);
        }
    }


    thirdDialog() {
        console.log("Third Dialog")

        // 定义对话内容队列
        this.thirdDialogQueue = [

            {
                speaker: '猫',
                text: '做的不错，现在请打开右手边的门，咱们去下一个厅吧',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '旁白',
                text: '点击右手边的门把手',
                dialogKey: 'dialog-user',
            }
        ];

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.thirdDialogManager = new DialogManager(this, {
            dialogQueue: this.thirdDialogQueue,
            onComplete: () => {
                this.transitionManager.fadeOut({
                    onComplete: () => {
                        // 切换到下一个场景
                        this.scene.start('Scene16');
                    }
                })
            }
        });

        // 开始对话
        this.transitionManager.fadeIn({
            onComplete: () => {
                this.thirdDialogManager.start();
            }
        });
    }

}

export default Scene15;