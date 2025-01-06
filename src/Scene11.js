// src/Scene11.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

class Scene11 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene11' });
    }

    preload() {
        // 加载背景、角色、对话框、档案袋等资源
        this.load.image('bg-4', 'assets/images/4-bg-车内.png');
        this.load.image('dialog-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('dialog-user', 'assets/images/4-db-对话框-人.png');
        this.load.image('p-4-f', 'assets/images/4-port-档案袋正面.png');
        this.load.image('p-4-b', 'assets/images/4-port-档案袋反面.png');
        this.load.image('p-4-o', 'assets/images/4-port-档案袋开启.png');
        this.load.image('11-rec', 'assets/images/11-rec-档案页.png');
    }

    create() {
        // 获取中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;


        // 添加背景
        this.background = this.add.image(this.centerX, this.centerY, 'bg-4');

        // 初始化对话索引
        this.dialogIndex = 0;

        // 定义对话内容队列
        this.dialogQueue = [
            { speaker: '猫', text: 'Hello? What are you daydreaming about?', dialogKey: 'dialog-cat' },
            { speaker: '人', text: 'Nothing, just reminiscing about the last funeral ceremony... I thought setting up the funeral scene was really interesting.', dialogKey: 'dialog-user' },
            { speaker: '猫', text: 'No need to rush. There s this part of the process this time, too.', dialogKey: 'dialog-cat' },
            { speaker: '人', text: 'Huh? Really?', dialogKey: 'dialog-user' },
            { speaker: '猫', text: ' Of course, the funeral scene designer from Atropos funeral home recently went home.', dialogKey: 'dialog-cat' },
            { speaker: '人', text: '......', dialogKey: 'dialog-user' },
            { speaker: '人', text: '（So... there s no one left to do it.）', dialogKey: 'dialog-user' },
            { speaker: '猫', text: '[Glances at the person] What? They are on vacation. You are an intern. Do you get vacations, too?', dialogKey: 'dialog-cat' },
            { speaker: '人', text: 'No...', dialogKey: 'dialog-user' },
            { speaker: '猫', text: 'Hmph. I will reward you with three days off if you do well on this task.', dialogKey: 'dialog-cat' },
            { speaker: '人', text: '!!! Thank you for your great kindness, boss!', dialogKey: 'dialog-user' },
            { speaker: '猫', text: 'Alright, enough chitchat. I am giving you the second deceased person s file. It contains some basic information, so pay attention and look carefully!', dialogKey: 'dialog-cat' },
            { speaker: '人', text: 'Ok', dialogKey: 'dialog-user' }
        ];

        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                // 在对话框淡出动画完成后显示档案袋
                this.showPortfolio();
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

    showPortfolio() {
        // 显示档案袋，添加交互
        this.portfolioStage = 0;
        this.portfolioImages = [
            'p-4-f', // 正面
            'p-4-b', // 反面
            'p-4-o', // 开启
            '11-rec'    // 档案内容
        ];

        this.portfolio = this.add.image(this.centerX, this.centerY, this.portfolioImages[this.portfolioStage])
            .setInteractive();

        // 点击事件
        this.portfolio.on('pointerdown', () => {
            this.portfolioStage++;
            if (this.portfolioStage < this.portfolioImages.length) {
                // 更新档案袋的图片
                this.portfolio.setTexture(this.portfolioImages[this.portfolioStage]);
            } else {
                // 完成档案查看，移除档案袋，继续对话
                this.portfolio.destroy();

                // 定义对话内容队列
                this.dialogQueue = [
                    { speaker: '人', text: 'Its such a pity about this deceased person...', dialogKey: 'dialog-user' },
                    { speaker: '猫', text: 'Stop. Put away your useless sympathy and focus on the work. What these deceased need the most is a complete and perfect funeral process.', dialogKey: 'dialog-cat' },
                    { speaker: '人', text: 'Ok', dialogKey: 'dialog-user' },
                ];

                // 创建对话管理器，并在对话结束时执行zoomOutScene
                this.dialogManager = new DialogManager(this, {
                    dialogQueue: this.dialogQueue,
                    onComplete: () => {
                        // 对话结束，场景结束
                        this.transitionManager.fadeOut({
                            onComplete: () => {
                                // 切换到下一个场景
                                this.scene.start('Scene12');
                            }
                        });
                    }
                });

                // 开始对话
                this.dialogManager.start();
            }
        });
    }
}

export default Scene11;
