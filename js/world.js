import { so } from './soundObject';
import { Street } from './street'
import { Objective } from './objective'
import { Road } from './road'
import { utils } from './utilities'
import 'resonance-audio';
const { ResonanceAudio } = require('resonance-audio')
import { Player } from './player'
import { content } from './main'
import { speech } from './tts';
export class World {
	constructor(game, size = 100) {

		this.size = size;
		this.game = game
		this.dynamicObjects = []
		this.tiles = []
		this.context = new AudioContext()
		this.convolution=this.context.createConvolver()
		this.scene = new ResonanceAudio(this.context);
		this.convolution.connect(this.scene.output)
		this.scene.output.connect(this.context.destination)
		this.player = new Player(this)
	}
	generateTiles() {
		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i].destroy();
		}
		this.tiles = []
		let lastStreet = this.player.y;
		let lastStreetLimit = lastStreet + utils.randomInt(10,20)
		this.player.nearestStreet=lastStreet+1
		for (let i = lastStreet + 1; i <= lastStreetLimit; i++) {
			this.tiles.push(new Street(this, i))
			lastStreet = i;
		}
		let tiles = Math.round(utils.randomInt(this.game.roadsPerLevel, this.game.roadsPerLevel + (this.game.level/1)))
		let lastRoad = 0;
		this.player.nearestRoad=lastStreet+1
		this.player.furthestStreet=lastStreet;
		for (let i = lastStreet + 1; i <= lastStreet+tiles; i++) {
			this.tiles.push(new Road(this, i))
			lastRoad = i;
		}
		this.player.nearestObjective=lastRoad+1
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