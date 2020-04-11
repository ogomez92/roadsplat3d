import { GameObject } from './gameObject'
import { KeyEvent } from './keycodes.js'
import { so } from './soundObject'
import { speech } from './tts';
import { utils } from './utilities'
import { data, debug } from './main'
const EventEmitter = require('events');
export class Player extends GameObject {
    constructor(world) {
        super(world, "", 0, 0, 1.6, 1, 0.5, 1.6)
        this.playerHitSound = so.create("player/hit")
        this.forceSpeed = false
        this.stepProgress = so.create("steps/progress")
        this.target = so.create("player/target")
        this.coins = 0
        if (data.coins) this.coins = data.coins;
        this.jumps = 0;
        if (data.jumps) this.jumps = data.jumps
        this.center = so.create("ui/center")
        this.xLimit = Math.ceil(this.world.size / 10)
        this.fallTime = 55
        this.world.scene.setListenerPosition(this.x, this.y, this.z)
        this.unableToMove = false
        this.hp = 100
        this.speedUpSound = so.create("ui/speedUp")
        this.nearestStreet = 0
        this.nearestRoad = 0
        this.nearestObjective = 0
        this.furthestStreet = 0
        this.furthestRoad = 0

        this.speedDownSound = so.create("ui/speedDown")
        this.speed = 650
        //speed 0 is unused, speeds 1 to 5 are manually attainable, speed 6 is a crawl and speed 7 is super speed.
        this.speeds = [
            0, 650, 530, 420, 350, 235, 890, 120
        ]
        this.speedModifier = 0
        this.currentSpeed = 0
    }
    move() {
        if (this.unableToMove) return;
        this.speedTimeout = setTimeout(() => {
            this.move()
        }, this.speeds[this.currentSpeed] - this.speedModifier)
        if (this.currentSpeed == 0) this.currentSpeed = 1;
        this.xLimit = Math.ceil(this.world.size / 8)
        this.y += 1

        this.emit("step" + this.y)
        if (this.world.game.input.isDown(KeyEvent.DOM_VK_RIGHT)) {
            this.x++;
            if (this.x > 0 + this.xLimit) this.x = 0 + this.xLimit
            if (this.x == this.world.size / 2) this.center.replay();
        }
        if (this.world.game.input.isDown(KeyEvent.DOM_VK_LEFT)) {
            this.x--;
            if (this.x < 0 - this.xLimit) this.x = 0 - this.xLimit
            if (this.x == this.world.size / 2) this.center.replay();
        }
        this.world.scene.setListenerPosition(this.x, this.y, this.z)
        this.emit("x" + this.x)
    }
    speedUp(number = 1) {
        if (this.forceSpeed) return;
        if (this.unableToMove) return;
        if (this.currentSpeed == 0) {
            this.speedUpSound.pitch = utils.getProportion(1, 1, 5, 0.8, 1.2)
            this.speedUpSound.replay()
            this.move()
        }
        this.currentSpeed += (number - 1);
        if (this.currentSpeed > 7) this.currentSpeed = 7
        this.speedUpSound.pitch = utils.getProportion(this.currentSpeed, 1, 5, 0.8, 1.2)
        this.speedUpSound.replay()
        speech.speak(this.currentSpeed)
    }
    slowDown(number = 1) {
        if (this.forceSpeed) return;
        if (this.unableToMove) return;
        this.currentSpeed -= number;
        //we don't want the player to be able to stop with the down arrow key, but if some item is forcing the player to stop, we can allow it.
        if (number == 1 && this.currentSpeed == 0) this.currentSpeed = 1;
        if (this.currentSpeed <= 0) {
            this.currentSpeed = 0;
            if (typeof this.speedTimeout !== "undefined") clearTimeout(this.speedTimeout)
        }
        if (number == 1) this.speedDownSound.pitch = utils.getProportion(this.currentSpeed, 1, 5, 0.8, 1.2)
        if (number == 1) this.speedDownSound.replay()
        speech.speak(this.currentSpeed)
    }
    hit() {
        this.playerHitSound.play()
        this.world.game.pool.playStatic("player/impact/" + utils.randomInt(1, 4), 0)

    }
    flyTo(y, side, snd) {
        if (this.unableToMove) return;
        this.tileType = -1
        this.unableToMove = true
        let heart = so.create("player/heart")
        heart.play()
        let sound = so.create(snd)
        sound.loop = true
        sound.volume = 0.3
        let land = so.create("player/land")
        let fall = so.create("player/fall" + utils.randomInt(1, 4))
        let stand = so.create("player/stand")
        sound.pitch = 0.7
        sound.play()
        sound.loop = true
        heart.loop = true
        this.slowDown(10)
        let z = utils.randomInt(11, 21)

        let x;
        let jump = false
        if (side == 1) x = -1;
        if (side == 2) x = 1
        if (side == 3) {
            jump = true;
            this.jump = true;
            z = utils.randomInt(5, 10)
        }
        this.interval = setInterval(() => {
            if (!jump) this.x += (x * utils.randomInt(3, 5))
            if (this.x < 0 - this.world.size / 2) {
                x = 1
                this.world.game.pool.playStatic("player/wall" + utils.randomInt(1, 3), 0)
            }
            if (this.x > this.world.size / 2) {
                x = -1
                this.world.game.pool.playStatic("player/wall" + utils.randomInt(1, 3), 0)
            }
            sound.pitch += 0.07
            if (this.y > y) {
                this.y -= 0.5;
            }
            if (this.y < y) {
                this.y += 0.5;
            }
            this.z += 1;
            if (this.z >= z) {
                this.y = y;
                clearInterval(this.interval)
                this.interval = setInterval(() => {
                    this.z -= 1;
                    sound.pitch -= 0.07
                    if (this.z <= 0) {
                        this.tileType = 0
                        clearInterval(this.interval)
                        if (jump) {
                            land.play()
                            this.z = 1.6
                            this.jump = false
                            this.unableToMove = false;
                            heart.stop();
                            if (this.forceSpeed) {
                                speech.speak("Speeding up to " + this.forcedSpeed)
                                this.forceSpeed = false
                                this.speedUp(this.forcedSpeed)
                                this.forceSpeed = true
                            }
                        }
                        if (!jump) {
                            this.x = 0
                            fall.play()
                            this.z = 0
                            setTimeout(() => {
                                stand.replay()
                                heart.stop();
                                stand.sound.on("ended", (() => {
                                    this.z = 1.6
                                    this.jump = false
                                    this.unableToMove = false;
                                    if (this.forceSpeed) {
                                        this.forceSpeed = false
                                        this.slowDown(10)
                                        this.forceSpeed=true
                                    } else {
                                        this.slowDown(10)
                                    }
                                    
                                    if (this.forceSpeed) {
                                        this.forceSpeed = false
                                        this.speedUp(this.forcedSpeed)
                                        this.forceSpeed=true
                                    }
                                }))
                                this.world.scene.setListenerPosition(this.x, this.y, this.z)
                            }, utils.randomInt(1000, 2000))
                        }
                        this.world.scene.setListenerPosition(this.x, this.y, this.z)
                        sound.stop()
                        //heart.stop()
                        this.x = 0
                        this.emit("step" + this.y)
                        //if (this.forceSpeed) this.speedUp(this.forcedSpeed)
                    }
                    this.world.scene.setListenerPosition(this.x, this.y, this.z)
                }, this.fallTime)
            }
            this.world.scene.setListenerPosition(this.x, this.y, this.z)
        }, this.fallTime * 1.2)
    }
    scoreDeduct() {
        this.world.game.tick.replay()
        this.world.game.score -= (100 * this.world.game.level)
        if (this.world.game.score < 0) this.world.game.score = 0
        this.levelCap = this.world.game.level
        if (this.levelCap > 15) this.levelCap = 15
    }
}