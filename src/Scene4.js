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
            { speaker: '人', text: '咦？这里是哪里？', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '哈？你没有仔细观看殡仪馆手册吗？这是在本王的车上！！', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '？你什么时候给我手册了', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '哦，忘记了...(挠挠头)', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '内心：这臭猫，自己的错还能怪我身上！', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '【眯起眼睛】人类，你在怪本王吗？', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '哈哈哈哪里敢呀？ 我都听你的，你说什么都对哈哈哈', dialogKey: 'db-4-user' },
            { speaker: '人', text: '（臭猫！臭猫！臭猫！臭猫！看我不骂死你！！）', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '哼！那就好', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '所以猫老板，咱们现在是要去哪里？', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '去你职业生涯中的第一位死者家里', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '！！！', dialogKey: 'db-4-user' },
            { speaker: '人', text: '什么？这么快', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '那要不然呢？咋了，再多待几天在Atropos’殡仪馆养老？', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '........', dialogKey: 'db-4-user' },
            { speaker: '人', text: '那倒也不是', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '好了，不跟你废话了，现在我给你第一位死者的档案袋，这里交代了她的一些基本信息，仔细看！', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '【困惑】老板，这怎么打开？', dialogKey: 'db-4-user' },
            { speaker: '猫', text: '【眼睛睁大】你蠢啊？点击空白部分！！！', dialogKey: 'db-4-cat' },
            { speaker: '人', text: '（切，凶什么，臭猫）', dialogKey: 'db-4-user' },
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
                    { speaker: '人', text: '哦哦！我明白了', dialogKey: 'db-4-user' },
                    { speaker: '猫', text: '你最好是真明白了，别给我出什么差错', dialogKey: 'db-4-cat' },
                    { speaker: '人', text: '.......', dialogKey: 'db-4-user' },
                    { speaker: '人', text: '（呵呵）', dialogKey: 'db-4-user' },
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




