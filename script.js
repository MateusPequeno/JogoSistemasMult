class Bullet extends Phaser.Physics.Arcade.Sprite
{
    constructor (scene, x, y)
    {
        super(scene, x, y, 'bullet');
    }

    fire (x, y)
    {
        this.body.reset(x, y);

        this.setActive(true);
        this.setVisible(true);

        this.setVelocityY(-300);
    }

    preUpdate (time, delta)
    {
        super.preUpdate(time, delta);

        if (this.y <= -32)
        {
            this.setActive(false);
            this.setVisible(false);
        }
    }
}
class Bullets extends Phaser.Physics.Arcade.Group
{
    constructor (scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 1,
            key: 'bullet',
            active: false,
            visible: false,
            classType: Bullet
        });
    }

    fireBullet (x, y)
    {
        let bullet = this.getFirstDead(false);

        if (bullet)
        {
            bullet.fire(x, y);
        }
    }
}

class StaffWitch extends Phaser.GameObjects.Sprite {
   constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('staffwitch');
        this.setPosition(x, y);
    }  
}
class Obstaculo extends Phaser.GameObjects.Sprite{
 constructor (scene, x, y)
    {
        super(scene, x, y);

        this.setTexture('obstaculo');
        this.setPosition(x, y);
    }  
}
function preload() {
    this.load.image('bck', 'assets/BackgroundTeste.png');
     this.load.image('bullet', 'assets/bulletTest.png');
    this.load.image('obstaculo', 'assets/Obstaculo.png');
    this.load.spritesheet('personagem','assets/sumika.png', { frameWidth:32, frameHeight:48 });
 //  this.load.image('staffwitch', 'assets/staffwitch.png');
    this.load.spritesheet('staffwitch', 'assets/staffwitch.png',
     { frameWidth:150, frameHeight:120 });

  
}

function create() {
  

    this.add.image(191,224,'bck');
    var personagem = this.physics.add.sprite(300,300,'personagem').setScale(0.65);
    this.add.existing(new StaffWitch(this, 290,150 ));
    this.add.existing(new StaffWitch(this, 90,150 ));
    this.bullets = new Bullets(this);
   // this.add.existing(new Obstaculo(this,100,250)).setScale(1);
    //this.add.existing(new Obstaculo(this,100,310)).setScale(1);
    personagem.setCollideWorldBounds(true);

    /*this.input.on('pointerdown', (pointer) => {

            this.bullets.fireBullet(this.personagem.x, this.personagem.y);

        });*/
    this.anims.create({
      key: 'stopped',
      frames:[{key : 'personagem', frame:4}],
      framerate: 20
    });
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('personagem',{
        start: 10, end: 10
      }),
        framerate: 10,
        repeat: -1
    });
        this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('personagem',{
        start: 20, end: 20
      }),
        framerate: 10,
        repeat: -1
    });
     this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('personagem',{
        start: 0, end: 0
      }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('personagem',{
        start: 0, end: 0
      }),
        framerate: 10,
        repeat: -1
    });

    this.personagem = personagem;
}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.addCapture('spacebar');
    var personagem = this.personagem;
    var bruxa1 = this.bruxa1;
    if(cursors.up.isDown){
      this.bullets.fireBullet(this.personagem.x, this.personagem.y);
      }
    if(cursors.left.isDown){
      personagem.setVelocityX(-160);
      personagem.anims.play('left',true);
    }
    else if(cursors.right.isDown){
      personagem.setVelocityX(160);
      personagem.anims.play('right',true);
      
      } 
        else{
    personagem.setVelocityX(0);
    personagem.setVelocityY(0);
    personagem.anims.play('stopped');
    }
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
    scene:
    {
      preload: preload,
        create: create,
        update: update
    }
    
};

let game = new Phaser.Game(config);

