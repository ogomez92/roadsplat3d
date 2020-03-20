import { speech } from './tts';
import {strings} from './strings'
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
	}

	start() {
		this.timer.start();
		this.world = new World(this, 80)
		if (!debug) this.world.generateTiles()
		speech.speak(strings.get("upArrowMove"))
	}
	update(dt) {
		if (this.input.isJustPressed(KeyEvent.DOM_VK_D)) {
			let debugRoad = new Road(this.world, 1)
			debugRoad.generateCar(content.numberOfVehicles)
		}
		this.world.update()
	}
	render() {
	}
}
export { Game }