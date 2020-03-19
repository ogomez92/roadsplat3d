import { GameObject } from './gameObject'
export class Car extends GameObject {
    constructor(world, x, y, width, height, depth, sound = "car", speed) {
        super(world, sound, x, y, 1, 2, 1, 0.5)
        this.speed = speed;
    }
    update() {
        this.x += this.speed;
        if (this.x >= this.world.size / 2) {
            this.alive = false;
        } else {
            this.source.setPosition(this.x, this.y, this.z)
        }
    }
}