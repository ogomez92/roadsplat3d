import { GameObject } from './gameObject'
import { utils } from './utilities'
import { speech } from './tts'
export class StationaryObject extends GameObject {
    constructor(world, x, y, sound,loop=false) {
        super(world, sound, x, y, 0, 1, 1, 1)
        this.sound.loop=loop
    }
    destroy() {
        this.alive = false;
    }
    update() {

    }
}