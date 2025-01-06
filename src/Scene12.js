// src/Scene12.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

class Scene12 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene12' });
    }

    preload() {
        // 加载背景、角色、对话框、档案袋等资源
        this.load.image('bg-12', 'assets/images/12-hos-医院.png');
        this.load.image('dialog-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('dialog-user', 'assets/images/4-db-对话框-人.png');
    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;


        // 添加背景
        this.background = this.add.image(this.centerX, this.centerY, 'bg-12');

        // 初始化对话索引
        this.dialogIndex = 0;

        // 定义对话内容队列
        this.dialogQueue = [
            {
                speaker: '猫',
                text: 'We are here.',
                dialogKey: 'dialog-cat'
            },
            {
                speaker: '人',
                text: 'This hospital is so big. Which department are we going to?',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '猫',
                text: 'We are going to the morgue!',
                dialogKey: 'dialog-cat'
            },
            {
                speaker: '人',
                text: 'Sorry, I have never been here before...',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '医生',
                text: 'Doctor: [Suddenly appearing] Oh, you are here? To take the body, right?',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '医生',
                text: 'Doctor: This girl passed away from cancer after chemotherapy. She was under our care until the end.',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '医生',
                text: 'Doctor: You might need to give her a wig. Her complexion isn t well. Please do her makeup carefully. The family will contact you later to discuss the next steps. This girl had a tough life. Please take good care of her.',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '人',
                text: 'Ok',
                dialogKey: 'dialog-user'
            }
        ];


        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                // 对话结束，场景结束
                this.transitionManager.fadeOut({
                    onComplete: () => {
                        // 切换到下一个场景
                        this.scene.start('Scene13');
                    }
                });
            }
        });

        // 开始对话
        this.transitionManager = new TransitionManager(this);

        this.transitionManager.fadeIn({
            onComplete: () => {
                this.dialogManager.start();
            }
        });
    }
}

export default Scene12;