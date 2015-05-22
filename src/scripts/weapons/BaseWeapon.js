define(['Phaser', 'Bullet'], function (Phaser, Bullet) {
  function BaseWeapon (game, key, bulletKey, bulletFrame) {

      Phaser.Group.call(this, game, game.world, key, false, true, Phaser.Physics.ARCADE);

      this.cooldown = 0;
      this.bulletSpeed = 600;
      this.fireRate = 300;

      for (var i = 0; i < 64; i++)
      {
          this.add(new Bullet(game, bulletKey, bulletFrame), true);
      }

      return this;

  };

  BaseWeapon.prototype = Object.create(Phaser.Group.prototype);
  BaseWeapon.prototype.constructor = BaseWeapon;

  BaseWeapon.prototype.update = function () {
      if (this.cooldown > 0) this.cooldown -= this.game.time.elapsedMS;
  }

  BaseWeapon.prototype.canShoot = function () {
      return this.cooldown <= 0;
  }
  
  return BaseWeapon;
});