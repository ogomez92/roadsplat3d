import { speech } from './tts';
import Timer from './timer';
import $ from 'jquery';
import { utils } from './utilities';
import { ScrollingText } from './scrollingText';
import { KeyboardInput } from './input.js';
import { KeyEvent } from './keycodes.js';
import { so } from './soundObject';
import { World } from './world'
class Game {
	constructor() {
		this.input = new KeyboardInput();
		this.input.init();
		this.timer = Timer({
			update: () => this.update(),
			render: () => this.render()
		}, 1 / 45);
		this.score = 0
		this.level = 0
		this.spawnTime = 3000-(level*100)
	}

	start() {
		this.timer.start();
		this.world = new World(this,100)
	}
	update(dt) {
		if (this.input.isJustPressed(KeyEvent.DOM_VK_D)) {
		}
		this.world.update()
	}
	render() {
	}
}
export { Game }