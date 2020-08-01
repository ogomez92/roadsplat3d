import { so } from './soundObject';
import { Coin } from './coin'
import { Street } from './street'
import { Objective } from './objective'
import { Road } from './road'
import { Bonus } from './bonus'
import { utils } from './utilities'
import { Car } from './car'
import 'resonance-audio';
const { ResonanceAudio } = require('resonance-audio')
import { Player } from './player'
import { content } from './main'
import { speech } from './tts';
export class World {
	constructor(game, size = 100) {
		this.size = size;
		this.greenLight = false

		this.game = game
		this.dynamicObjects = []
		this.tiles = []
		this.context = new AudioContext()
				this.scene = new ResonanceAudio(this.context);
this.scene.setAmbisonicOrder(3)
		this.scene.output.connect(this.context.destination)
		this.player = new Player(this)
		this.player.setMaxListeners(1000)
	}
	generateTiles() {
		this.player.removeAllListeners("step")
		this.player.removeAllListeners("blowup")
		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i].alive = false
			this.tiles[i].destroy();
			this.tiles.splice(i, 1)
			i--;
		}
		this.tiles = []
		let lastStreet = this.player.y;
		//the below line will sound weird, but I want as many streets as x squares the player can move to either side, so as to have a fair chance at targetting bonuses
		let lastStreetLimit = lastStreet + this.player.xLimit
		this.player.nearestStreet = lastStreet + 1
		for (let i = lastStreet + 1; i <= lastStreetLimit; i++) {
			this.tiles.push(new Street(this, i))
			lastStreet = i;
		}
		let tiles = Math.round(this.game.roadsPerLevel + (this.game.level / 2))
		let lastRoad = 0;
		this.player.nearestRoad = lastStreet + 1
		this.player.furthestStreet = lastStreet;
		//let generator = (this.player.nearestRoad + tiles) - tiles/2
		let generator = this.player.nearestRoad
		for (let i = lastStreet + 1; i <= lastStreet + tiles; i++) {
			if (generator == i) this.tiles.push(new Road(this, i, true))
			if (generator != i) this.tiles.push(new Road(this, i, false))
			lastRoad = i;
		}
		this.player.nearestObjective = lastRoad + 1
		this.player.furthestRoad = lastRoad;
		this.tiles.push(new Objective(this, lastRoad + 1))
		//item spawning
		let chance = utils.randomInt(1, 1)
		for (let i = 1; i <= chance; i++) {
			let x = utils.randomInt(0 - this.player.xLimit, 0 + this.player.xLimit)
			let random = utils.randomInt(1, 2)
			switch (random) {
				default: break;
				//coins are dropped on the street
				case 1: this.dynamicObjects.push(new Coin(this, x, this.player.nearestStreet + this.player.xLimit, this.player.furthestStreet)); break;
				//bonuses appear anywhere on the road
				case 2: this.dynamicObjects.push(new Bonus(this, x, this.player.nearestRoad, this.player.furthestRoad)); break;
			}
		}
	}
	update() {

		for (let i = 0; i < this.dynamicObjects.length; i++) {
			if (!this.dynamicObjects[i].alive) {
				if (this.dynamicObjects[i].sound!=null) {
this.dynamicObjects[i].sound.removeAttribute("src")
				this.dynamicObjects[i].sound.load()
}
            this.dynamicObjects[i].sound=null
            this.dynamicObjects[i].mediaSource=null;
            this.dynamicObjects[i].source=null;

				if (this.dynamicObjects[i].canHorn) this.dynamicObjects[i].hornSound.removeAttribute("src")
				if (this.dynamicObjects[i].canHorn) this.dynamicObjects[i].hornSound.load()
				this.dynamicObjects.splice(i, 1)
				i--;
			} else {
				this.dynamicObjects[i].update()
			}
		}
		//leveling
		this.levelScore = ((this.game.level) * 1500)
		if (this.game.score >= this.levelScore) {
			if (!this.game.canLevelNotify) {
				this.game.pool.playStatic("level_notify", false)
				this.game.canLevelNotify = true

			}
			this.game.canLevel = true
		}

	}
}