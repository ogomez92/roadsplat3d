import { GameObject } from './gameObject'
const EventEmitter = require('events');
export class Player extends GameObject {
    constructor(world) {
        super(world, "", 0, 0, 1.6, 1, 0.5, 1.6)
        this.world.scene.setListenerPosition(this.x, this.y, this.z)
    }
    findNearestRoad() {
        let distance = 100;
        this.world.tiles.forEach((v, i) => {
            if (v.type != 1) return;
            if (v.x < this.x) return;
            if (v.x - this.x < distance) distance = v.x - this.x;
        })
        return distance;
    }
}
