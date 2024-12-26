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
            { speaker: '猫', text: 'hello？你在发什么呆', dialogKey: 'dialog-cat' },
            { speaker: '人', text: '没有，我在回味上次的葬礼仪式......感觉布置殡葬场景很有意思', dialogKey: 'dialog-user' },
            { speaker: '猫', text: '不用着急，这一次的流程当中有这个环节', dialogKey: 'dialog-cat' },
            { speaker: '人', text: '咦？真的吗', dialogKey: 'dialog-user' },
            { speaker: '猫', text: '【喵】真的，因为前段时间Atropos\'殡仪馆那位殡葬场景布置师回家了', dialogKey: 'dialog-cat' },
            { speaker: '人', text: '......', dialogKey: 'dialog-user' },
            { speaker: '人', text: '（合着是没人干了呗）', dialogKey: 'dialog-user' },
            { speaker: '猫', text: '【看了一眼】干什么，人家休假？你一个实习生还想休假吗？', dialogKey: 'dialog-cat' },
            { speaker: '人', text: '没有......', dialogKey: 'dialog-user' },
            { speaker: '猫', text: '【冷哼】哼，这次任务做好了，赏你三天假期', dialogKey: 'dialog-cat' },
            { speaker: '人', text: '（！！！）感谢老板大恩大德', dialogKey: 'dialog-user' },
            { speaker: '猫', text: '好了，不跟你废话了，现在我给你第二位死者的档案袋，这里交代了她的一些基本信息，仔细看！', dialogKey: 'dialog-cat' },
            { speaker: '人', text: '收到', dialogKey: 'dialog-user' }
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
                    { speaker: '人', text: '这位死者，真是可惜啊......', dialogKey: 'dialog-user' },
                    { speaker: '猫', text: '停，收起你那没用的同理心，好好工作。这些死者最需要的是一个完整且完美的殡葬流程', dialogKey: 'dialog-cat' },
                    { speaker: '人', text: '好的', dialogKey: 'dialog-user' },
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
