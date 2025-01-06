// src/Scene6.js

import DialogManager from './DialogManager.js';

export default class Scene6 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene6' });
    }

    preload() {
        this.load.image('id-6', 'assets/images/6-id-室内.png');    // 室内场景
        this.load.image('om-6-wn', 'assets/images/6-omwn-老人没穿-床上.png'); // 老人图像
        this.load.image('db-5-cat', 'assets/images/5-db-对话框-猫.png');   // 猫对话框
        this.load.image('db-5-user', 'assets/images/5-db-对话框-人.png');  // 人对话框
        this.load.image('sm-6', 'assets/images/6-sm-草席.png');  // 人对话框
        this.load.image('db-6', 'assets/images/6-db-物品展示板.png');  // 物品展示板

        this.load.image('6-s-衬衣-1', 'assets/images/6-s-衬衣-1.png');
        this.load.image('6-s-老人衬衣-1', 'assets/images/6-s-老人衬衣-1.png');
        this.load.image('6-p-衬裤-2', 'assets/images/6-p-衬裤-2.png');
        this.load.image('6-p-老人衬裤-2', 'assets/images/6-p-老人衬裤-2.png');
        this.load.image('6-cpc-棉衣-3', 'assets/images/6-cpc-棉衣-3.png');
        this.load.image('6-cpc-老人棉衣-3', 'assets/images/6-cpc-老人棉衣-3.png');
        this.load.image('6-cpt-棉裤-4', 'assets/images/6-cpt-棉裤-4.png');
        this.load.image('6-cpt-老人棉裤-4', 'assets/images/6-cpt-老人棉裤-4.png');
        this.load.image('6-oc-罩衣-5', 'assets/images/6-oc-罩衣-5.png');
        this.load.image('6-oc-老人罩衣-5', 'assets/images/6-oc-老人罩衣-5.png');
        this.load.image('6-op-罩裤-6', 'assets/images/6-op-罩裤-6.png');
        this.load.image('6-op-老人罩裤-6', 'assets/images/6-op-老人罩裤-6.png');
        this.load.image('6-cwr-棉袍-7', 'assets/images/6-cwr-棉袍-7.png');
        this.load.image('6-cwr-老人棉袍-7', 'assets/images/6-cwr-老人棉袍-7.png');
        this.load.image('6-pl-头枕-8', 'assets/images/6-pl-头枕-8.png');
        this.load.image('6-pl-老人头枕-8', 'assets/images/6-pl-老人头枕-8.png');
        this.load.image('6-fpl-脚枕-9', 'assets/images/6-fpl-脚枕-9.png');
        this.load.image('6-fpl-老人脚枕-9', 'assets/images/6-fpl-老人脚枕-9.png');
        this.load.image('6-r-戒指-10', 'assets/images/6-r-戒指-10.png');
        this.load.image('6-r-老人戒指-10', 'assets/images/6-r-老人戒指-10.png');
        this.load.image('6-b-手镯-11', 'assets/images/6-b-手镯-11.png');
        this.load.image('6-b-老人手镯-11', 'assets/images/6-b-老人手镯-11.png');
        this.load.image('6-mu-老人化好妆-12', 'assets/images/6-mu-老人化好妆-12.png');
    }

    create() {

        this.isPlacedCorrectly = false;

        this.centerX = this.cameras.main.width / 2;
        this.centerY = this.cameras.main.height / 2;

        // 添加背景和角色
        this.background = this.add.image(this.centerX, this.centerY, 'id-6').setScale(1);
        this.oldMan = this.add.image(this.centerX + 350, this.centerY + 150, 'om-6-wn').setScale(0.6).setDepth(2);

        // 初始镜头设置
        this.cameras.main.zoom = 1.5;
        this.cameras.main.centerOn(this.centerX + 100, this.centerY - 40);

        // 定义默认的对话框参数
        const defaultDialogProps = {
            dialogX: this.centerX + 100,
            dialogY: this.centerY + 400,
            dialogScale: 0.3,
            textStyle: {
                fontSize: '30px',
                color: '#fffff0',
                wordWrap: { width: 1000, useAdvancedWrap: true }
            }
        };

        // 定义对话队列时，只需写特有属性
        this.dialogQueue = [
            { speaker: '死者家属', text: 'Family of the departed: Hello!', dialogKey: 'db-5-user', textOffsetX: 0, textOffsetY: 0 },
            { speaker: '人', text: 'Hello, I am the staff of Atropos Funeral Home! I am now in charge of handling Ms. Lin Your s funeral arrangements. Please rest assured and leave everything to me. Is that lady on the bed Ms Youru Lin?', dialogKey: 'db-5-user' },
            { speaker: '猫', text: '[Meows] Well done!', dialogKey: 'db-5-cat' },
            { speaker: '死者家属', text: 'Family of the departed:   Yes, that is my mother', dialogKey: 'db-5-user' },
            { speaker: '死者家属', text: 'Family of the departed: [Looks at the cat, puzzled] Why is there a cat here?', dialogKey: 'db-5-user' },
            { speaker: '人', text: 'Haha, this is the mascot of Atropos Funeral Home. Don t worry, he s a clever cat—he knows to stay away from the work area.', dialogKey: 'db-5-user' },
            { speaker: '猫', text: ' [Meow] Who are you calling a mascot?', dialogKey: 'db-5-cat' },
            { speaker: '死者家属', text: 'Family of the departed:   [Nods] Alright, it s fine. My mom liked cats when she was alive anyway...', dialogKey: 'db-5-user' },
            { speaker: '死者家属', text: 'Family of the departed: [choking] Please start.', dialogKey: 'db-5-user' },
            { speaker: '人', text: 'Alright, my condolences to you. I will get started now', dialogKey: 'db-5-user' }
        ].map(dialog => {
            // 将默认参数与对话独有参数合并
            return { ...defaultDialogProps, ...dialog };
        });



        // 创建对话管理器，并在对话结束时执行zoomOutScene
        this.dialogManager = new DialogManager(this, {
            dialogQueue: this.dialogQueue,
            onComplete: () => {
                this.zoomOutScene();
            }
        });

        // 相机的fadeIn效果
        this.cameras.main.fadeIn(2000, 0, 0, 0); // 3秒内从黑色淡入
        this.cameras.main.once('camerafadeincomplete', () => {
            this.dialogManager.start();
        });



    }

    zoomOutScene() {
        this.tweens.add({
            targets: this.cameras.main,
            zoom: 1,
            scrollX: this.centerX - (this.cameras.main.width / 2),
            scrollY: this.centerY - (this.cameras.main.height / 2),
            duration: 2000,
            ease: 'Sine.easeInOut',
            onComplete: () => {
                this.secondDialogQueue = [
                    { speaker: '人', text: '(This lady looks so peaceful. She must have passed away naturally, living a full life.)', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: '猫', text: ' Human! What are you staring at! Hurry up and bring out the mat!', dialogKey: 'db-5-cat', fontSize: '80px' },
                    { speaker: '人', text: 'Oh, okay.', dialogKey: 'db-5-user', fontSize: '80px' },
                ];

                this.secondDialogManager = new DialogManager(this, {
                    dialogQueue: this.secondDialogQueue,
                    onComplete: () => {
                        // 第二轮对话结束后，为老人添加点击交互，将其移动到草席上
                        this.strawMat = this.add.image(this.centerX, this.centerY + 700, 'sm-6').setScale(1).setDepth(1);
                        this.thirdDialogQueue = [
                            { speaker: '猫', text: ' Now put her on the straw mat', dialogKey: 'db-5-cat', fontSize: '80px' }
                        ];

                        this.thirdDialogManager = new DialogManager(this, {
                            dialogQueue: this.thirdDialogQueue,
                            onComplete: () => {
                                // 第二轮对话结束后，为老人添加点击交互，将其移动到草席上

                                this.enableOldManMove();
                            }
                        });
                        this.time.delayedCall(1000, () => {
                            this.thirdDialogManager.start();
                        });
                    }
                });

                this.secondDialogManager.start();
            }
        });
    }

    enableOldManMove() {
        // 此处显示草席图像
        // 给老人添加交互
        this.oldMan.setInteractive();

        // 实现闪烁效果（渐变变白）
        const blinkTween = this.tweens.add({
            targets: this.oldMan,
            alpha: { from: 1, to: 0.7 },
            duration: 500,
            yoyo: true,  // 往返闪烁
            repeat: -1,  // 无限次重复
            ease: 'Sine.easeInOut'
        });

        // 鼠标悬停时放大
        this.oldMan.on('pointerover', () => {
            // 停止闪烁效果
            // blinkTween.stop();
            // 放大效果
            this.tweens.add({
                targets: this.oldMan,
                scaleX: 0.7, // 放大一点点
                scaleY: 0.7,
                duration: 200,  // 放大的持续时间
                ease: 'Sine.easeInOut'
            });
        });

        // 鼠标移开时恢复原样
        this.oldMan.on('pointerout', () => {
            // 重新启动闪烁效果
            // blinkTween.play();
            // 恢复原大小
            this.tweens.add({
                targets: this.oldMan,
                scaleX: 0.6, // 恢复原大小
                scaleY: 0.6,
                duration: 200,  // 恢复的持续时间
                ease: 'Sine.easeInOut'
            });
        });

        // 点击后将老人移动到草席位置
        this.oldMan.on('pointerdown', () => {

            // 停止闪烁效果
            blinkTween.stop();

            // 恢复不透明度
            this.oldMan.alpha = 1; // 恢复为原始不透明度

            // 禁止重复点击
            this.oldMan.disableInteractive();

            // 移动的动画
            this.tweens.add({
                targets: this.oldMan,
                x: this.strawMat.x,
                y: this.strawMat.y - 20,
                scaleX: 1,
                scaleY: 1,
                duration: 1000,
                ease: 'Sine.easeInOut',
                onComplete: () => {
                    this.forthDialogQueue = [
                        { speaker: '猫', text: 'now open the box you re carrying with you', dialogKey: 'db-5-cat', fontSize: '80px' },
                        { speaker: '人', text: 'ok', dialogKey: 'db-5-user', fontSize: '80px' },
                    ];

                    this.forthDialogManager = new DialogManager(this, {
                        dialogQueue: this.forthDialogQueue,
                        onComplete: () => {
                            this.time.delayedCall(1000, () => {
                                this.showItemBoard();
                            });
                        }
                    });

                    this.forthDialogManager.start();
                }
            });
        });
    }

    showItemBoard() {
        // 添加物品展示板并设置初始位置（右下角）和缩放（scale 0.1）
        this.itemBoard = this.add.image(this.centerX + 1500, this.centerY + 750, 'db-6')
            .setScale(0.1) // 初始缩放
            .setOrigin(1, 1) // 设置物品展示板的原点为右下角
            .setDepth(2); // 设置层级

        // 使用Tween实现物品展示板的动画
        this.tweens.add({
            targets: this.itemBoard,
            x: this.centerX + 700, // 移动到左上角
            y: this.centerY + 350,
            scaleX: 1, // 缩放到正常大小
            scaleY: 1, // 同上
            duration: 1500, // 动画持续时间
            ease: 'Sine.easeInOut', // 缓动效果
            onComplete: () => {
                // 这里是加载物品的地方
                const items = [
                    { key: '6-cwr-棉袍-7', x: 400, y: 300 },
                    { key: '6-oc-罩衣-5', x: 700, y: 300 },
                    { key: '6-cpc-棉衣-3', x: 1000, y: 300 },
                    { key: '6-s-衬衣-1', x: 1300, y: 300 },
                    { key: '6-pl-头枕-8', x: 1600, y: 300 },
                    { key: '6-op-罩裤-6', x: 700, y: 800 },
                    { key: '6-cpt-棉裤-4', x: 1000, y: 800 },
                    { key: '6-p-衬裤-2', x: 1300, y: 800 },
                    { key: '6-fpl-脚枕-9', x: 1600, y: 700 },
                    { key: '6-r-戒指-10', x: 1500, y: 900 },
                    { key: '6-b-手镯-11', x: 1700, y: 900 }
                ];

                this.fifthDialogQueue = [
                    { speaker: '人', text: 'wow! What a complete outfit! There are so many nice looking Burial clothes eh', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: '猫', text: '......', dialogKey: 'db-5-cat', fontSize: '80px' },
                    { speaker: '猫', text: 'These are not different styles of Burial clothes， they are meant to be worn by this lady all together.', dialogKey: 'db-5-cat', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'please put them on her in order, don t get them mixed up!', dialogKey: 'db-5-cat', fontSize: '80px' },
                    { speaker: '人', text: 'ok', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'there are a total of 7 Burial clothes，to be put on', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'first of all, please put the basic shirt on the The departed first, the shirt is the first top from the right, it doesnt have any other patterns', dialogKey: 'db-5-user', fontSize: '80px', trigger: [1], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Next, please dress the deceased in trousers, the first pair of trousers from the right.', dialogKey: 'db-5-user', fontSize: '80px', trigger: [2], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Next, please dress the deceased in the second shirt from the right, it has a pattern on the sleeves, this one is a cotton shirt', dialogKey: 'db-5-user', fontSize: '80px', trigger: [3], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Now, please dress the deceased in the second pair of trousers from the right, which have a pattern on the top.', dialogKey: 'db-5-user', fontSize: '80px', trigger: [4], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Now, please dress the deceased in the third blouse from the right, which has a pattern on it, this one is a smock.', dialogKey: 'db-5-user', fontSize: '80px', trigger: [5], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Next, please put on the last trouser from the right, which is a coverall with two simple stars.', dialogKey: 'db-5-user', fontSize: '80px', trigger: [6], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'And finally, please put on the last blouse from the right, which is a cotton robe.', dialogKey: 'db-5-user', fontSize: '80px', trigger: [7], displayDuration: 2000 },
                    { speaker: '人', text: 'Wow! That is a nice one！', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Yes, because it is the outermost layer of clothing, so it must be very fine', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'and now we have all our burial clothes on!', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: '人', text: '！That is great.', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'don t get too excited, we are not done yet', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Now, please put the head and foot pillows from the box under the departed', dialogKey: 'db-5-user', fontSize: '80px', trigger: [8, 9], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Lastly, put a ring and a bracelet on the departed', dialogKey: 'db-5-user', fontSize: '80px', trigger: [10, 11], displayDuration: 2000 },
                    { speaker: '人', text: '!!! It s over, I am so good', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Hmph! Well done, and congratulations on successfully completing these steps! Lets head back to the funeral home next', dialogKey: 'db-5-user', fontSize: '80px' }
                ];




                this.order_of_clothes = 0;

                // 加载完成后创建物品
                this.load.once('complete', () => {
                    // 定义一个物品对象列表
                    this.items = [];

                    // 创建物品并设置显示和拖动
                    items.forEach(item => {

                        const item_order = item.key.split('-')[3];
                        const draggableItem = this.add.image(item.x, item.y, item.key)
                            .setOrigin(0.5)
                            .setScale(0.9)   // 根据需求调整缩放比例
                            .setDepth(3);    // 设置深度，确保物品在正确的层级

                        draggableItem.setInteractive();
                        this.input.setDraggable(draggableItem);

                        // 拖动开始时的操作
                        draggableItem.on('pointerdown', () => {
                            // 可以在此设置物品被选中时的状态（例如改变物品颜色，或显示不同的提示）
                        });

                        // 拖动过程中
                        draggableItem.on('drag', (pointer, dragX, dragY) => {
                            draggableItem.x = dragX;
                            draggableItem.y = dragY;
                        });

                        // 拖动结束时判断物品是否在目标区域
                        draggableItem.on('dragend', (pointer, dragX, dragY) => {
                            // 获取 draggableItem 的中心点坐标

                            const itemCenterX = draggableItem.x;
                            const itemCenterY = draggableItem.y;

                            // 获取 this.oldMan 的中心点坐标
                            const oldManCenterX = this.oldMan.x;
                            const oldManCenterY = this.oldMan.y;

                            console.log("itemCenterX, itemCenterY:", itemCenterX, itemCenterY);
                            console.log("oldManCenterX, oldManCenterY:", oldManCenterX, oldManCenterY);

                            // 计算两者中心点之间的距离
                            const distance = Phaser.Math.Distance.Between(itemCenterX, itemCenterY, oldManCenterX, oldManCenterY);

                            // 如果距离小于 100，认为物品被放置在正确的位置
                            if (this.order_of_clothes == item_order && distance < 600) {
                                // 替换老人图片并删除物品
                                this.oldMan.setTexture(`6-${item.key.split('-')[1]}-老人${item.key.split('-')[2]}-${item_order}`); // 替换老人图片为对应的物品
                                draggableItem.destroy(); // 删除物品
                                draggableItem.alpha = 1;
                                // 停止闪烁动画

                                this.isPlacedCorrectly = true;
                            } else {
                                // 如果没有放到正确的位置，物品归位
                                this.tweens.add({
                                    targets: draggableItem,
                                    x: item.x,
                                    y: item.y,
                                    duration: 500,
                                    ease: 'Sine.easeInOut'
                                });
                            }
                        });

                        // 将物品添加到数组中
                        this.items.push(draggableItem);
                    });
                });

                // 启动加载
                this.load.start();

                // 启动对话
                this.fifthDialogManager = new DialogManager(this, {
                    dialogQueue: this.fifthDialogQueue,
                    onComplete: () => {
                        this.time.delayedCall(1000, () => {
                            this.oldMan.setTexture(`6-mu-老人化好妆-12`);

                            // 逐渐黑屏
                            const blackScreen = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000)
                                .setOrigin(0, 0);
                            blackScreen.alpha = 0;

                            this.tweens.add({
                                targets: blackScreen,
                                alpha: 1,
                                duration: 1000,
                                onComplete: () => {
                                    // 切换到下一个场景
                                    this.scene.start('Scene7');
                                }
                            });



                        });
                    }
                });

                this.fifthDialogManager.start();
            }
        });
    }



    async handleTrigger(trigger) {
        this.order_of_clothes = trigger;

        console.log(trigger, "triggered")

        // 获取目标物品
        const targetItem = this.items[this.order_of_clothes - 1];

        // 确保 targetItem 已经被正确加载并可操作
        if (!targetItem) {
            console.error('目标物品不存在');
            return;
        }

        // 实现闪烁效果（渐变变白）
        const blinkTween = this.tweens.add({
            targets: targetItem,
            alpha: { from: 1, to: 0.7 },
            duration: 500,
            yoyo: true,  // 往返闪烁
            repeat: -1,  // 无限次重复
            ease: 'Sine.easeInOut'
        });

        // 在闪烁动画完成后，等待用户拖拽正确物品
        this.isPlacedCorrectly = false;
        while (!this.isPlacedCorrectly) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        this.isPlacedCorrectly = false;
        blinkTween.stop();

        // 这时你可以等待用户操作并通过判断物品是否正确放置来进行下一步
        console.log(`Trigger ${trigger} completed.`);
        return true;
    }





}