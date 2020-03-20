import { so } from './soundObject';
import { Street } from './street'
import { utils } from './utilities'
import 'resonance-audio';
const { ResonanceAudio } = require('resonance-audio')
import { Player } from './player'
import { Car } from './car'
import { Tile } from './tile'
export class World {
	constructor(game, size = 100) {
		this.size = size;
		this.game = game
		this.dynamicObjects = []
		this.context = new AudioContext()
		this.scene = new ResonanceAudio(this.context);
		this.scene.output.connect(this.context.destination)
		this.player = new Player(this)
	}
	generateTiles() {
		for (let i = 1; i <= 3; i++) {
			this.dynamicObjects.push(new Street(this, i))
		}
	}
	update() {
		for (let i = 0; i < this.dynamicObjects.length; i++) {
			if (!this.dynamicObjects[i].alive) {
				this.dynamicObjects[i].sound.pause()
				this.dynamicObjects.splice(i, 1)
			} else {
				this.dynamicObjects[i].update()
			}
		}
	}
}