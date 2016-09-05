import Phaser from 'phaser'
import Chord from '/src/imports/sprites/chord'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#fff'
  }

  preload () {
    this.load.image('chord', '/assets/images/chord.png')
  }

  create () {

    this.staves = [
      new Phaser.Line(16,124,964,124),
      new Phaser.Line(16,244,964,244),
      new Phaser.Line(16,364,964,364),
    ]
    this.anchors = [
      new Phaser.Rectangle(32, 124, 40, 8),
      new Phaser.Rectangle(272, 124, 40, 8),
      new Phaser.Rectangle(512, 124, 40, 8),
      new Phaser.Rectangle(752, 124, 40, 8),

      new Phaser.Rectangle(32, 244, 20, 8),
      new Phaser.Rectangle(152, 244, 20, 8),
      new Phaser.Rectangle(272, 244, 20, 8),
      new Phaser.Rectangle(392, 244, 20, 8),
      new Phaser.Rectangle(512, 244, 20, 8),
      new Phaser.Rectangle(632, 244, 20, 8),
      new Phaser.Rectangle(752, 244, 20, 8),
      new Phaser.Rectangle(872, 244, 20, 8),

      new Phaser.Rectangle(32, 364, 80, 8),
      new Phaser.Rectangle(512, 364, 80, 8),
    ];

    this.chord = new Chord({
      game: this.game,
      x: 20,
      y: 120,
      asset: 'chord'
    })

    this.game.add.existing(this.chord)

    this.chord.inputEnabled = true

    this.chord.input.enableDrag()
    this.chord.input.enableSnap(120, 120, true, true, 20, 0)

    this.chord.events.onInputOver.add( () => {
      this.game.canvas.style.cursor = 'pointer'
    })

    this.chord.events.onInputOut.add( () => {
      this.game.canvas.style.cursor = 'default'
    })

    this.chord.events.onDragStart.add( () => {
      this.game.canvas.style.cursor = 'move'
    })

    this.chord.events.onDragStop.add( () => {
      this.game.canvas.style.cursor = 'pointer'
    })

    this.chord.events.onDragStop.add( chord => {
      switch (chord.y) {
        case 120:
          switch (chord.x) {
            case 140:
              chord.x = 20
              break
            case 380:
              chord.x = 260
              break
            case 620:
              chord.x = 500
              break
            case 860:
              chord.x = 740
              break
          }
          break
      }
      chord.x > 860 ? chord.x = 860 : null
      chord.y > 380 ? chord.y = 380 : null
    })

  }

  render () {

    this.staves.forEach( stave => this.game.debug.geom(stave, '#333') )
    this.anchors.forEach( anchor => this.game.debug.geom(anchor, '#333') )

  }

}
