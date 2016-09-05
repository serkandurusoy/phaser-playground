import 'pixi'
import 'p2'
import Phaser from 'phaser'

import EditorState from '/src/imports/states/editor'

export default class SongEditor extends Phaser.Game {

  constructor () {

    let width = 980
    let height = 400

    super(width, height, Phaser.AUTO, 'song-editor', {
      create: () => {
        this.state.add('Editor', EditorState, false)
        this.state.start('Editor')
      }
    })

  }
}
