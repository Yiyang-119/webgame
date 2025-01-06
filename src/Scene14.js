// src/Scene14.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

class Scene14 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene14' });
    }

    preload() {

        // 化妆床背景
        this.load.image('14-bed-化妆床背景', 'assets/images/14-bed-化妆床背景.png');
        this.load.image('14-bedb1-化妆床背景放大版1', 'assets/images/14-bedb1-化妆床背景放大版1.png');
        this.load.image('14-bedb2-化妆床背景放大版2', 'assets/images/14-bedb2-化妆床背景放大版2.png');
        this.load.image('14-bedb3-化妆床背景放大版3', 'assets/images/14-bedb3-化妆床背景放大版3.png');

        // 对话框
        this.load.image('dialog-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('dialog-user', 'assets/images/4-db-对话框-人.png');

        // 人物图像
        this.load.image('14-gnh-人没头发', 'assets/images/14-gnh-人没头发.png');
        this.load.image('14-ghh-人有头发', 'assets/images/14-ghh-人有头发.png');
        this.load.image('14-gnm-人没化妆', 'assets/images/14-gnm-人没化妆.png');
        this.load.image('14-gb-人放大', 'assets/images/14-gb-人放大.png');
        this.load.image('14-gb-人腮红', 'assets/images/14-gb-人腮红.png');
        this.load.image('14-gb2-人放大2', 'assets/images/14-gb2-人放大2.png');
        this.load.image('14-gpp-人粉扑', 'assets/images/14-gpp-人粉扑.png');
        this.load.image('14-gl-人口红', 'assets/images/14-gl-人口红.png');
        this.load.image('14-wf-人擦完脸', 'assets/images/14-wf-人擦完脸.png');
        this.load.image('14-glf1-人粉底液1', 'assets/images/14-glf1-人粉底液1.png');
        this.load.image('14-glf2-人粉底液2', 'assets/images/14-glf2-人粉底液2.png');
        this.load.image('14-glf3-人粉底液3', 'assets/images/14-glf3-人粉底液3.png');
        this.load.image('14-glfe-人粉底液完', 'assets/images/14-glfe-人粉底液完.png');
        this.load.image('14-ges1-人眼影1', 'assets/images/14-ges1-人眼影1.png');
        this.load.image('14-ges2-人眼影2', 'assets/images/14-ges2-人眼影2.png');
        this.load.image('14-gepel1-人眼线1', 'assets/images/14-gepel1-人眼线1.png');
        this.load.image('14-gepel2-人眼线2', 'assets/images/14-gepel2-人眼线2.png');
        this.load.image('14-gepel3-人眉毛1', 'assets/images/14-gepel3-人眉毛1.png');
        this.load.image('14-gepel4-人眉毛2', 'assets/images/14-gepel4-人眉毛2.png');
        this.load.image('14-gcon1-人遮瑕1', 'assets/images/14-gcon1-人遮瑕1.png');
        this.load.image('14-gcon2-人遮瑕2', 'assets/images/14-gcon2-人遮瑕2.png');
        this.load.image('14-gl-人口红', 'assets/images/14-gl-人口红.png');
        this.load.image('14-gel1-人睫毛1', 'assets/images/14-gel1-人睫毛1.png');
        this.load.image('14-gel2-人睫毛2', 'assets/images/14-gel2-人睫毛2.png');


        // 化妆箱
        this.load.image('14-cb-化妆箱', 'assets/images/14-cb-化妆箱.png');

        // 假发
        this.load.image('14-wig-假发', 'assets/images/14-wig-假发.png');

        // 化妆品
        this.load.image('14-ebc-睫毛盒子关', 'assets/images/14-ebc-睫毛盒子关.png');
        this.load.image('14-ebo-睫毛盒子开', 'assets/images/14-ebo-睫毛盒子开.png');
        this.load.image('14-lf-粉底液', 'assets/images/14-lf-粉底液.png');
        this.load.image('14-epel-眉笔眼线', 'assets/images/14-epel-眉笔眼线.png');
        this.load.image('14-con-遮瑕', 'assets/images/14-con-遮瑕.png');
        this.load.image('14-fa-擦脸巾', 'assets/images/14-fa-擦脸巾.png');
        this.load.image('14-pp-粉扑', 'assets/images/14-pp-粉扑.png');
        this.load.image('14-l-口红', 'assets/images/14-l-口红.png');
        this.load.image('14-b-腮红', 'assets/images/14-b-腮红.png');
        this.load.image('14-es-眼影', 'assets/images/14-es-眼影.png');
        this.load.image('14-er-睫毛右', 'assets/images/14-er-睫毛右.png');
        this.load.image('14-el-睫毛左', 'assets/images/14-el-睫毛左.png');
    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;


        // 添加背景
        this.background = this.add.image(this.centerX, this.centerY, '14-bed-化妆床背景');
        this.girl = this.add.image(this.centerX, this.centerY, '14-gnh-人没头发').setDepth(2);

        // 初始化对话索引
        this.dialogIndex = 0;

        // 用户互动标志位
        this.isActedCorrectly = false;

        // 定义对话内容队列
        this.dialogQueue = [
            {
                speaker: '猫',
                text: 'Open the makeup kit! Lets get started.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show": "14-cb" }],
                displayDuration: 2000
            },
            {
                speaker: '人',
                text: 'So, do we just start with the makeup?？',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: 'Wait, first, lets put on her wig.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-wig", "passSwitch": "14-ghh" }],
                displayDuration: 2000
            },
            {
                speaker: '人',
                text: 'Ok',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: 'Use warm water to gently wipe her face.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-fa", "passSwitch": '14-wf' }, { "bg-switch": "14-bedb1" }, { "passSwitch": "14-gnm" }],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Next, lets begin the makeup.',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '猫',
                text: ' First, take the foundation and apply an even layer to her face. Start with the forehead, then the left cheek, and finally the right cheek.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-lf", "passSwitch": "14-glf1" }, { "show&drag": "14-lf", "passSwitch": "14-glf2" }],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Take the concealer and remove any blemishes on her face.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-con", "passSwitch": "14-gcon1" },],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: ' Now, lets take care of the dark circles.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-con", "passSwitch": "14-gcon2" }],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Good, now lets set the makeup.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-pp", "passSwitch": "14-gpp" }, { "bg-switch": "14-bedb2" }],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Now, lets move on to the colour makeup.',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '猫',
                text: 'First, apply eyeshadow to her eyelids—left side first, then right.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-es", "passSwitch": "14-ges1" }, { "show&drag": "14-es", "passSwitch": "14-ges2" }],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Next, draw the eyeliner and eyebrows. Do the eyeliner first, then apply mascara—again, the left side first, then the right side.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-epel", "passSwitch": "14-gepel1" }, { "show&drag": "14-epel", "passSwitch": "14-gepel2" }, { "show&drag": "14-epel", "passSwitch": "14-gepel3" }, { "show&drag": "14-epel", "passSwitch": "14-gepel4" },],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Dont forget the eyelashes! Use the false lashes and carefully apply them.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show": "14-ebc" },],
                displayDuration: 2000
            },
            {
                speaker: '旁白',
                text: '(Click the box)',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&click": "14-ebc", "itemSwitch": "14-ebo" }, { "show&drag": "14-el", "passSwitch": "14-gel1" }, { "show&drag": "14-er", "passSwitch": "14-gel2" }, { "destroy": "14-ebc" }, { "bg-switch": "14-bedb3" }, { "passSwitch": "14-gb2" }],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Alright, just a bit more. Apply blush to her cheeks, nose, and chin.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-b", "passSwitch": "14-gb1" }],
                displayDuration: 2000
            },
            {
                speaker: '猫',
                text: 'Final step—apply lipstick and wait for a moment.',
                dialogKey: 'dialog-cat',
                trigger: [{ "show&drag": "14-l", "passSwitch": "14-gl" }],
                displayDuration: 2000
            },
            {
                speaker: '人',
                text: 'Done!! She looks so much better now! I guess thats something to be happy about.',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: 'Congratulations! You have successfully completed the makeup task.',
                dialogKey: 'dialog-cat',
                trigger: [{ "destroy": "14-ebc" },],
            },
            {
                speaker: '人',
                text: 'So, whats the next step?',
                dialogKey: 'dialog-user',
            },
            {
                speaker: '猫',
                text: ' Lets head out from here. The family is waiting outside. We need to coordinate the next steps with them.',
                dialogKey: 'dialog-cat',
            },
            {
                speaker: '人',
                text: 'Ok',
                dialogKey: 'dialog-user',
            },
        ];





        this.items = [
            // 化妆箱
            {
                key: '14-cb',
                imageKey: '14-cb-化妆箱',
                x: -900,
                y: -650,
                targetOffsetX: 0,    // 相对于角色的水平偏移量
                targetOffsetY: 0     // 相对于角色的垂直偏移量
            },

            // 假发
            {
                key: '14-wig',
                imageKey: '14-wig-假发',
                x: 800,
                y: -200,
                targetOffsetX: -50,  // 假发放置在角色头部左侧50像素
                targetOffsetY: -100  // 假发放置在角色头部上方100像素
            },

            // 擦脸巾
            {
                key: '14-fa',
                imageKey: '14-fa-擦脸巾',
                x: 800,
                y: -200,
                targetOffsetX: 0,     // 相对于角色的水平偏移量
                targetOffsetY: -80    // 擦脸巾放置在角色脸部上方80像素
            },

            // 粉底液
            {
                key: '14-lf',
                imageKey: '14-lf-粉底液',
                x: 800,
                y: -200,
                targetOffsetX: 0,     // 相对于角色的水平偏移量
                targetOffsetY: -60    // 粉底液放置在角色脸部上方60像素
            },

            // 遮瑕
            {
                key: '14-con',
                imageKey: '14-con-遮瑕',
                x: 800,
                y: -200,
                targetOffsetX: 50,    // 遮瑕放置在角色脸部右侧50像素
                targetOffsetY: -60    // 遮瑕放置在角色脸部上方60像素
            },

            // 粉扑
            {
                key: '14-pp',
                imageKey: '14-pp-粉扑',
                x: 800,
                y: -200,
                targetOffsetX: 0,     // 相对于角色的水平偏移量
                targetOffsetY: -40    // 粉扑放置在角色脸部上方40像素
            },

            // 眼影
            {
                key: '14-es',
                imageKey: '14-es-眼影',
                x: 800,
                y: -200,
                targetOffsetX: -30,   // 眼影放置在角色眼睛左侧30像素
                targetOffsetY: -50    // 眼影放置在角色眼睛上方50像素
            },

            // 眉笔眼线
            {
                key: '14-epel',
                imageKey: '14-epel-眉笔眼线',
                x: 800,
                y: -200,
                targetOffsetX: 30,    // 眉笔眼线放置在角色眼睛右侧30像素
                targetOffsetY: -50    // 眉笔眼线放置在角色眼睛上方50像素
            },

            // 睫毛盒子开
            {
                key: '14-ebo',
                imageKey: '14-ebo-睫毛盒子开',
                x: 800,
                y: -200,
                targetOffsetX: 0,     // 相对于角色的水平偏移量
                targetOffsetY: -70    // 睫毛盒子开放置在角色眼睛上方70像素
            },

            // 睫毛盒子关
            {
                key: '14-ebc',
                imageKey: '14-ebc-睫毛盒子关',
                x: 800,
                y: -200,
                targetOffsetX: 0,     // 相对于角色的水平偏移量
                targetOffsetY: -70    // 睫毛盒子关放置在角色眼睛上方70像素
            },

            // 腮红
            {
                key: '14-b',
                imageKey: '14-b-腮红',
                x: 800,
                y: -200,
                targetOffsetX: 0,     // 相对于角色的水平偏移量
                targetOffsetY: -30    // 腮红放置在角色脸颊上方30像素
            },

            // 口红
            {
                key: '14-l',
                imageKey: '14-l-口红',
                x: 800,
                y: -200,
                targetOffsetX: 0,     // 相对于角色的水平偏移量
                targetOffsetY: -20    // 口红放置在角色嘴巴上方20像素
            },

            // 睫毛左
            {
                key: '14-el',
                imageKey: '14-el-睫毛左',
                x: 800,
                y: -100,
                targetOffsetX: -40,   // 睫毛左放置在角色左眼下方40像素
                targetOffsetY: -50    // 睫毛左放置在角色左眼下方50像素
            },

            // 睫毛右
            {
                key: '14-er',
                imageKey: '14-er-睫毛右',
                x: 800,
                y: -100,
                targetOffsetX: 40,    // 睫毛右放置在角色右眼下方40像素
                targetOffsetY: -50    // 睫毛右放置在角色右眼下方50像素
            },
        ];


        // 初始化 backgrounds 数组
        this.backgrounds = [
            {
                key: '14-bedb1',
                imageKey: '14-bedb1-化妆床背景放大版1'
            },
            {
                key: '14-bedb2',
                imageKey: '14-bedb2-化妆床背景放大版2'
            },
            {
                key: '14-bedb3',
                imageKey: '14-bedb3-化妆床背景放大版3'
            }
        ];





        // 初始化 characterImages 数组
        this.characterImages = [
            {
                key: '14-gnh',
                imageKey: '14-gnh-人没头发',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-ghh',
                imageKey: '14-ghh-人有头发',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gnm',
                imageKey: '14-gnm-人没化妆',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gb',
                imageKey: '14-gb-人放大',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gb1',
                imageKey: '14-gb-人腮红',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gb2',
                imageKey: '14-gb2-人放大2',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gpp',
                imageKey: '14-gpp-人粉扑',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gl',
                imageKey: '14-gl-人口红',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-wf',
                imageKey: '14-wf-人擦完脸',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-glf1',
                imageKey: '14-glf1-人粉底液1',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-glf2',
                imageKey: '14-glf2-人粉底液2',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-glf3',
                imageKey: '14-glf3-人粉底液3',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-glfe',
                imageKey: '14-glfe-人粉底液完',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-ges1',
                imageKey: '14-ges1-人眼影1',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-ges2',
                imageKey: '14-ges2-人眼影2',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gepel1',
                imageKey: '14-gepel1-人眼线1',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gepel2',
                imageKey: '14-gepel2-人眼线2',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gepel3',
                imageKey: '14-gepel3-人眉毛1',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gepel4',
                imageKey: '14-gepel4-人眉毛2',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gcon1',
                imageKey: '14-gcon1-人遮瑕1',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gcon2',
                imageKey: '14-gcon2-人遮瑕2',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gel1',
                imageKey: '14-gel1-人睫毛1',
                x: this.centerX,
                y: this.centerY
            },
            {
                key: '14-gel2',
                imageKey: '14-gel2-人睫毛2',
                x: this.centerX,
                y: this.centerY
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
                        this.scene.start('Scene15');
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
                    isNeedAct = true;
                    break;
                case 'bg-switch':
                    this.tile_replace("background", "backgrounds", key);
                    break;
                case 'passSwitch':
                    this.tile_replace("girl", "characterImages", key);
                    break;
                case "itemSwitch":
                    this.tile_replace("14-ebc", "items", key);
                    break;
                case "destroy":
                    this[key].destroy();;
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
                let targetX = this.girl.x + item.targetOffsetX;
                let targetY = this.girl.y + item.targetOffsetY; // 人物头部的y坐标
                let distance = Phaser.Math.Distance.Between(draggableItem.x, draggableItem.y, targetX, targetY);

                if (distance < 1000) { // 拖拽成功
                    this.isActedCorrectly = true;
                    draggableItem.destroy(); // 拖拽成功后移除物品
                    delete this[item.key];
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

export default Scene14;