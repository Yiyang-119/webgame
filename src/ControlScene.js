export default class ControlScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ControlScene' });
        this.sceneKeys = ['Scene1', 'Scene2', 'Scene3', 'Scene4', 'Scene5', 'Scene6', "Scene7", "Scene8", "Scene9", "Scene10", "Scene11", "Scene12", "Scene13", 'Scene14', 'Scene15', 'Scene16', 'Scene17', 'Scene18']
        this.currentSceneIndex = 0; // 初始场景索引
        this.inputBuffer = ''; // 用于数字输入
    }
    preload() {
        // 加载背景音乐
        this.load.audio('bgMusic', 'assets/sound/1123.mp3');
    }

    create() {
        // 不需要在这里显示什么，或者可显示提示文本
        // this.add.text(50, 50, 'Press Q/E to switch scenes, digits+Enter to jump.', { fontSize: '48px', fill: '#fff' });

        // 播放背景音乐并设置循环
        this.bgMusic = this.sound.add('bgMusic', {
            loop: true,
            volume: 0.5 // 可根据需要调整音量
        });
        this.bgMusic.play();
        // 启动初始场景
        this.launchScene(this.sceneKeys[this.currentSceneIndex]);

        // 全局键盘监听
        this.input.keyboard.on('keydown', (event) => {
            const pressedKey = event.key;

            // 数字输入(0-9)
            if (/^\d$/.test(pressedKey)) {
                this.inputBuffer += pressedKey;
                // 如果想实现固定长度的数字输入（例如2位数），可以在这里判断长度
                // if (this.inputBuffer.length === 2) {
                //     this.jumpToSceneFromBuffer();
                // }
                return;
            }

            // 确认输入(按Enter确认跳转)
            if (pressedKey === 'Enter') {
                if (this.inputBuffer.length > 0) {
                    this.jumpToSceneFromBuffer();
                }
                return;
            }

            switch (pressedKey.toLowerCase()) {
                case 'q':
                    // 上一幕
                    this.switchToPreviousScene();
                    break;
                case 'e':
                    // 下一幕
                    this.switchToNextScene();
                    break;
                default:
                    // 非数字非Q/E/Enter时，如果inputBuffer有值，可以选择立即跳转
                    // 或清空缓冲。这里暂不做额外处理。
                    break;
            }
        });
    }

    jumpToSceneFromBuffer() {
        const sceneNumber = parseInt(this.inputBuffer, 10);
        this.inputBuffer = ''; // 清空缓冲

        // 如果输入的数字对应存在的场景，比如 Scene1 ~ Scene6
        if (sceneNumber >= 1 && sceneNumber <= this.sceneKeys.length) {
            this.currentSceneIndex = sceneNumber - 1;
            this.stopAllGameScenesExceptControl();
            this.launchScene(this.sceneKeys[this.currentSceneIndex]);
        }
    }

    switchToPreviousScene() {
        this.currentSceneIndex--;
        if (this.currentSceneIndex < 0) {
            this.currentSceneIndex = this.sceneKeys.length - 1;
        }
        this.stopAllGameScenesExceptControl();
        this.launchScene(this.sceneKeys[this.currentSceneIndex]);
    }

    switchToNextScene() {
        this.currentSceneIndex++;
        if (this.currentSceneIndex >= this.sceneKeys.length) {
            this.currentSceneIndex = 0;
        }
        this.stopAllGameScenesExceptControl();
        this.launchScene(this.sceneKeys[this.currentSceneIndex]);
    }

    launchScene(sceneKey) {
        // 使用launch而非start，以保持ControlScene持续存在
        this.scene.launch(sceneKey);
    }

    stopAllGameScenesExceptControl() {
        // 停止除ControlScene以外的所有场景
        for (const key of this.sceneKeys) {
            if (this.scene.isActive(key)) {
                this.scene.stop(key);
            }
        }
    }
}
