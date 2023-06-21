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
  size: { x: 16, y: 16 },
  collides: ig.Entity.COLLIDES.PASSIVE,
  animSheet: new ig.AnimationSheet('media/enemy.png', 16, 16),
  speed: 50,
  shootTimer: null, // Timer variable to track shooting interval

  init(x, y, settings) {
    this.parent(x, y, settings);
    this.addAnim('idle', 1, [0]);

    this.shootTimer = new ig.Timer(); // Initialize the shoot timer
  },

  update: function(){

    var player = ig.game.getEntitiesByType( EntityPlayer ) [0];

    if( player.pos.x < this. pos.x){
      this.vel.x = -this.speed;
    } else {
      this.vel.x = this.speed;
    }

    if( player.pos.y < this.pos.y - 8 && player.pos.y > this.pos.y + 8 && this.shootTimer.delta() > 0.5){
      aim = {x: 0, y:0};

      if(player.pos.x < this.pos.x){
        aim.x  = -200;
      } else {
        aim.x = 200;
      }

      var settings = {
        vel: { x: aim.x, y: aim.y } // Customize the projectile's velocity as needed
      };

      ig.game.spawnEntity(EntityProjectile, x, y, settings);
      this.shootTimer.reset(); // Reset the shoot timer
    }

      this.parent();
    }
  });
});