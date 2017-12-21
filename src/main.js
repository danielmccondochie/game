import 'pixi'
import 'p2'
import Phaser from 'phaser'

import Boot from './states/Boot'
import Play from './states/Play'

class Game extends Phaser.Game {
  constructor () {
    super(3440, 1440, Phaser.AUTO, 'game')
    this.state.add('Boot', Boot)
    this.state.add('Play', Play)

    this.state.start('Boot')
  }
}

window.game = new Game()
