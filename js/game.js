import { speech } from './tts';
import { strings } from './strings'
import { save, increase, decrease, debug, _, content, data } from './main'
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
		this.canChangeSpeed = true
		this.bankedScore = 0
		this.canLevel = false
		this.canLevelNotify = false

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
		this.spawnTime = 2500
		this.roadsPerLevel = 5
	}

	start() {
		this.timer.start();
		this.world = new World(this, 80)
		if (!debug) this.world.generateTiles()
		//speech.speak(strings.get("upArrowMove"))
	}
	update(dt) {
		if (this.input.isJustPressed(KeyEvent.DOM_VK_0)) {
			if (data.stoppers >= 1) {
				this.world.game.pool.playStatic("use_stopper", false)
				data.stoppers--;
				save()
				this.world.player.slowDown(10)
			}
			else {
				speech.speak(strings.get("noStoppers"))
			}
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_D) && debug) {
			let debugRoad = new Road(this.world, this.world.player.y+1, true)
			let number = content.numberOfVehicles
			debugRoad.generateCar(number)
			debugRoad.generator = false
			this.world.player.y = 0
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_B)) {
			if (data.bombs >= 1 || debug) {
				this.world.player.throwBomb()
				if (!debug) data.bombs--;
				save();
			}
			else {
				speech.speak(strings.get("noBombs"))
			}
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_I)) {
			let nothing = true
			let str = ""
			if (data.jumps > 0) {
				nothing = false
				str += strings.get("iJumps", [data.jumps]) + ", "
			}
			if (data.bombs > 0) {
				nothing = false
				str += strings.get("iBombs", [data.bombs]) + ", "
			}
			if (data.stoppers > 0) {
				nothing = false
				str += strings.get("iStoppers", [data.stoppers]) + ", "
			}


			if (nothing) {
				speech.speak(strings.get("emptyInventory"))
			}
			else {
				speech.speak(str)
			}
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_UP)) {
			this.world.player.speedUp()
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_DOWN)) {
			this.world.player.slowDown()
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_C)) {
			speech.speak(data.coins + strings.get("coins"))
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_S)) {
			speech.speak(this.score + strings.get("points" + ", " + strings.get("bankedScore") + this.world.game.bankedScore))
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_X)) {
			speech.speak(this.world.player.nearestRoad + ", " + this.world.player.furthestRoad)
			speech.speak(this.world.player.x)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_L)) {
			speech.speak(strings.get("level") + this.level + " " + strings.get("ws") + this.world.size+" spawn time "+this.world.game.spawnTime)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_H)) {
			speech.speak(this.world.player.hp + " " + strings.get("hp"))
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_1) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)
			this.world.player.slowDown(10)
			this.world.player.speedUp(1)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_2) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)

			this.world.player.slowDown(10)
			this.world.player.speedUp(2)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_3) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)

			this.world.player.slowDown(10)
			this.world.player.speedUp(3)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_4) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)

			this.world.player.slowDown(10)
			this.world.player.speedUp(4)
		}
		if (this.input.isJustPressed(KeyEvent.DOM_VK_5) && this.canChangeSpeed) {
			this.canChangeSpeed = false; setTimeout(() => { this.canChangeSpeed = true }, 800)

			this.world.player.slowDown(10)
			this.world.player.speedUp(5)
		}
		this.world.update()
	}
	render() {
	}
}
export { Game }