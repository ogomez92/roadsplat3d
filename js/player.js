import { GameObject } from './gameObject'
import { speech } from './tts';
const EventEmitter = require('events');
export class Player extends GameObject {
    constructor(world) {
        super(world, "", 0, 0, 1.6, 1, 0.5, 1.6)
        this.world.scene.setListenerPosition(this.x, this.y, this.z)
        this.speed = 650
        this.speeds = [
            0, 650, 530, 420, 350, 235
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
        speech.speak(this.y)
    }
    speedUp(number = 1) {
        if (this.currentSpeed == 0) {
            this.move()
            return;
        }
        this.currentSpeed += number;
        if (this.currentSpeed > 5) this.currentSpeed = 5
        speech.speak("speed " + this.currentSpeed)
    }
    slowDown(number = -1) {
        this.currentSpeed -= number;
        //we don't want the player to be able to stop with the down arrow key, but if some item is forcing the player to stop, we can allow it.
        if (number == -1 && this.currentSpeed == 0) this.currentSpeed = 1;
        if (this.currentSpeed <= 0) {
            this.currentSpeed = 0;
            if (typeof this.speedTimeout !== "undefined") clearTimeout(this.speedTimeout)
        }
        speech.speak("speed " + this.currentSpeed)
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
