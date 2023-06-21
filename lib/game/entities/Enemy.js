ig.module(
    'game.entities.enemy'
)
.requires(
    'impact.entity',
    //'impact.entities.player'
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

    /*
      update: function(){
        var PC = ig.game.getEntitiesByType( EntityPlayer ) [0];
        if( PC.pos.x < this. pos.x){
            this.vel.x = -100;
        } else {
            this.vel.x = 100;
        }
        this.parent();
      }
    */
      
    });
});