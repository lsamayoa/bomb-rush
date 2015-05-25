define(['Phaser'], function (Phaser) {
  
  function RegularBomb (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'mainSpritesheet', 'regular-bomb.png');
    // This should be added to a Level Group
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
  }

  RegularBomb.prototype = Object.create(Phaser.Sprite.prototype);
  RegularBomb.prototype.constructor = RegularBomb;

  RegularBomb.prototype.launch = function (x, y, speed) {
        speed = speed || 0;

        this.reset(x, y);

        this.body.velocity.set(0, speed);
  };

  return RegularBomb;
});