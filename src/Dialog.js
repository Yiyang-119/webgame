// src/Dialog.js

export default class Dialog {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.dialogKey = options.dialogKey || null;
        this.textContent = options.textContent || '';
        this.dialogX = options.dialogX || scene.centerX;
        this.dialogY = options.dialogY || scene.centerY - 300;
        this.dialogScale = options.dialogScale || 1;
        this.textStyle = options.textStyle || {};
        this.displayDuration = (options.displayDuration !== undefined) ? options.displayDuration : 2000;
        this.onComplete = options.onComplete || null;

        // 新增：文字相对于对话框的偏移量
        this.textOffsetX = options.textOffsetX || 0;
        this.textOffsetY = options.textOffsetY || 0;

        this.dialogImage = null;
        this.dialogText = null;
    }

    show() {
        if (this.dialogKey) {
            // 添加对话框图片
            this.dialogImage = this.scene.add.image(this.dialogX, this.dialogY, this.dialogKey)
                .setScale(this.dialogScale)
                .setOrigin(0.5);
            this.dialogImage.alpha = 0;
            this.dialogImage.setDepth(10); // 确保对话框在草席之上
        }

        // 合并默认文字样式和自定义样式
        const defaultTextStyle = {
            fontSize: '40px',
            color: '#ffffff',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: 800, useAdvancedWrap: true }
        };
        const mergedTextStyle = { ...defaultTextStyle, ...this.textStyle };

        // 添加对话文字，位置根据偏移量调整
        const textX = this.dialogX + this.textOffsetX;
        const textY = this.dialogY + this.textOffsetY;

        this.dialogText = this.scene.add.text(textX, textY, this.textContent, mergedTextStyle)
            .setOrigin(0.5);
        this.dialogText.alpha = 0;
        this.dialogText.setDepth(11); // 同样设置在草席之上

        // 对话框和文字淡入
        this.scene.tweens.add({
            targets: [this.dialogImage, this.dialogText],
            alpha: 1,
            duration: 500,
            onComplete: () => {
                // 显示指定时间后，淡出对话框
                if (this.displayDuration > 0) {
                    this.scene.time.delayedCall(this.displayDuration, () => {
                        this.hide(this.onComplete);
                    });
                }
            }
        });
    }

    hide(callback) {
        // 对话框和文字淡出
        this.scene.tweens.add({
            targets: [this.dialogImage, this.dialogText],
            alpha: 0,
            duration: 500,
            onComplete: () => {
                if (this.dialogImage) this.dialogImage.destroy();
                if (this.dialogText) this.dialogText.destroy();
                if (callback) callback();
            }
        });
    }
}
