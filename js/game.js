import { speech } from './tts';
import { strings } from './strings'
import { debug, _, content } from './main'
import { SoundHandler } from './soundHandler'
import Timer from './timer';
import $ from 'jquery';
import { utils } from './utilities';
import { ScrollingText } from './scrollingText';
import { KeyboardInput } from './input.js';
import { KeyEvent } from './keycodes.js';
import { so } from './soundObject';
import { World } from './world'
import { Road } from './road';
class Game {
	constructor() {
		this.tick = so.create("tick")
		this.scoreSound = so.create("scoreCounter")
		this.scoreSound.volume = 0.4
		this.input = new KeyboardInput();
		this.pool = new SoundHandler()
		this.input.init();
		this.timer = Timer({
			update: () => this.update(),
			render: () => this.render()
		}, 1 / 45);
		this.score = 0
		this.level = 1
		this.spawnTime = 3000 - (this.level * 100)
		this.roadsPerLevel = 4
		this.coins = 0
	}

	start() {
		this.timer.start();
		this.world = new World(this, 80)
		if (!debug) this.world.generateTiles()
		speech.speak(strings.get("upArrowMove"))
	}
	update(dt) {
		if (this.input.isJustPressed(KeyEvent.DOM_VK_0)) {
			this.world.player.slowDown(10)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_D) && debug) {
			let debugRoad = new Road(this.world, 1)
			let number = content.numberOfVehicles
			number = 2
			debugRoad.generateCar(number)
			this.world.player.y = 1
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_UP)) {
			this.world.player.speedUp()
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_DOWN)) {
			this.world.player.slowDown()
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_C)) {
			speech.speak(this.coins + strings.get("coins"))
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_S)) {
			speech.speak(this.score + strings.get("points"))
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_X)) {
			speech.speak(this.world.player.y+", "+this.world.player.x+", "+this.world.player.z)
		}

		if (this.input.isJustPressed(KeyEvent.DOM_VK_L)) {
			speech.speak(strings.get("level") + this.level)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_H)) {
			speech.speak(this.world.player.hp + " " + strings.get("hp"))
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_1)) {
			this.world.player.slowDown(10)
			this.world.player.speedUp(1)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_2)) {
			this.world.player.slowDown(10)
			this.world.player.speedUp(2)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_3)) {
			this.world.player.slowDown(10)
			this.world.player.speedUp(3)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_4)) {
			this.world.player.slowDown(10)
			this.world.player.speedUp(4)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_5)) {
			this.world.player.slowDown(10)
			this.world.player.speedUp(5)
		}
		this.world.update()
	}
	render() {
	}
}
export { Game }