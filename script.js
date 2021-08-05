function preload() {
    this.load.image('personagem', 'assets/sumika.png');
    this.load.image('bck', 'assets/BackgroundTeste.png');
    
}

function create() {
    this.add.image(191,224,'bck');
    var personagem = this.physics.add.sprite(200,200,'personagem').setScale(0.65);
    var bruxa2 = this.physics.add.sprite(300,100,'mob').setScale(0.75);
   // var platform = this.physics.add.staticGroup();
    //platform.create(80,90,'mob').setScale(0.75);
   // platform.create(190,85,'mob').setScale(0.75);
    //platform.create(300,90,'mob').setScale(0.75);

    var bruxa1 = this.physics.add.sprite(100,100,'brx').setScale(0.75);
    
    this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
    this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

    this.player = this.physics.add.image(config.width / 2, config.height / 2, 'player').setScale(0.15, 0.15);
    this.player.setCollideWorldBounds(true);
}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if ((cursors.left.isDown || this.a.isDown) || (cursors.right.isDown || this.d.isDown)) this.player.setVelocityX(cursors.left.isDown || this.a.isDown ? -160 : 160);
    else this.player.setVelocityX(0);
    if ((cursors.up.isDown || this.w.isDown) || (cursors.down.isDown || this.s.isDown)) this.player.setVelocityY(cursors.up.isDown || this.w.isDown ? -160 : 160);
    else this.player.setVelocityY(0);
}

const config = {
    type: Phaser.AUTO,
    width: 382,
    height: 448,
    backgroundColor: '#f9f9f9',
    autoCenter: Phaser.Scale.CENTER_BOTH,
        physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);