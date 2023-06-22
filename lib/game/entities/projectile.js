ig.module(
    'game.entities.projectile'
)
.requires(
    'impact.entity'
)
.defines(function () {
    EntityProjectile = ig.Entity.extend({

        // Basic variables representing the bullet entity (size, collision type, animation, speed, gravity, max velocity)
        size: {x: 4, y: 4},
        collides: ig.Entity.COLLIDES.LITE,
        animSheet: new ig.AnimationSheet('media/player_bullet.png', 4, 4),
        speed: 1000,
        gravityFactor: 0,
        maxVel: {x: 1200, y: 1200},

        // Initialisation function, this is basically the constructor of the entity, and manages where the entity will spawns into the level, as well as
        // so settings which can be explicitly changed like health, speed, ect...)
        init(x, y, settings){
            this.parent(x, y, settings);
            this.addAnim('flying', 0.1, [0, 1, 2, 3]);
        },



        // update function, which is called on every frame. This is very constant changes, like movement or input check will be added. There is nothing to add for projectile
        // as it's speed remain constant but we still need to call the parent so that the game engine can handle stuff that it already has in the update, like moving
        // the entity or gravity.
        update: function(){

            var player = ig.game.getEntitiesByType(EntityPlayer)[0];
            var enemy = ig.game.getEntitiesByType(EntityEnemy)[0];
          
            if (this.collidesWith(player)) {
              player.receiveDamage(1, this);
              this.kill();
            } else if (this.collidesWith(enemy)) {
              enemy.kill();
              this.kill();
            }
            
            this.parent();
        },

        // This is a function that is called implicitly by all subclass of entities, but I overwrite it here so that even if the Trace produced by this function
        // collides with a tilemap it will not ask for a stop but will force this entity to keep omving at "this" velocity. basically it ignore tilempa collision
        handleMovementTrace: function( res ) {
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        }

    });
});
