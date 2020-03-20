import { GameObject } from './gameObject'
import { speech } from './tts'
export class Car extends GameObject {
    constructor(world, tile, x, y, width, height, depth, sound = "car", speed, side,z=1) {
        super(world, sound, x, y, z, width, height, depth)
        this.speed = speed;
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
    update() {

        if (this.side == 2) this.x += this.speed;
        if (this.side == 1) this.x -= this.speed;
        if (this.x >= this.world.size / 2 || this.x <= (this.world.size / 2) * -1) {
            this.alive = false;
            this.tile.hasSomething = false
        } else {
            this.source.setPosition(this.x, this.y, this.z)
        }
    }
}