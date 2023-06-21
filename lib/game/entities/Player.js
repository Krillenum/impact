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

      init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.addAnim('idle', 1, [0]);
      },

      update: function(){

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

        if(ig.input.state('jump')){
            this.vel.y = -100;
        } else {
            this.vel.y = 0;
        }

        /*
        if(ig.input.state('shoot')){

        }
        */
       this.parent();
      }

    });
});
