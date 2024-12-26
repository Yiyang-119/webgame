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
                text: '我们到了',
                dialogKey: 'dialog-cat'
            },
            {
                speaker: '人',
                text: '这家医院好大，咱们走哪个科室',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '猫',
                text: '咱们去太平间！',
                dialogKey: 'dialog-cat'
            },
            {
                speaker: '人',
                text: '不好意思啊，没来过......',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '医生',
                text: '【忽然出现】你们来了？是来抬走尸体的吧',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '医生',
                text: '这个女孩是得癌症化疗去世的，之前一直在我们医院',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '医生',
                text: '可能需要你们给她接一顶头发，她的气色不太好，请好好进行化妆，后续的情况等家属跟你们联系吧，这孩子生前也很辛苦的，拜托你们了',
                dialogKey: 'dialog-user'
            },
            {
                speaker: '人',
                text: '好的',
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