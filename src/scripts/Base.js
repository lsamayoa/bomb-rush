define('Base', ['Phaser', 'weapons/SingleBullet'], function (Phaser, SingleBulletWeapon) {
  function Base (game, x, y, weapon) { 
    Phaser.Group.call(this, game, null, 'base');

    weapon = weapon || new SingleBulletWeapon(game);

    this.x = x;
    this.y = y;

    this.barrelSprite = this.create(0, 0, 'mainSpritesheet', 'base-barrel.png');
    this.barrelSprite.anchor.setTo(0, 0.5);

    this.domeSprite = this.create(0, 0, 'mainSpritesheet', 'base-dome.png');
    this.domeSprite.anchor.setTo(0.5, 1);

    this.currentWeapon = weapon;

  }

  Base.prototype = Object.create(Phaser.Group.prototype);
  Base.prototype.constructor = Base;

  Base.prototype.update = function () {
    var pointer = this.game.input.activePointer;
    this.aimTo(pointer.worldX, pointer.worldY);

    if(pointer.isDown){
      this.currentWeapon.fire(this, this.barrelSprite.rotation);
    }
  }

  Base.prototype.aimTo = function (x, y) {

    var deltaX = x - this.x;
    var deltaY = y - this.y;
    var angle = Math.atan2(deltaY, deltaX);

    this.barrelSprite.rotation = angle;
  };

  return Base;
});