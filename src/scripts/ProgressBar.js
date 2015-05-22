define('ProgressBar', ['Phaser'], function (Phaser) {
  function ProgressBar (game, x, y, width, height, max, curr) {
    this.bmd = game.add.bitmapData(width, height);
    Phaser.Sprite.call(this, game, x, y, this.bmd);

    this.max = max;
    this.curr = curr || max;
    this.renderBar();
  }

  ProgressBar.prototype = Object.create(Phaser.Sprite.prototype);
  ProgressBar.prototype.constructor = ProgressBar;

  ProgressBar.prototype.setValue = function (newVal) {
    this.curr = newVal;

    this.renderBar();
  }

  ProgressBar.prototype.renderBar = function () {
    var percent = this.curr / this.max;

    var bmd = this.bmd;
    bmd.clear();
    bmd.ctx.beginPath();
    bmd.ctx.moveTo(0,0);
    bmd.rect(0, 0, bmd.width*percent, bmd.height, 'white');
    bmd.ctx.closePath();
    bmd.render();
  }

  return ProgressBar;
});