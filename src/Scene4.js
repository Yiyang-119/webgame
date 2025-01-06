// src/Scene4.js

import DialogManager from './DialogManager.js';
import TransitionManager from './TransitionManager.js';

export default class Scene4 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene4' });
    }

    preload() {
        // 加载背景、角色、对话框、档案袋等资源
        this.load.image('bg-4', 'assets/images/4-bg-车内.png');
        this.load.image('db-4-cat', 'assets/images/4-db-对话框-猫.png');
        this.load.image('db-4-user', 'assets/images/4-db-对话框-人.png');
        this.load.image('p-4-f', 'assets/images/4-port-档案袋正面.png');
        this.load.image('p-4-b', 'assets/images/4-port-档案袋反面.png');
        this.load.image('p-4-o', 'assets/images/4-port-档案袋开启.png');
        this.load.image('r-4', 'assets/images/4-rec-档案页.png');
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
            { speaker: '人', text: ' Huh? Where is this place?', dialogKey: 'db-4-user' },
            { speaker: '猫', text: 'Huh? Didnt you read the funeral home manual carefully? This is in my car!', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '? When did you give me the manual?', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '[Thinks for two seconds, scratches head] Oh, I forgot', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '(This stinky cat, you can blame me for your own fault!)', dialogKey: 'db-4-user' },
            { speaker: '猫', text: ' [narrowing his eyes] Human, are you blaming the king?', dialogKey: 'db-4-cat' },
            { speaker: '人', text: 'Hahaha how do I dare? I will never. Whatever you say is right.', dialogKey: 'db-4-user' },
            { speaker: '人', text: '(Stinky cat! Stinky cat! Stinky cat! Stinky cat!)', dialogKey: 'db-4-user' },
            { speaker: '猫', text: 'Hmph! That is good.', dialogKey: 'db-4-cat' },
            { speaker: '人', text: 'So Boss Cat, where are we going now?', dialogKey: 'db-4-user' },
            { speaker: '猫', text: 'To the home of the first dead person in your career', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '！！！', dialogKey: 'db-4-user' },
            { speaker: '人', text: 'What? So soon.', dialogKey: 'db-4-user' },
            { speaker: '猫', text: 'Well, what else? What, stay a few more days to retire at Atropos Funeral Home?', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '........', dialogKey: 'db-4-user' },
            { speaker: '人', text: 'that is not true', dialogKey: 'db-4-user' },
            { speaker: '猫', text: 'Okay, no more nonsense with you, now I will give you the first bit of the deceaseds dossier bag, which explains some of her basic information, read it carefully!', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '[confused] Boss, how do I open this?', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '[Eyes widen] Are you stupid? Click on the blank part!!!', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '（ So mean, stinky cat!）', dialogKey: 'db-4-user' },
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
            'r-4'    // 档案内容
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
                    { speaker: '人', text: ' Ohhhh! I know.', dialogKey: 'db-4-user' },
                    { speaker: '猫', text: '[Cold grunt] You better really get it and dont make any mistakes in this matter', dialogKey: 'db-4-cat' },
                    { speaker: '人', text: '.......', dialogKey: 'db-4-user' },
                    { speaker: '人', text: '（well well）', dialogKey: 'db-4-user' },
                ];

                // 创建对话管理器，并在对话结束时执行zoomOutScene
                this.dialogManager = new DialogManager(this, {
                    dialogQueue: this.dialogQueue,
                    onComplete: () => {
                        // 对话结束，场景结束
                        this.transitionManager.fadeOut({
                            onComplete: () => {
                                // 切换到下一个场景（例如 Scene5）
                                this.scene.start('Scene5');
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




