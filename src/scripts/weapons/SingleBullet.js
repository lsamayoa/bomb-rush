define(['weapons/BaseWeapon'], function (BaseWeapon) {
  function SingleBulletWeapon (game) {
    BaseWeapon.call(this, game, 'Weapon#SingleBullet', 'mainSpritesheet', 'bullet.png');
    return this;
  };

  SingleBulletWeapon.prototype = Object.create(BaseWeapon.prototype);
  SingleBulletWeapon.prototype.constructor = SingleBulletWeapon;

  SingleBulletWeapon.prototype.fire = function (source, rotation) {

    if(!this.canShoot()) return;

    this.cooldown = this.fireRate;

    var x = source.x + (Math.cos(rotation) * 40);
    var y = source.y + (Math.sin(rotation) * 40);
    rotation = rotation || source.rotation;

    this.getFirstExists(false).fire(x, y, rotation, this.bulletSpeed, 0, 0);
  };

  return SingleBulletWeapon;
});