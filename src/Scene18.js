// src/Scene18.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

class Scene18 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene18' });
    }

    preload() {

        this.load.image('16-oa-殡仪馆门口', 'assets/images/16-oa-殡仪馆门口.png');
        this.load.image('18-al-录取通知书', 'assets/images/18-al-录取通知书.png');


        // 对话框
        this.load.image('dialog-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('dialog-user', 'assets/images/4-db-对话框-人.png');


    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;


        // 添加背景
        this.background = this.add.image(this.centerX, this.centerY, '16-oa-殡仪馆门口');

        // 用户互动标志位
        this.isActedCorrectly = false;

        // 定义对话内容队列
        this.dialogQueue = [
            {
                speaker: '猫',
                text: ' You are here?',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: 'I am here, boss.',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: 'Congratulations, you ve been hired.',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: '！！！',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: 'Really?! Thank you, boss!',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: ' There is no need to thank me. Your performance impressed me. I can see the responsibility and belief of a mortician in you. So, keep it up in your future work.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&click": "18-al", "destroy": '18-al' }],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Being a mortician is a interesting job. We encounter different stories of death, continually bringing life back to those cold and giving them eternal beauty. This requires calmness, precision, and a gentle heart as we bid farewell to the departed at the moment of separation. So, continue on with a respectful heart.',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: 'Got it. [muttering] Wasn t that part from the movie about morticians, Departures…',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: 'I know! I forgot the lines, so I borrowed a little.Okay?',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: 'No problem, boss!',
                dialogKey: 'dialog-user',
            },
        ];





        this.items = [
            // 录取通知书
            {
                key: '18-al',
                imageKey: '18-al-录取通知书',
                x: 0,
                y: 0,
                targetOffsetX: 0,    // 相对于角色的水平偏移量
                targetOffsetY: 0     // 相对于角色的垂直偏移量
            },
        ];



        this.transitionManager = new TransitionManager(this);

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.transitionManager.fadeOut({
                    onComplete: () => {
                        // 切换到下一个场景
                        this.scene.start('Scene1');
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
                case 'show&click':
                    this.addClickable(key)
                    isNeedAct = true;
                    break;
                case 'destroy':
                    this[key].destroy();
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



    // 指向某个物品（例如，显示箭头或高亮）
    addClickable(key) {
        const item = this.items.find(item => item.key === key);
        const clickableItem = this[item.key] ? this[item.key] : this.showItem(item.key);
        if (clickableItem) {// 鼠标悬停事件
            clickableItem.on('pointerover', () => {
                this.tweens.add({
                    targets: clickableItem,
                    scale: 1.0,
                    duration: 200,
                    ease: 'Power2',
                });
            });

            // 鼠标移出事件
            clickableItem.on('pointerout', () => {
                this.tweens.add({
                    targets: clickableItem,
                    scale: 0.8,
                    duration: 200,
                    ease: 'Power2',
                });
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
                    }
                });
            });
            console.log(`item ${item.imageKey} are Clickable.`);
        }
    }
}

export default Scene18;