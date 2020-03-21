import { GameObject } from './gameObject'
import { utils } from './utilities'
import { speech } from './tts'
export class Car extends GameObject {
    constructor(world, tile, x, y, width, height, depth, sound = "car", speed, side, z = 1, canHorn = false, name) {
        super(world, sound, x, y, z, width, height, depth)
        this.name = name;
        this.speed = speed;
        this.passed = false
        this.side = side;
        this.tile = tile;
        this.canHorn = canHorn
        if (this.canHorn) {
            this.hornSound = document.createElement("audio")
            this.hornSound.src = "./sounds/horn/" + this.name + ".ogg"
            this.hornSource = this.world.context.createMediaElementSource(this.hornSound)
            this.hornResonanceSource = this.world.scene.createSource();
            this.hornSource.connect(this.hornResonanceSource.input);
            this.hornResonanceSource.setPosition(this.x, this.y, this.z)
            this.hornSound.loop = true
        }
    }
    update() {
        if (this.side == 2) this.x += this.speed;
        if (this.side == 1) this.x -= this.speed;
        if (this.x >= this.world.size / 2 || this.x <= (this.world.size / 2) * -1) {
            this.alive = false;
            if (this.canHorn) this.hornSound.pause()
            this.tile.hasSomething = false
        } else {
            this.source.setPosition(this.x, this.y, this.z)
            if (this.passed || (this.canHorn && this.y != this.world.player.y )) {
                this.hornSound.pause()
            }
            if (!this.passed && this.canHorn && this.y == this.world.player.y) {
                this.hornResonanceSource.setPosition(this.x, this.y, this.z)
                this.hornSound.play()
            }
            let distance;
            if (!this.world.player.jump) {
                if (!this.passed) distance = Math.round(utils.distance(this.world.player.x, this.world.player.y, this.x, this.y))
                if (!this.passed) {
                    if (Math.round(this.x) == this.world.player.x && distance > 0) {
                        this.passed = true
                        //experimental, nifty, score calculation, but only if the player is on the road, we don't want him collecting points while just standing around.
                        if (distance < 6 && this.world.player.tileType == 1) {
                            const score = Math.round(this.speed * 10000 / (this.world.size / 10) / distance)
                            this.world.game.score += score
                            this.world.game.scoreSound.pitch = utils.getProportion(distance, 1, 5, 0.7, 1.3)
                            this.world.game.scoreSound.replay()
                        }
                    }
                    if (Math.round(this.x) == this.world.player.x && distance == 0) {
                        this.passed = true
                        let healthLoss = Math.round(this.speed * 45);
                        this.world.player.hp -= healthLoss
                        this.world.player.hit()
                        this.world.player.flyTo(this.world.player.nearestStreet, this.side, "air")
                    }
                }
            }
        }
    }
}