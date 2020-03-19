import { GameObject } from './gameObject'
import {speech} from './tts'
export class Car extends GameObject {
    constructor(world, x, y, width, height, depth, sound = "car", speed,side) {
        super(world, sound, x, y, 1, 2, 1, 0.5)
        this.speed = speed;
        this.side=side;
    }
    update() {
        
        if (this.side==2) this.x += this.speed;
        if (this.side==1) this.x -= this.speed;
        if (this.x >= this.world.size / 2 || this.x<=(this.world.size/2)*-1) {
            this.alive = false;
        } else {
            this.source.setPosition(this.x, this.y, this.z)
        }
    }
}