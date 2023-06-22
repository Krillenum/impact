ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'game.entities.projectile'
)
.defines(function () {
EntityPlayer = ig.Entity.extend({
    
    // Basic variables representing the bullet entity (size, collision type, animation, speed, gravity, and bool and int)
    size: { x: 16, y: 16 },
    collides: ig.Entity.COLLIDES.PASSIVE,
    animSheet: new ig.AnimationSheet('media/player_anim.png', 16, 16),
    speed: 100,
    gravityFactor: 1,
    shootTimer: null,  // This special variable is a Timer which will be initialised
    facingRight: true,
    inMotion: false,
    health: 3,


    init: function(x, y, settings) {
        this.parent(x, y, settings);
        //We initialise each different animation
        this.addAnim('moving', 1, [0]);
        this.addAnim('notMoving', 1, [1]);
        this.addAnim('crouching', 1, [2]);

        this.shootTimer = new ig.Timer(); // Initialize the shoot timer

    },

    // Deal damage to the player, can be called from other entities
    receiveDamage: function(amount, from) {
        this.health -= amount;
    },

    update: function(){

        // Initialise more variables, important for the update
        this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
        var aim = { x: 0, y: 0};
        var up = false;
        var down = false;

        // Pplayer dies when his health is at 0
        if(health == 0){
            this.kill();
        }

        // implement each input and their effect.   here is running right
        if(ig.input.state('right')){
            this.vel.x = 100;
            facingRight = true;
            inMotion = true;
        } else if(ig.input.state('left')){          // here is running left
            this.vel.x = -100;
            facingRight = false;
            inMotion = true;
        } else {                                    // here is standing immobile
            this.vel.x = 0;
            inMotion = false;
        }
        
        if(ig.input.state('up')){                   // here is aiming upwards
            up = true;
            down = false;
        } else if(ig.input.state('down')){          // here is aiming downwards
            down = true;
            up = false;
        } 

        if(ig.input.state('jump') && this.standing){// here is jumping
            this.vel.y = -(this.speed * 2);
        }

        if(ig.input.state('shoot') && this.shootTimer.delta() > 0.5){   // here is for shooting. Shooting has multiple phases so it requires different checks.

                //This determines the initial position on the x axis (different when facing left/right) of the bullet to be shot
                if(facingRight == true){
                    var x = this.pos.x + 18;
                }else{
                    var x = this.pos.x - 2;
                }
            
                //this determine the initial position on the y axis (different when crouching) of the bullet to be shot
                if(!inMotion && down && this.standing){
                    var y = this.pos.y + 16;
                } else{
                    var y = this.pos.y + 8;
                }

                //this checks if he player is aiming straight upwards
                if(this.standing && !inMotion && up){

                    aim.x = 0;
                    aim.y = -(this.speed * 2);

                }  else if(!this.standing && !inMotion && down){ // this checks if he is aiming straight downwards

                    aim.x = 0;
                    aim.y = this.speed * 2;

                } else if(inMotion){                            // this checks if the player, while moving, is aiming:

                    if(facingRight == true){                    // right
                        aim.x = this.speed * 2;
                    } else {                                    // left
                        aim.x = -(this.speed * 2);
                    }

                    if(up){                                     // diagonally up
                        aim.y = -(this.speed * 2);
                    } else if(down){                            // diagonally down
                        aim.y = this.speed * 2;
                    } else{
                        aim.y = 0;
                    }

                } else {                                        // this checks if the player is aiming left/right while standing still

                    aim.y = 0;

                    if(facingRight == true){
                        aim.x = this.speed * 2;
                    } else {
                        aim.x = -(this.speed * 2);
                    }
                
            }

            // Create the "settings" variable with the bullet direction checked above
            var settings = {
              vel: { x: aim.x, y: aim.y } 
            };
    
            // Spawn the entity, will only be done if the last entity spawned was more than 0.5s ago (basically firerate is 2 bullet per second)
            ig.game.spawnEntity(EntityProjectile, x, y, settings);
            this.shootTimer.reset(); 
        }

        // Update the animation frame + the size of the player when crouching
        if(!inMotion && down && this.standing){
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
