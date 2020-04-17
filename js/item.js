import { GameObject } from './gameObject'
import { utils } from './utilities'
import { speech } from './tts'
export class Item extends GameObject {
    constructor(world, x, y, sound) {
        super(world, sound, x, y, 0, 1, 1, 1)
        this.world.player.on("step" + this.y, (() => {
            if (this.world.player.x == this.x) this.step()
        }))
        this.world.player.on("step" + (this.y + 1), (() => {
            this.destroy()
        }))
        this.world.player.on("x" + this.x, (() => {
            if (!this.alive) return;
            let distance = Math.round(utils.distance(this.world.player.x, this.world.player.y, this.x, this.y))
            if (distance < 8) {
                this.world.player.target.replay()
            }
        }))
    }
    step() {
    }
    update() {

    }
}