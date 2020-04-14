import { GameObject } from './gameObject'
import { utils } from './utilities'
import { speech } from './scrollingText';

export class Tile {
    constructor(world, pos, type, name) {
        this.y = pos;
        this.type = type;
        this.hasSomething = false
        this.world = world;
        this.name = name;
        this.alive = true
        this.world.player.on("step" + this.y, (() => {
            this.step()
        }))
    }
    step() {
        let scoreType = this.type
        if (this.type == 0) scoreType = 1;
        let score = scoreType * this.world.player.currentSpeed
        if (this.type != 2) {
            clearInterval(this.world.player.scoreTimeout)
            this.world.player.levelCap = this.world.game.level
            if (this.world.player.levelCap > 15) this.levelCap = 15

        }
        this.world.game.pool.playStatic("steps/" + this.name + utils.randomInt(1, 3), 0)
        this.world.player.tileType = this.type
    }
    update() {

    }
    destroy() {
    }
}