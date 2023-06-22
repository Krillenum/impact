ig.module(
  'game.entities.enemy'
)
.requires(
  'impact.entity',
  'game.entities.player',
  'game.entities.projectile'
)
.defines(function () {
EntityEnemy = ig.Entity.extend({

  // Basic variables representing the bullet entity (size, collision type, animation, speed, timers)
  size: { x: 16, y: 16 },
  collides: ig.Entity.COLLIDES.PASSIVE,
  animSheet: new ig.AnimationSheet('media/enemy.png', 16, 16),
  speed: 50,
  shootTimer: null, // This special variable is a Timer which will be initialised

  // entity constructor
  init(x, y, settings) {
    this.parent(x, y, settings);
    this.addAnim('idle', 1, [0]);

    this.shootTimer = new ig.Timer(); // Initialize the shoot timer
  },

  // update function which is called every frame
  update: function(){

    //This variable enables us to get a reference to the player entity, letting us call some of his function or giving us access to things like his position
    var player = ig.game.getEntitiesByType( EntityPlayer ) [0];

    //This checks where is the player, and in which direction the enemy should go to run toward the player
    if( player.pos.x < this. pos.x){
      this.vel.x = -this.speed;
    } else {
      this.vel.x = this.speed;
    }

    // Just like for the player entity, here is the shooting function. It first checks if the player is in front of the enemy and at the same level, and
    // if the last shot was more than 0.5 seconds ago
    if( player.pos.y < this.pos.y - 8 && player.pos.y > this.pos.y + 8 && this.shootTimer.delta() > 0.5){
      aim = {x: 0, y:0};

      // initialise the direction in which the bullet will fly
      if(player.pos.x < this.pos.x){
        aim.x  = -200;
      } else {
        aim.x = 200;
      }

      // create the settings variable which holds the information about the balls direction, and will be called with the constructor of the projectiles "spawnEntity"
      var settings = {
        vel: { x: aim.x, y: aim.y } 
      };

      //Spawn the bullet with our bvalues
      ig.game.spawnEntity(EntityProjectile, x, y, settings);
      this.shootTimer.reset(); // Reset the shoot timer
    }

      this.parent();
    }
  });
});