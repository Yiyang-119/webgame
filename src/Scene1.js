// src/Scene1.js

class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
    }

    preload() {
        // 加载第一个背景
        this.load.image('bg-1', 'assets/images/1-bg-双猫背景图.png');
    }

    create() {
        // 计算中心坐标
        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;

        // 添加第一个背景
        this.add.image(this.centerX, this.centerY, 'bg-1');

        // // 设置计时器，2 秒后切换到 TransitionScene
        // this.time.delayedCall(2000, () => {
        //     // 启动黑屏过渡效果，并传递下一个场景的名称
        //     this.scene.start('TransitionScene', { nextScene: 'Scene2' });
        // });
        // 在 2 秒后开始淡出
        this.time.delayedCall(2000, () => {
            // 创建淡出动画
            this.tweens.add({
                targets: this.background,
                alpha: 0,
                duration: 1000, // 0.5 秒
                onComplete: () => {
                    // 启动下一个场景
                    this.scene.start('Scene2');
                }
            });
        });

    }
}

export default Scene1;
