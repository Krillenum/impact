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
    collides: ig.Entity.COLLIDES.ACTIVE,
    animSheet: new ig.AnimationSheet('media/player.png', 16, 16),
    speed: 100,
    gravityFactor: 1,

    init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [0]);
    },

    update: function(){

        this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
        var aim = 0;

        if(ig.input.state('right')){
            this.vel.x = 100;
        } else if(ig.input.state('left')){
            this.vel.x = -100;
        } else {
            this.vel.x = 0;
        }
        
        if(ig.input.state('up')){
            aim = this.speed;
        } else if(ig.input.state('down')){
            aim = -this.speed;
        } else {
            aim = 0;
        }

        if(ig.input.state('jump') && this.standing){
            this.vel.y = -this.speed;
        }

        if(ig.input.state('shoot')){
            var x = this.pos.x + (this.flip ? -6 : this.size.x + 6);
            var y = this.pos.y + 8;

            var settings = {
              vel: { x: this.flip ? -200 : 200, y: aim } // Customize the projectile's velocity as needed
            };
    
            ig.game.spawnEntity(EntityProjectile, x, y, settings);
        }

       this.parent();
      }

    });
});
