import Phaser from 'phaser'

var width = window.innerWidth * window.devicePixelRatio
var walkSpeed
var cursors
var player

export default class Play extends Phaser.State {
  create () {
    // Add your game content here

    // Set walking speed for players
    walkSpeed = width * 0.05

    //  We're going to be using physics, so enable the Arcade Physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    //  A simple background for our game
    this.game.add.sprite(0, 0, 'sky')

    // Create the player
    player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'frank')
    player.scale.setTo(2, 2)
    player.anchor.setTo(0.5, 0.5)
    player.direction = 1

    //  We need to enable physics on the player
    this.game.physics.arcade.enable(player)

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.1
    player.body.gravity.y = 2000
    player.body.collideWorldBounds = true

    //  Our two animations, walking left and right.
    player.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 8), 15, true)

    //  Our controls.
    cursors = this.game.input.keyboard.createCursorKeys()
  }

  update () {
    // Add your game logic here
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0

    if (cursors.left.isDown) {
      // Check and change direction
      if (player.direction !== 0) {
        player.scale.x *= -1
        player.direction = 0
      }

      //  Move to the left
      player.body.velocity.x = -walkSpeed
      player.animations.play('walk')
    } else if (cursors.right.isDown) {
      // Check and change direction
      if (player.direction !== 1) {
        player.scale.x *= -1
        player.direction = 1
      }

      //  Move to the right
      player.body.velocity.x = walkSpeed
      player.animations.play('walk')
    } else {
      //  Stand still
      player.animations.stop()
      player.frame = 0
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down) {
      player.body.velocity.y = -300
    }
  }
}
