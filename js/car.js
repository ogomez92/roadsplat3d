import { GameObject } from './gameObject'
import { utils } from './utilities'
import { speech } from './tts'
import { data, content } from './main'
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
            if (this.passed || (this.canHorn && this.y != this.world.player.y)) {
                this.hornSound.pause()
            }
            if (!this.passed && this.canHorn && this.world.player.tileType == 1) {
                this.hornResonanceSource.setPosition(this.x, this.y, this.z)
                this.hornSound.play()
            }
            if (!this.world.player.jump) {
                if (!this.passed) {
                    if (Math.round(this.x) == this.world.player.x && this.world.player.tileType != 1) {
                        this.passed = true
                        this.tile.hasSomething = false
                        if (typeof this.tile.timeout !== "undefined") {
                            clearTimeout(this.tile.timeout)
                        }
                        this.tile.timeout = setTimeout(() => {
                            this.tile.generateCar(utils.randomInt(1, content.numberOfVehicles))
                        }, utils.randomInt(0, this.world.game.spawnTime - (this.world.game.level * 100)))
                    }
                    if (!this.passed && this.alive && Math.round(this.x) == this.world.player.x && this.world.player.tileType == 1) {
                        if (this.world.player.jumps >= 1) {
                            this.world.game.pool.playStatic("bonus/hyperjump",0)
                            this.world.player.jumps--;
                            data.jumps = this.world.player.jumps
                            this.world.player.flyTo(this.world.player.nearestObjective, 3, "air")
                        } else {
                            let healthLoss = Math.round(this.speed * 45);
                            this.world.player.hp -= healthLoss
                            this.world.player.hit()
                            this.world.player.flyTo(utils.randomInt(this.world.player.nearestStreet, this.world.player.furthestStreet), this.side, "air")
                        }
                        this.passed = true
                        this.tile.hasSomething = false
                    }
                    if (typeof this.tile.timeout !== "undefined") {
                        clearTimeout(this.tile.timeout)
                    }
                    this.tile.timeout = setTimeout(() => {
                        this.tile.generateCar(utils.randomInt(1, content.numberOfVehicles))
                    }, utils.randomInt(0, this.world.game.spawnTime - (this.world.game.level * 100)))
                }
            }
        }
    }
}