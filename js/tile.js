import { GameObject } from './gameObject'
export class Tile {
    constructor(world, pos, type, sound) {
        this.y = pos;
        this.type = type;
        this.hasSomething = false
        this.world = world;
        this.sound = sound;
    }
    step() {
        this.world.game.pool.playStatic(sound, 0)
    }
    update() {

    }
}