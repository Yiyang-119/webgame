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
                fontSize: '60px',
                color: '#fffff0',
                wordWrap: { width: 1000, useAdvancedWrap: true }
            }
        };

        // 定义对话队列时，只需写特有属性
        this.dialogQueue = [
            { speaker: '死者家属', text: '死者家属:你好！', dialogKey: 'db-5-user', textOffsetX: 0, textOffsetY: 0 },
            { speaker: '人', text: '你好，我是Atropos\'殡仪馆的工作人员！现在由我负责林宥茹女士的后事，请您放心交给我。床上那位女士是林宥茹女士吗？', dialogKey: 'db-5-user' },
            { speaker: '猫', text: '【喵一声】表现的不错', dialogKey: 'db-5-cat' },
            { speaker: '死者家属', text: '死者家属:是的，那是我妈妈', dialogKey: 'db-5-user' },
            { speaker: '死者家属', text: '死者家属:【看着猫，面露困惑】这里怎么会有一只猫？', dialogKey: 'db-5-user' },
            { speaker: '人', text: '哈哈，这是本店的吉祥物，您放心，他是一只聪明的猫，会远离咱们的处理现场的', dialogKey: 'db-5-user' },
            { speaker: '猫', text: '【喵】你说谁吉祥物？', dialogKey: 'db-5-cat' },
            { speaker: '死者家属', text: '死者家属:【点点头】好的，没事，反正我妈妈生前也比较喜欢猫....', dialogKey: 'db-5-user' },
            { speaker: '死者家属', text: '死者家属:【哽咽】您开始处理吧', dialogKey: 'db-5-user' },
            { speaker: '人', text: '好的，您节哀。我开始处理了', dialogKey: 'db-5-user' }
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
                    { speaker: '人', text: '（这位女士神情看起来很幸福，想来也是寿终正寝了）', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: '猫', text: '人类！你发什么呆！！快把草席拿出来呀', dialogKey: 'db-5-cat', fontSize: '80px' },
                    { speaker: '人', text: '哦哦，好的', dialogKey: 'db-5-user', fontSize: '80px' },
                ];

                this.secondDialogManager = new DialogManager(this, {
                    dialogQueue: this.secondDialogQueue,
                    onComplete: () => {
                        // 第二轮对话结束后，为老人添加点击交互，将其移动到草席上
                        this.strawMat = this.add.image(this.centerX, this.centerY + 700, 'sm-6').setScale(1).setDepth(1);
                        this.thirdDialogQueue = [
                            { speaker: '猫', text: '现在将她放在草席上', dialogKey: 'db-5-cat', fontSize: '80px' }
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
                        { speaker: '猫', text: '现在打开你随身携带的箱子', dialogKey: 'db-5-cat', fontSize: '80px' },
                        { speaker: '人', text: '收到', dialogKey: 'db-5-user', fontSize: '80px' },
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
                    { speaker: '人', text: '哇！好齐全的东西！！有好多好看的寿衣诶', dialogKey: 'db-5-cat', fontSize: '80px' },
                    { speaker: '猫', text: '......', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: '猫', text: '这些寿衣不是不同款式的，是要给这位女士全部穿上的。', dialogKey: 'db-5-cat', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Atropos：请按顺序给她穿上，不要弄混了！！', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: '人', text: '好的', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Atropos：一共要穿7件寿衣', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Atropos：首先，请先给死者穿上最基本的衬衣，衬衣是从右边数第一件上衣，它没有什么别的花纹', dialogKey: 'db-5-user', fontSize: '80px', trigger: [1], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Atropos：接下来，请给死者穿上衬裤，从右边数第一件裤子', dialogKey: 'db-5-user', fontSize: '80px', trigger: [2], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Atropos：下一步，请给死者穿上从右边数第二件上衣，它在袖子上有花纹，这一件是棉衣', dialogKey: 'db-5-user', fontSize: '80px', trigger: [3], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Atropos：现在，请给死者穿上从右边数第二件裤子，它的上面有花纹，这一件是棉裤', dialogKey: 'db-5-user', fontSize: '80px', trigger: [4], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Atropos：接下来，请给死者穿上从右边数第三件上衣，它的衣服上面有花纹，这一件是罩衣', dialogKey: 'db-5-user', fontSize: '80px', trigger: [5], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Atropos：然后请给死者穿上从右边数最后一件裤子，这一件是罩裤，只有两个简单的星星图案', dialogKey: 'db-5-user', fontSize: '80px', trigger: [6], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Atropos：最后请给死者穿上从右边数最后一件上衣，这一件是棉袍', dialogKey: 'db-5-user', fontSize: '80px', trigger: [7], displayDuration: 2000 },
                    { speaker: '人', text: '哇！这一件好好看！', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Atropos：是的，因为这是最外层的衣服，所以要很精良', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Atropos：现在我们的所有寿衣就穿好了', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: '人', text: '！太好了', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Atropos：不要高兴太早，咱们还没有结束', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Atropos：现在，请先后给老人枕上箱子里的头枕和脚枕', dialogKey: 'db-5-user', fontSize: '80px', trigger: [8, 9], displayDuration: 2000 },
                    { speaker: 'Atropos', text: 'Atropos：最后一步，给老人带上戒指和手镯', dialogKey: 'db-5-user', fontSize: '80px', trigger: [10, 11], displayDuration: 2000 },
                    { speaker: '人', text: '！！！结束了，我好厉害', dialogKey: 'db-5-user', fontSize: '80px' },
                    { speaker: 'Atropos', text: 'Atropos：哼！表现的不错，恭喜你顺利完成这些步骤！接下来我们回殡仪馆吧', dialogKey: 'db-5-user', fontSize: '80px' }
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
                            if (this.order_of_clothes == item_order && distance < 400) {
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