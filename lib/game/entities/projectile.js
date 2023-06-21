ig.module(
    'game.entities.projectile'
)
.requires(
    'impact.entity'
)
.defines(function () {
    EntityProjectile = ig.Entity.extend({

        size: {x: 4, y: 4},
        collides: ig.Entity.COLLIDES.LITE,
        animSheet: new ig.AnimationSheet('media/player_bullet.png', 4, 4),
        speed: 1000,
        gravityFactor: 0,
        maxVel: {x: 1200, y: 1200},

        init(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('flying', 0.1, [0, 1, 2, 3]);
        },

        check: function(other) {
            if (other instanceof EntityPlayer) {
              other.receiveDamage(1, this);
              this.kill();
            }
            else if ( other instanceof EntityEnemy){
                other.kill();
                this.kill();
            }
        },

        update: function(){
            this.parent();
        },

        handleMovementTrace: function( res ) {
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        }

    });
});
