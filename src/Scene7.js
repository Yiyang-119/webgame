export default class Scene7 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene7' });
    }

    preload() {
        // 在此场景不需要加载额外资源，只需要纯黑背景和文字
    }

    create() {
        // 获取屏幕中心坐标
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // 创建一个纯黑背景
        const blackBackground = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
            .setOrigin(0, 0);

        // 对话内容
        const dialogues = [
            '人：接下来我们干什么？',
            'Atropos’：移动尸体放入冰柜，没事我已经将她放进去运回殡仪馆了',
            '人：我不用准备葬礼仪式吗？',
            'Atropos’：过两天会有其他人类去准备葬礼仪式，这不是你初级入殓师要学习的内容',
            'Atropos’：等结束完仪式，咱们去火葬馆陪死者家属走接下来的仪式',
            '人：好的'
        ];

        let currentText = '';
        let currentIndex = 0;

        // 在屏幕中心添加文字对象，初始为空，透明度为 0
        const dialogText = this.add.text(centerX, centerY, '', {
            fontSize: '48px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: this.cameras.main.width - 100, useAdvancedWrap: true }
        }).setOrigin(0.5);
        dialogText.alpha = 0;

        // 打字机效果
        const typingSpeed = 50; // 每个字符的间隔（毫秒）

        // 显示对话的函数
        const showDialogue = () => {
            currentText = '';
            const currentDialogue = dialogues[currentIndex];
            let charIndex = 0;

            this.tweens.add({
                targets: dialogText,
                alpha: 1,
                duration: 500, // 文字淡入
                onComplete: () => {
                    this.time.addEvent({
                        delay: typingSpeed,
                        callback: () => {
                            currentText += currentDialogue[charIndex];
                            dialogText.setText(currentText);
                            charIndex++;
                            if (charIndex === currentDialogue.length) {
                                // 当前对话显示完成，延迟后显示下一个对话
                                this.time.delayedCall(1500, () => {
                                    // 直接跳到下一个对话，避免重复的闪烁
                                    currentIndex++;

                                    if (currentIndex < dialogues.length) {
                                        // 继续下一个对话
                                        showDialogue();
                                    } else {
                                        // 显示旁白
                                        

                                        this.time.delayedCall(1000, showNarration);
                                    }
                                });
                            }
                        },
                        repeat: currentDialogue.length - 1
                    });
                }
            });
        };

        // 旁白“几天过去”
        const showNarration = () => {
            dialogText.alpha = 0;
            const narrationText = this.add.text(centerX, centerY, '几天过去', {
                fontSize: '48px',
                color: '#ffffff',
                fontStyle: 'bold',
                align: 'center',
                wordWrap: { width: this.cameras.main.width - 100, useAdvancedWrap: true }
            }).setOrigin(0.5).setAlpha(0);

            this.tweens.add({
                targets: narrationText,
                alpha: 1,
                duration: 1500,
                onComplete: () => {
                    // 延迟 2 秒后跳转到第八幕
                    this.time.delayedCall(2000, () => {
                        this.scene.start('Scene8');  // 跳转到第八幕
                    });
                }
            });
        };

        // 开始显示第一个对话
        showDialogue();
    }
}
