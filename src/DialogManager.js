// src/DialogManager.js

import Dialog from './Dialog.js';

export default class DialogManager {
    constructor(scene, options = {}) {
        this.scene = scene;
        this.dialogueQueue = options.dialogQueue || [];
        this.onComplete = options.onComplete || null;
        this.dialogIndex = 0;
        this.currentDialog = null;
        this.triggeredTriggers = new Set(); // 记录已触发的触发器

        // 默认设置
        this.defaultSettings = {
            dialogX: options.dialogX || scene.centerX,
            dialogY: options.dialogY || scene.centerY + 550,
            dialogScale: options.dialogScale || 0.6,
            textOffsetX: options.textOffsetX || 0,
            textOffsetY: options.textOffsetY || 0,
            textStyle: options.textStyle || {
                fontSize: '40px',
                color: '#fffff0',
                wordWrap: { width: 1500, useAdvancedWrap: true }
            }
        };
    }

    start() {
        this.showNextDialog();
    }

    showNextDialog() {
        if (this.dialogIndex < this.dialogueQueue.length) {
            const dialogData = this.dialogueQueue[this.dialogIndex++];
            this.showDialog(dialogData);
        } else {
            // 对话结束
            if (this.currentDialog) {
                this.currentDialog.hide(() => {
                    if (this.onComplete) this.onComplete();
                });
            } else {
                if (this.onComplete) this.onComplete();
            }
        }
    }

    showDialog(dialogData) {
        // 如果有当前对话框，先隐藏后创建新的
        if (this.currentDialog) {
            this.currentDialog.hide(() => {
                this.createDialog(dialogData);
            });
        } else {
            this.createDialog(dialogData);
        }
    }

    createDialog(dialogData) {
        const settings = {
            dialogX: dialogData.dialogX !== undefined ? dialogData.dialogX : this.defaultSettings.dialogX,
            dialogY: dialogData.dialogY !== undefined ? dialogData.dialogY : this.defaultSettings.dialogY,
            dialogScale: dialogData.dialogScale !== undefined ? dialogData.dialogScale : this.defaultSettings.dialogScale,
            textOffsetX: dialogData.textOffsetX !== undefined ? dialogData.textOffsetX : this.defaultSettings.textOffsetX,
            textOffsetY: dialogData.textOffsetY !== undefined ? dialogData.textOffsetY : this.defaultSettings.textOffsetY,
            textStyle: { ...this.defaultSettings.textStyle, ...dialogData.textStyle }
        };

        this.currentDialog = new Dialog(this.scene, {
            dialogKey: dialogData.dialogKey,
            textContent: dialogData.text,
            displayDuration: dialogData.displayDuration || 0, // 0 表示不自动消失
            dialogX: settings.dialogX,
            dialogY: settings.dialogY,
            dialogScale: settings.dialogScale,
            textOffsetX: settings.textOffsetX,
            textOffsetY: settings.textOffsetY,
            textStyle: settings.textStyle,
            onComplete: async () => {
                // 处理触发器
                if (dialogData.trigger && Array.isArray(dialogData.trigger)) {
                    for (let trigger of dialogData.trigger) {
                        // 仅在触发器未被触发时执行
                        if (!this.triggeredTriggers.has(trigger)) {
                            this.triggeredTriggers.add(trigger);
        
                            // 判断是否存在 handleTrigger 方法
                            if (typeof this.scene.handleTrigger === 'function') {
                                console.log(trigger, "triggered");
                                await this.scene.handleTrigger(trigger);  // 等待当前触发器的处理完成
                            } else {
                                console.warn('handleTrigger method is not defined in scene.');
                            }
                        }
                    }
        
                    // 所有触发器完成后，调用下一段对话
                    this.showNextDialog();
                }
            }


        });
        this.currentDialog.show();
        console.log('Pointer down detected', this.currentDialog.displayDuration);
        // 如果 displayDuration 为0，等待点击继续
        if (this.currentDialog.displayDuration === 0) {
            this.scene.input.once('pointerdown', () => {
                console.log('Pointer down detected');

                this.showNextDialog();
            });
        }
    }
}
