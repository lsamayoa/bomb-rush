define(['weapons/BaseWeapon'], function (BaseWeapon) {
  function Shotgun (game) {
    BaseWeapon.call(this, game, 'Weapon#Shotgun', 'mainSpritesheet', 'bullet.png');

    this.cooldown = 0;
    this.bulletSpeed = 600;
    this.fireRate = 800;

    return this;
  };

  Shotgun.prototype = Object.create(BaseWeapon.prototype);
  Shotgun.prototype.constructor = Shotgun;

  Shotgun.prototype.fire = function (source, rotation) {

    if(!this.canShoot()) return;
    this.cooldown = this.fireRate;

    var x = source.x + (Math.cos(rotation) * 40);
    var y = source.y + (Math.sin(rotation) * 40);
    rotation = rotation || source.rotation;

    this.getFirstExists(false).fire(x, y, rotation + Math.PI/4, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, rotation, this.bulletSpeed, 0, 0);
    this.getFirstExists(false).fire(x, y, rotation - Math.PI/4, this.bulletSpeed, 0, 0);
  };

  return Shotgun;
});