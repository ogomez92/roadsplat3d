import { GameObject } from './gameObject'
import {so} from './soundObject'
import { speech } from './tts';
import {utils} from './utilities'
const EventEmitter = require('events');
export class Player extends GameObject {
    constructor(world) {
        super(world, "", 0, 0, 1.6, 1, 0.5, 1.6)
        this.world.scene.setListenerPosition(this.x, this.y, this.z)
        this.speedUpSound=so.create("ui/speedUp")
        this.speedDownSound=so.create("ui/speedDown")
        this.speed = 650
        //speed 0 is unused, speeds 1 to 5 are manually attainable, speed 6 is a crawl and speed 7 is super speed.
        this.speeds = [
            0, 650, 530, 420, 350, 235, 890, 120
        ]
        this.speedModifier = 0
        this.currentSpeed = 0
    }
    move() {
        this.speedTimeout = setTimeout(() => {
            this.move()
        }, this.speeds[this.currentSpeed] - this.speedModifier)
        if (this.currentSpeed == 0) this.currentSpeed = 1;
        this.y += 1
        this.world.scene.setListenerPosition(this.x, this.y, this.z)
        this.emit("step" + this.y)
    }
    speedUp(number = 1) {
        if (this.currentSpeed == 0) {
            this.move()
            return;
        }
        this.currentSpeed += number;
        if (this.currentSpeed > 5) this.currentSpeed = 5
        this.speedUpSound.pitch=utils.getProportion(this.currentSpeed,1,5,0.8,1.2)
        this.speedUpSound.replay()

    }
    slowDown(number = 1) {
        this.currentSpeed -= number;
        //we don't want the player to be able to stop with the down arrow key, but if some item is forcing the player to stop, we can allow it.
        if (number == 1 && this.currentSpeed == 0) this.currentSpeed = 1;
        if (this.currentSpeed <= 0) {
            this.currentSpeed = 0;
            if (typeof this.speedTimeout !== "undefined") clearTimeout(this.speedTimeout)
        }
        this.speedDownSound.pitch=utils.getProportion(this.currentSpeed,1,5,0.8,1.2)
        this.speedDownSound.replay()
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
