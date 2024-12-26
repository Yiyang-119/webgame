// src/Scene17.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

class Scene17 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene17' });
    }

    preload() {

        // 化妆床背景
        this.load.image('17-bce-背景墓园', 'assets/images/17-bce-背景墓园.png');
        this.load.image('17-en-信封', 'assets/images/17-en-信封.png');
        this.load.image('17-en2-内容页', 'assets/images/17-en2-内容页.png');


        // 对话框
        this.load.image('dialog-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('dialog-user', 'assets/images/4-db-对话框-人.png');
    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;


        // 添加背景
        this.background = this.add.image(this.centerX, this.centerY, '17-bce-背景墓园');

        // 初始化对话索引
        this.dialogIndex = 0;

        // 用户互动标志位
        this.isActedCorrectly = false;

        // 定义对话内容队列
        this.dialogQueue = [
            {
                speaker: '人',
                text: '（好美的地方）',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: '那可不，专门挑选了一个最美的地方当墓园，这附近什么都不缺',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: '老板厉害',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: '死者家属:【手指一个空旷的地方】是在这里吗',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: '是的',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: '死者家属:好的',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: '【死者家属:哽咽】禾禾她....是一个很棒的孩子，我记得她小的时候软软的喊我妈妈......那个时候，是几岁的时候？',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: '死者家属:【沉默一会】大概七岁吧......',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: '死者家属:【苦笑】我一直期待着，她长大了是什么样子，会不会穿着长长的裙子，手里抱着最喜欢的娃娃，在成人礼那年跟我们说着自己对于未来的幻想和期待......我和她爸爸，一直这么想着。可是谁也没有料到，她会在15岁那天，跟我去医院那天，确诊成癌症......我们以为......她可以永远快乐长大，没想到连这个都成为了奢求......',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '旁白',
                text: '（远处传来急促的奔跑声，众人回头）',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '医生',
                text: '禾禾妈妈！',
                dialogKey: 'dialog-doctor',
            },
            {
                speaker: '死者家属',
                text: '死者家属:【疑惑】杨医生？您怎么在这里',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '医生',
                text: '【着急】我以为明天才是她的下葬时间，差点错过了！这里有一封信，是禾禾让我们在下葬当天交给您的，这里面，有她想对您们说的话',
                dialogKey: 'dialog-doctor',
            },
            {
                speaker: '死者家属',
                text: '死者家属:【接过信封】！',
                dialogKey: 'dialog-user',
                trigger: [{ "show&click": "17-en" }, { "show&click": "17-en2", "destroy": ["17-en", "17-en2"] },],
                displayDuration: 2000
            },
            {
                speaker: '死者家属',
                text: '死者家属:【哭】禾禾，爸爸妈妈答应你！',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: '（呜呜呜呜呜呜）',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: '【喵】呜呜呜呜呜呜',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '旁白',
                text: '（大家一起哭了一会）',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: '死者家属:下葬吧，我们想让她早一点去她想的那个美好世界',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: '【哽咽】好的',
                dialogKey: 'dialog-user',
            },
        ];





        this.items = [
            // 信封
            {
                key: '17-en',
                imageKey: '17-en-信封',
                x: 0,
                y: 0,
                targetOffsetX: 0,    // 相对于角色的水平偏移量
                targetOffsetY: 0     // 相对于角色的垂直偏移量
            },// 内容页
            {
                key: '17-en2',
                imageKey: '17-en2-内容页',
                x: 0,
                y: 0,
                targetOffsetX: 0,    // 相对于角色的水平偏移量
                targetOffsetY: 0     // 相对于角色的垂直偏移量
            }
        ];


        this.transitionManager = new TransitionManager(this);

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.transitionManager.fadeOut({
                    onComplete: () => {
                        // 切换到下一个场景
                        this.scene.start('Scene2');
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
                    this[key[0]].destroy();
                    this[key[1]].destroy();
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

export default Scene17;