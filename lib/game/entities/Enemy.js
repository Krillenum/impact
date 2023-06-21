ig.module(
  'game.entities.enemy'
)
.requires(
  'impact.entity',
  'game.entities.player'
)
.defines(function () {
EntityEnemy = ig.Entity.extend({
  size: { x: 16, y: 16 },
  collides: ig.Entity.COLLIDES.ACTIVE,
  animSheet: new ig.AnimationSheet('media/enemy.png', 16, 16),
  speed: 100,

  init(x, y, settings) {
    this.parent(x, y, settings);
    this.addAnim('idle', 1, [0]);
  },

  update: function(){
/*
    var player = ig.game.getEntitiesByType( EntityPlayer ) [0];

    if( player.pos.x < this. pos.x){
      this.vel.x = -this.speed;
    } else {
      this.vel.x = this.speed;
    }
*/
      this.parent();
    }
  });
});