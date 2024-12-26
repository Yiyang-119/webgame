// src/Scene16.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

class Scene16 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene16' });
    }

    preload() {

        this.load.image('16-lf2-布置葬礼仪式的地方2', 'assets/images/16-lf2-布置葬礼仪式的地方2.png');

        this.load.image('16-ll-灯左', 'assets/images/16-ll-灯左.png');
        this.load.image('16-lr-灯右', 'assets/images/16-lr-灯右.png');

        this.load.image('16-o1-祭品1', 'assets/images/16-o1-祭品1.png');
        this.load.image('16-o4-祭品4', 'assets/images/16-o4-祭品4.png');
        this.load.image('16-o2-祭品2', 'assets/images/16-o2-祭品2.png');
        this.load.image('16-o5-祭品5', 'assets/images/16-o5-祭品5.png');
        this.load.image('16-o3-祭品3', 'assets/images/16-o3-祭品3.png');
        this.load.image('16-o6-祭品6', 'assets/images/16-o6-祭品6.png');
        this.load.image('16-s-选项框（屏幕下方）', 'assets/images/16-s-选项框（屏幕下方）.png');

        this.load.image('16-sc1-选项框内棺材1', 'assets/images/16-sc1-选项框内棺材1.png');
        this.load.image('16-sc2-选项框内棺材2', 'assets/images/16-sc2-选项框内棺材2.png');
        this.load.image('16-sc3-选项框内棺材3', 'assets/images/16-sc3-选项框内棺材3.png');

        this.load.image('16-bc1-背景棺材1', 'assets/images/16-bc1-背景棺材1.png');
        this.load.image('16-bc2-背景棺材2', 'assets/images/16-bc2-背景棺材2.png');
        this.load.image('16-bc3-背景棺材3', 'assets/images/16-bc3-背景棺材3.png');

        this.load.image('16-oa-殡仪馆门口', 'assets/images/16-oa-殡仪馆门口.png');


        // 对话框
        this.load.image('dialog-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('dialog-user', 'assets/images/4-db-对话框-人.png');
    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;


        // 添加背景
        this.background = this.add.image(this.centerX, this.centerY, '16-lf2-布置葬礼仪式的地方2');

        // 用户互动标志位
        this.isActedCorrectly = false;

        // 定义对话内容队列
        this.dialogQueue = [
            {
                speaker: '猫',
                text: '这里是殡仪馆的厅2适用于祭拜的地方',
                dialogKey: 'dialog-cat',
            }, {
                speaker: '猫',
                text: '现在，让我们先设计一下棺材吧',
                dialogKey: 'dialog-cat',
                trigger: [{ "show": "16-s" }, { "show&click": ["16-sc1", "16-bc1"] }, { "show&click": ["16-sc2", "16-bc2"] }, { "show&click": ["16-sc3", "16-bc3"] }],
                displayDuration: 2000
            }
        ];

        this.items = [
            // 灯左
            {
                key: '16-ll',
                imageKey: '16-ll-灯左',
                x: -200,
                y: -100,
                targetOffsetX: -50,  // 灯左相对于目标的水平偏移量
                targetOffsetY: -100 // 灯左相对于目标的垂直偏移量
            },

            // 灯右
            {
                key: '16-lr',
                imageKey: '16-lr-灯右',
                x: 200,
                y: -100,
                targetOffsetX: 50,   // 灯右相对于目标的水平偏移量
                targetOffsetY: -100 // 灯右相对于目标的垂直偏移量
            },

            // 祭品1
            {
                key: '16-o1',
                imageKey: '16-o1-祭品1',
                x: -300,
                y: 200,
                targetOffsetX: 0,    // 祭品1相对于目标的水平偏移量
                targetOffsetY: 50    // 祭品1相对于目标的垂直偏移量
            },

            // 祭品4
            {
                key: '16-o4',
                imageKey: '16-o4-祭品4',
                x: 300,
                y: 200,
                targetOffsetX: 0,    // 祭品4相对于目标的水平偏移量
                targetOffsetY: 50    // 祭品4相对于目标的垂直偏移量
            },

            // 祭品2
            {
                key: '16-o2',
                imageKey: '16-o2-祭品2',
                x: -200,
                y: 250,
                targetOffsetX: -30,  // 祭品2相对于目标的水平偏移量
                targetOffsetY: 50    // 祭品2相对于目标的垂直偏移量
            },

            // 祭品5
            {
                key: '16-o5',
                imageKey: '16-o5-祭品5',
                x: 200,
                y: 250,
                targetOffsetX: 30,   // 祭品5相对于目标的水平偏移量
                targetOffsetY: 50    // 祭品5相对于目标的垂直偏移量
            },

            // 祭品3
            {
                key: '16-o3',
                imageKey: '16-o3-祭品3',
                x: -100,
                y: 300,
                targetOffsetX: -20,  // 祭品3相对于目标的水平偏移量
                targetOffsetY: 50    // 祭品3相对于目标的垂直偏移量
            },

            // 祭品6
            {
                key: '16-o6',
                imageKey: '16-o6-祭品6',
                x: 100,
                y: 300,
                targetOffsetX: 20,   // 祭品6相对于目标的水平偏移量
                targetOffsetY: 50    // 祭品6相对于目标的垂直偏移量
            },

            // 选项框（屏幕下方）
            {
                key: '16-s',
                imageKey: '16-s-选项框（屏幕下方）',
                x: 0,
                y: 500,
                targetOffsetX: 0,    // 相对于屏幕底部中心
                targetOffsetY: 0     // 不需要额外偏移量
            },

            // 选项框内棺材1
            {
                key: '16-sc1',
                imageKey: '16-sc1-选项框内棺材1',
                x: -300,
                y: 450,
                targetOffsetX: 0,    // 相对于选项框的水平偏移量
                targetOffsetY: 0     // 相对于选项框的垂直偏移量
            },

            // 选项框内棺材2
            {
                key: '16-sc2',
                imageKey: '16-sc2-选项框内棺材2',
                x: 0,
                y: 450,
                targetOffsetX: 0,    // 相对于选项框的水平偏移量
                targetOffsetY: 0     // 相对于选项框的垂直偏移量
            },

            // 选项框内棺材3
            {
                key: '16-sc3',
                imageKey: '16-sc3-选项框内棺材3',
                x: 300,
                y: 450,
                targetOffsetX: 0,    // 相对于选项框的水平偏移量
                targetOffsetY: 0     // 相对于选项框的垂直偏移量
            }
        ];



        // 初始化 backgrounds 数组
        // 初始化 backgrounds 数组
        this.backgrounds = [
            {
                key: '16-bc1',
                imageKey: '16-bc1-背景棺材1'
            },
            {
                key: '16-bc2',
                imageKey: '16-bc2-背景棺材2'
            },
            {
                key: '16-bc3',
                imageKey: '16-bc3-背景棺材3'
            }, {
                key: '16-oa',
                imageKey: '16-oa-殡仪馆门口'
            },
        ];



        this.transitionManager = new TransitionManager(this);

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.transitionManager.fadeOut({
                    onComplete: () => {
                        this.secondDialog();
                    }
                });
            }
        });

        // 开始对话
        this.transitionManager.fadeIn({
            onComplete: () => {
                this.dialogManager.start();
            }
        });
    }

    // 处理触发器
    async handleTrigger(trigger) {
        for (const [action, key] of Object.entries(trigger)) {

            let isNeedAct = false;

            switch (action) {
                case 'show':
                    this.showItem(key);
                    break;
                case 'show&drag':
                    this.makeDraggable(key)
                    isNeedAct = true;
                    break;
                case 'show&click':
                    this.addClickable(key)
                    isNeedAct = key[0] == "16-sc3" ? true : false;
                    break;
                case 'bg-switch':
                    this.tile_replace("background", "backgrounds", key);
                    break;
                case 'passSwitch':
                    this.tile_replace("girl", "characterImages", key);
                    break;
                case "itemSwitch":
                    this.tile_replace("15-ebc", items, key);
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
                console.log(`img ${item.imageKey} has added. pos: (${this.centerX + item.x}, ${this.centerY + item.y})`);
            } else {
                this[item.key].setVisible(true);
            }
            console.log(`img ${key} has shown.`);
            return this[item.key];
        } else {
            console.warn(`未找到物品: ${item.imageKey}`);
        }
    }

    // 更换背景或者物品贴图
    async tile_replace(objKey, tileLib, tileKey) {
        if (tileLib == "backgrounds") { await new Promise(resolve => setTimeout(resolve, 1000)); }
        const tile = this[tileLib].find(tile => tile.key === tileKey);
        if (tile && this[objKey]) {
            // 更改 this.theDead 的纹理为 imgKey
            this[objKey].setTexture(tile.imageKey);
            console.log(`obj ${objKey} replaced ${tile.imageKey} tile.`);
        } else {
            console.warn(`无法更改物品: ${objKey},${tileKey}`);
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



    // 指向某个物品（例如，显示箭头或高亮）
    addClickable(custom_para) {

        const key = custom_para[0];
        const bg_key = custom_para[1];
        const item = this.items.find(item => item.key === key);
        const clickableItem = this[item.key] ? this[item.key] : this.showItem(item.key);
        if (clickableItem) {// 鼠标悬停事件
            clickableItem.on('pointerover', () => {
                this.tweens.add({
                    targets: clickableItem,
                    scale: 1.1,
                    duration: 200,
                    ease: 'Power2',
                });
                this.tile_replace("background", "backgrounds", bg_key);
            });

            // 鼠标移出事件
            clickableItem.on('pointerout', () => {
                this.tweens.add({
                    targets: clickableItem,
                    scale: 1.0,
                    duration: 200,
                    ease: 'Power2',
                });
                this.tile_replace("background", "backgrounds", "16-lf2");
            });

            // 鼠标点击事件
            clickableItem.on('pointerdown', () => {
                // 创建点击效果，例如按钮缩小
                this.tweens.add({
                    targets: clickableItem,
                    scale: 0.7,
                    duration: 100,
                    yoyo: true,
                    ease: 'Power2',
                    onComplete: () => {
                        this.isActedCorrectly = true;
                        this.tile_replace("background", "backgrounds", bg_key);
                        this["16-sc1"].destroy();
                        this["16-sc2"].destroy();
                        this["16-sc3"].destroy();
                        this["16-s"].destroy();

                        this.time.delayedCall(2000, () => {
                            this.secondDialog();
                        });
                    }
                });
            });
            console.log(`item ${item.imageKey} are Clickable.`);
        }
    }

    secondDialog() {
        console.log("Second Dialog")

        // 定义对话内容队列
        this.secondDialogQueue = [
            {
                speaker: '猫',
                text: '最后，将祭拜的东西放在桌上',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "16-o1" }, { "show&drag": "16-o2" }, { "show&drag": "16-o3" }, { "show&drag": "16-o4" }, { "show&drag": "16-o5" }, { "show&drag": "16-o6" },],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: '很棒!这一次我对你刮目相看了',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: '！！！',
                dialogKey: 'dialog-user',
            }, {
                speaker: '人',
                text: '老板，你忽然好善良',
                dialogKey: 'dialog-user',
            }, {
                speaker: '猫',
                text: '【喵】哼',
                dialogKey: 'dialog-cat',
            }, {
                speaker: '猫',
                text: '等结束完仪式，咱们去火葬馆陪死者家属走接下来的仪式？',
                dialogKey: 'dialog-cat',
            }
        ];

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.secondDialogManager = new DialogManager(this, {
            dialogQueue: this.secondDialogQueue,
            onComplete: () => {
                this["16-o1"].destroy();
                this["16-o2"].destroy();
                this["16-o3"].destroy();
                this["16-o4"].destroy();
                this["16-o5"].destroy();
                this["16-o6"].destroy();

                this.transitionManager.fadeOut({
                    onComplete: () => {

                        // 创建一个全屏的纯黑背景
                        const blackBackground = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
                            .setOrigin(0, 0);

                        // 定义要显示的文字内容
                        const fullText = '几天过去......';
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
                                                        this.background = this.add.image(this.centerX, this.centerY, '16-oa');
                                                        this.thirdDialog();
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
                this.secondDialogManager.start();
            }
        });
    }

    thirdDialog() {
        console.log("third Dialog")

        // 定义对话内容队列
        this.thirdDialogQueue = [

            {
                speaker: '猫',
                text: '走，咱们出发',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: '好......诶？',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:你们好',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: '【困惑】您好，您手里这是？',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:【拿着骨灰盒】不好意思，昨天您不在，我们找到殡仪馆其他人，带她去火化了',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: '哪有哪有？您应该提前跟我说的，按理来讲是我带着您去的',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:没事的 主要是我们找到大师算了，今天最适宜下葬，太着急忘记和您打电话了',
                dialogKey: 'dialog-user',
            }, {
                speaker: '人',
                text: '理解，那现在我们直接出发去墓园土葬吧',
                dialogKey: 'dialog-user',
            }, {
                speaker: '死者家属',
                text: '死者家属:好的，咱们走',
                dialogKey: 'dialog-user',
            },
        ];

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.thirdDialogManager = new DialogManager(this, {
            dialogQueue: this.thirdDialogQueue,
            onComplete: () => {
                this.transitionManager.fadeOut();
                this.scene.start('Scene17');
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

export default Scene16;