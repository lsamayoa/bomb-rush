require(['Phaser', 'Base', 'enemies/RegularBomb'], function (Phaser, Base, RegularBomb) {
  
  var game = new Phaser.Game(400, 800, Phaser.AUTO, 'bomb-rush', { preload: preload, create: create, update: update });

  function preload () {
    game.load.atlasJSONHash('mainSpritesheet', 'assets/bomb-rush-spritesheet.png', 'assets/bomb-rush-spritesheet.json');
  }

  function create () {
    game.stage.backgroundColor = '#124184';

    window.base = new Base(game, game.world.centerX, game.world.height);
    game.add.existing(base);

    window.bomb = new RegularBomb(game, game.world.centerX, 0);
    game.add.existing(bomb);
    bomb.launch(game.world.centerX, -bomb.height, 50);

  }

  function update () {

  }

});