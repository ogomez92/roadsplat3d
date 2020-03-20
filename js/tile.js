import { GameObject } from './gameObject'
import utils from 'sono/core/utils/utils';

export class Tile {
    constructor(world, pos, type, name) {
        this.y = pos;
        this.type = type;
        this.hasSomething = false
        this.world = world;
        this.name = name;
    }
    step() {
        this.world.game.pool.playStatic("./steps/"+name+utils.randomInt(1,3), 0)
    }
    update() {

    }
}