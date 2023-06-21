ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function () {
EntityPlayer = ig.Entity.extend({
    
        size: { x: 16, y: 16 },
        collides: ig.Entity.COLLIDES.ACTIVE,
        animSheet: new ig.AnimationSheet('media/player.png', 16, 16),
        speed: 100,
        gravityFactor: 1, // Adjust the value to control gravity's effect on the player

      init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [0]);
      },

      update: function(){

        this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;

        if(ig.input.state('right')){
            this.vel.x = 100;
        } else if(ig.input.state('left')){
            this.vel.x = -100;
        } else {
            this.vel.x = 0;
        }
        /*
        if(ig.input.state('up')){

        } else if(ig.input.state('down')){

        } else {

        }
        */

        if(ig.input.state('jump') && this.standing){
            this.vel.y = -this.speed;
        }

        /*
        if(ig.input.state('shoot')){

        }
        */
       this.parent();
      }

    });
});
