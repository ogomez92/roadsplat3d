import { so } from './soundObject';
import { Street } from './street'
import { Objective } from './objective'
import { Road } from './road'
import { utils } from './utilities'
import 'resonance-audio';
const { ResonanceAudio } = require('resonance-audio')
import { Player } from './player'
import {content} from './main'
export class World {
	constructor(game, size = 100) {
		this.size = size;
		this.game = game
		this.dynamicObjects = []
		this.tiles = []
		this.context = new AudioContext()
		this.scene = new ResonanceAudio(this.context);
		this.scene.output.connect(this.context.destination)
		this.player = new Player(this)
	}
	generateTiles() {
		this.tiles=[]
		let lastStreet;
		for (let i = 1; i <= 3; i++) {
			this.tiles.push(new Street(this, i))
			lastStreet = i;
		}
		let tiles = Math.round(lastStreet + utils.randomInt(this.game.roadsPerLevel, lastStreet + this.game.roadsPerLevel + (this.game.level / 2)))
		let lastRoad = 0;
		for (let i = lastStreet + 1; i <= tiles; i++) {
			this.tiles.push(new Road(this, i))
			lastRoad = i;
		}
		this.tiles.push(new Objective(this, lastRoad + 1))
	}
	update() {
		for (let i = 0; i < this.dynamicObjects.length; i++) {
			if (!this.dynamicObjects[i].alive) {
				this.dynamicObjects[i].sound.pause()
				this.dynamicObjects.splice(i, 1)
				i--;
			} else {
				this.dynamicObjects[i].update()
			}
		}
	}
}