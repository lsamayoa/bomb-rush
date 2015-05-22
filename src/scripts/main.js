require(['Phaser', 'Base', 'ProgressBar'], function (Phaser, Base, ProgressBar) {
  
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'bomb-rush', { preload: preload, create: create, update: update });

  function preload () {
    game.load.atlasJSONHash('mainSpritesheet', 'assets/bomb-rush-spritesheet.png', 'assets/bomb-rush-spritesheet.json');
  }

  function create () {
    window.base = new Base(game, game.world.centerX, game.world.height);
    game.add.existing(base);

  }

  function update () {

  }

});