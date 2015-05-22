define('Weapon', ['Phaser', 'Bullet'], function (Phaser, Bullet) {

    var Weapon = {};

    Weapon.SingleBullet = function (game) {

        Phaser.Group.call(this, game, game.world, 'Weapon#SingleBullet', false, true, Phaser.Physics.ARCADE);

        this.nextFire = 0;
        this.bulletSpeed = 600;
        this.fireRate = 100;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'mainSpritesheet', 'bullet.png'), true);
        }

        return this;

    };

    Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
    Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

    Weapon.SingleBullet.prototype.fire = function (source, rotation) {

        if (this.game.time.time < this.nextFire) { return; }

        var x = source.x + (Math.cos(rotation) * 30);
        var y = source.y + (Math.sin(rotation) * 30);
        rotation = rotation || source.rotation;

        this.nextFire = this.game.time.time + this.fireRate;

        this.getFirstExists(false).fire(x, y, rotation, this.bulletSpeed, 0, 0);

    };


    Weapon.Shotgun = function (game) {

        Phaser.Group.call(this, game, game.world, 'Weapon#Shotgun', false, true, Phaser.Physics.ARCADE);

        this.cooldown = 0;
        this.bulletSpeed = 600;
        this.fireRate = 800;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'mainSpritesheet', 'bullet.png'), true);
        }

        return this;

    };

    Weapon.Shotgun.prototype = Object.create(Phaser.Group.prototype);
    Weapon.Shotgun.prototype.constructor = Weapon.Shotgun;

    Weapon.Shotgun.prototype.update = function () {
        if (this.cooldown > 0) this.cooldown -= this.game.time.elapsedMS;
    }

    Weapon.Shotgun.prototype.canShoot = function () {
        return this.cooldown <= 0;
    }

    Weapon.Shotgun.prototype.fire = function (source, rotation) {

        if(!this.canShoot()) return;

        var x = source.x + (Math.cos(rotation) * 40);
        var y = source.y + (Math.sin(rotation) * 40);
        rotation = rotation || source.rotation;

        this.cooldown = this.fireRate;


        this.getFirstExists(false).fire(x, y, rotation + Math.PI/4, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, rotation, this.bulletSpeed, 0, 0);
        this.getFirstExists(false).fire(x, y, rotation - Math.PI/4, this.bulletSpeed, 0, 0);

    };

    return Weapon;
});