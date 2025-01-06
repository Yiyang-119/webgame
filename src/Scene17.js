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
                text: ' (What a beautiful place.)',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: 'Of course, we picked the most beautiful spot for the cemetery. This place has everything you need.',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: 'You are impressive, boss.',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed: [Pointing to an open area] Is it here?',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: 'Yes, right here.',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed: Okay.',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed:[Choking up] Wanhe, she... she was such a wonderful child. I remember when she was little, she d call me "Mommy" in that soft voice... how old was she back then?',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed:[Pauses] About seven, I think...',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed: [Bitter smile] I always wondered what she would be like growing up. Would she wear long dresses, carry her favourite doll, and discuss her dreams and hopes during her coming-of-age ceremony... Her dad and I always thought about that. But no one expected that on her 15th birthday, the day we went to the hospital... she was diagnosed with cancer... We thought... she d grow up happy forever. Never thought even that would become a luxury...',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '旁白',
                text: '（In the distance, hurried footsteps can be heard. Everyone turns around.）',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '医生',
                text: 'Mom of Wanhe',
                dialogKey: 'dialog-doctor',
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed:[Confused] "Dr. Yang? What are you doing here?',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '医生',
                text: '[Urgently] "I thought her burial was tomorrow! I almost missed it! Heres a letter. Wanhe wanted me to give it to you on the day of her burial. It contains things she wanted to say to you."',
                dialogKey: 'dialog-doctor',
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed:  [Takes the envelope] ！',
                dialogKey: 'dialog-user',
                trigger: [{ "show&click": "17-en" }, { "show&click": "17-en2", "destroy": ["17-en", "17-en2"] },],
                displayDuration: 2000
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed: 死者家属: [Crying] Wanhe, Mom and Dad promise you!',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: '（crying,crying,crying）',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: '(crying,crying,crying)',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '旁白',
                text: '(Everyone cries together for a moment.)',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '死者家属',
                text: 'Family of the departed: Lets bury her. We want her to go to the beautiful world shes dreamed of as soon as possible.',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '人',
                text: ' [Choking up] Okay.',
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
                        this.scene.start('Scene18');
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