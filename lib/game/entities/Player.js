ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.projectile'
)
.defines(function () {
EntityPlayer = ig.Entity.extend({
    
    size: { x: 16, y: 16 },
    collides: ig.Entity.COLLIDES.PASSIVE,
    animSheet: new ig.AnimationSheet('media/player_anim.png', 16, 16),
    speed: 100,
    gravityFactor: 1,
    shootTimer: null, // Timer variable to track shooting interval
    facingRight: true,
    inMotion: false,
    health: 3,


    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim('moving', 1, [0]);
        this.addAnim('notMoving', 1, [1]);
        this.addAnim('crouching', 1, [2]);

        this.shootTimer = new ig.Timer(); // Initialize the shoot timer

    },

    receiveDamage: function(amount, from) {
        // Reduce health by the specified amount
        this.health -= amount;
    },

    update: function(){

        this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
        var aim = { x: 0, y: 0};
        var up = false;
        var down = false;


        if(ig.input.state('right')){
            this.vel.x = 100;
            facingRight = true;
            inMotion = true;
        } else if(ig.input.state('left')){
            this.vel.x = -100;
            facingRight = false;
            inMotion = true;
        } else {
            this.vel.x = 0;
            inMotion = false;
        }
        
        if(ig.input.state('up')){
            up = true;
            down = false;
        } else if(ig.input.state('down')){
            down = true;
            up = false;
        } 

        if(ig.input.state('jump') && this.standing){
            this.vel.y = -(this.speed * 2);
        }

        if(ig.input.state('shoot') && this.shootTimer.delta() > 0.5){

                if(facingRight == true){
                    var x = this.pos.x + 18;
                }else{
                    var x = this.pos.x - 2;
                }
            
                if(!inMotion && down){
                    var y = this.pos.y + 16;
                } else{
                    var y = this.pos.y + 8;
                }

                if(this.standing && !inMotion && up){

                    aim.x = 0;
                    aim.y = -(this.speed * 2);

                }  else if(!this.standing && !inMotion && down){

                    aim.x = 0;
                    aim.y = this.speed * 2;

                } else if(inMotion){

                    if(facingRight == true){
                        aim.x = this.speed * 2;
                    } else {
                        aim.x = -(this.speed * 2);
                    }

                    if(up){
                        aim.y = -(this.speed * 2);
                    } else if(down){
                        aim.y = this.speed * 2;
                    } else{
                        aim.y = 0;
                    }

                } else {

                    aim.y = 0;

                    if(facingRight == true){
                        aim.x = this.speed * 2;
                    } else {
                        aim.x = -(this.speed * 2);
                    }
                
            }

            var settings = {
              vel: { x: aim.x, y: aim.y } // Customize the projectile's velocity as needed
            };
    
            ig.game.spawnEntity(EntityProjectile, x, y, settings);
            this.shootTimer.reset(); // Reset the shoot timer
        }

        if(!inMotion && down){
            this.currentAnim = this.anims.crouching;
            this.size.y = 8;
        } else if (inMotion){
            this.currentAnim = this.anims.moving;
            this.size.y = 16;
        } else {
            this.currentAnim = this.anims.notMoving;
            this.size.y = 16;
        }

       this.parent();
      }

    });
});
