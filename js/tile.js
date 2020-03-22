import { GameObject } from './gameObject'
import {utils} from './utilities'

export class Tile {
    constructor(world, pos, type, name) {
        this.y = pos;
        this.type = type;
        this.hasSomething = false
        this.world = world;
        this.name = name;
        this.alive=true
        this.world.player.on("step" + this.y, (() => {
            this.step()
        }))
    }
    step() {
        this.world.game.pool.playStatic("steps/" + this.name + utils.randomInt(1, 3), 0)
        this.world.player.tileType=this.type
    }
    update() {

    }
    destroy() {

    }
}