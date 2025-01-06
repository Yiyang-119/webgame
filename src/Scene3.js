// src/Scene3.js

export default class Scene3 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene3' });
    }

    preload() {
        // 在这个场景中，我们只需要一个纯黑背景和文字，不需要加载额外的资源
    }

    create() {
        // 设置场景的持续时间（毫秒）
        const sceneDuration = 4000;

        // 获取屏幕中心坐标
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // 创建一个全屏的纯黑背景
        const blackBackground = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
            .setOrigin(0, 0);

        // 定义要显示的文字内容
        const fullText = 'You are an embalmer at a private funeral home and today is your first day on the job ......';
        let currentText = '';

        // 在屏幕中心添加文字对象，初始内容为空，透明度为 0
        const introText = this.add.text(centerX, centerY, '', {
            fontSize: '64px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: this.cameras.main.width - 100, useAdvancedWrap: true }
        }).setOrigin(0.5);
        introText.alpha = 0;

        // 文字淡入（同时开始打字机效果）
        this.tweens.add({
            targets: introText,
            alpha: 1,
            duration: 500, // 0.5 秒
            onComplete: () => {
                // 开始打字机效果
                let charIndex = 0;
                const typingSpeed = 100; // 每个字符的间隔（毫秒）

                this.time.addEvent({
                    delay: typingSpeed,
                    callback: () => {
                        currentText += fullText[charIndex];
                        introText.setText(currentText);
                        charIndex++;
                        if (charIndex === fullText.length) {
                            // 文字显示完成，延迟后开始淡出
                            this.time.delayedCall(2000, () => {
                                // 文字淡出
                                this.tweens.add({
                                    targets: introText,
                                    alpha: 0,
                                    duration: 1000,
                                    onComplete: () => {
                                        this.scene.start('Scene4');
                                    }
                                });
                            });
                        }
                    },
                    repeat: fullText.length - 1
                });
            }
        });
    }
}
