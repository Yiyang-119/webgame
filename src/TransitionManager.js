// src/TransitionManager.js

export default class TransitionManager {
    constructor(scene) {
        this.scene = scene;
        this.centerX = scene.cameras.main.width / 2;
        this.centerY = scene.cameras.main.height / 2;
    }

    /**
     * 淡出效果：逐渐黑屏
     * @param {Object} options - 配置选项
     * @param {Function} [options.onComplete] - 淡出完成后的回调函数
     * @param {Number} [options.fadeDuration=2000] - 淡出的持续时间（毫秒）
     */
    fadeOut(options = {}) {
        const {
            onComplete = () => { },
            fadeDuration = 2000
        } = options;

        // 创建黑屏矩形
        const blackScreen = this.scene.add.rectangle(
            0,
            0,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000
        )
            .setOrigin(0, 0)
            .setDepth(1000) // 确保黑屏在最上层
            .setAlpha(0);    // 初始透明度为0

        // 执行淡出动画
        this.scene.tweens.add({
            targets: blackScreen,
            alpha: 1,
            duration: fadeDuration,
            onComplete: () => {
                onComplete();
                blackScreen.destroy(); // 淡出完成后销毁黑屏
            }
        });
    }

    /**
     * 淡入效果：逐渐显示场景
     * @param {Object} options - 配置选项
     * @param {Function} [options.onComplete] - 淡入完成后的回调函数
     * @param {Number} [options.fadeDuration=2000] - 淡入的持续时间（毫秒）
     */
    fadeIn(options = {}) {
        const {
            onComplete = () => { },
            fadeDuration = 2000
        } = options;

        // 创建黑屏矩形，初始为完全不透明
        const blackScreen = this.scene.add.rectangle(
            0,
            0,
            this.scene.cameras.main.width,
            this.scene.cameras.main.height,
            0x000000
        )
            .setOrigin(0, 0)
            .setDepth(1000) // 确保黑屏在最上层
            .setAlpha(1);    // 初始透明度为1

        // 执行淡入动画
        this.scene.tweens.add({
            targets: blackScreen,
            alpha: 0,
            duration: fadeDuration,
            onComplete: () => {
                blackScreen.destroy(); // 淡入完成后销毁黑屏
                onComplete();
            }
        });
    }
}
