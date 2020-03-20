import { GameObject } from './gameObject'
import { speech } from './tts'
import { utils } from './utilities'
export class Car extends GameObject {
    constructor(world, tile, x, y, width, height, depth, sound = "car", speed, side, z = 1) {
        super(world, sound, x, y, z, width, height, depth)
        this.speed = speed;
        this.passed = false
        this.side = side;
        this.tile = tile;
    }
    update() {
        if (this.side == 2) this.x += this.speed;
        if (this.side == 1) this.x -= this.speed;
        if (this.x >= this.world.size / 2 || this.x <= (this.world.size / 2) * -1) {
            this.alive = false;
            this.tile.hasSomething = false
        } else {
            this.source.setPosition(this.x, this.y, this.z)
            let distance;
            if (!this.passed) distance = Math.round(utils.distance(this.world.player.x, this.world.player.y, this.x, this.y))
            if (!this.passed) {
                if (Math.round(this.x) == this.world.player.x && distance > 0) {
                    this.passed = true
                    //experimental, nifty, score calculation
                    if (distance < 6) {
                        const score = Math.round(this.speed * 10000 / (this.world.size / 10) / distance)
                        speech.speak(score)
                        this.world.game.score += score
                        this.world.game.scoreSound.pitch = utils.getProportion(distance, 1, 5, 0.7, 1.3)
                        this.world.game.scoreSound.replay()
                    }
                }
                if (Math.round(this.x) == this.world.player.x && distance == 0) {
                    this.passed = true
                    let healthLoss = Math.round(this.speed * 45);
                    speech.speak("hit! " + healthLoss)
                    this.world.player.hp-=healthLoss
                    this.world.player.hit()
                }
            }
        }
    }
}