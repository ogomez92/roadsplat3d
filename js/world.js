import { so } from './soundObject';
import { utils } from './utilities'
import 'resonance-audio';
const { ResonanceAudio } = require('resonance-audio')
import { Player } from './player'
import { Car } from './car'
export class World {
	constructor(size = 100) {
		this.size = size;
		this.dynamicObjects = []
		this.context = new AudioContext()
		this.scene = new ResonanceAudio(this.context);
		this.scene.output.connect(this.context.destination)
		this.player = new Player(this)
		this.generateCar()
	}
	generateCar() {
		let side = utils.randomInt(1, 2)
		let size = this.size / 2
		if (side == 1) size = size * 1
		if (side == 2) size = size * -1
		this.dynamicObjects.push(new Car(this, size, 2, 5, 1, 0.5, "car", 0.2, side))
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