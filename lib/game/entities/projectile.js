ig.module(
    'game.entities.projectile'
)
.requires(
    'impact.entity'
)
.defines(function () {
    EntityProjectile = ig.Entity.extend({
        size: {x: 4, y: 4},
        collides: ig.Entity.COLLIDES.ACTIVE,
        animSheet: new ig.AnimationSheet('media/player_bullet.png', 4, 4),

        init(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('flying', 0.1, [0, 1, 2, 3]);
        },

        update: function(){
            this.parent();
        }
    });
});
