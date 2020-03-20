import { GameObject } from './gameObject'
import { debug } from './main'
import { content } from './main'
import { utils } from './utilities'
import { Tile } from './tile'
import { Bus, BusFaster, Biker } from './vehicles'
import { speech } from './tts'
export class Road extends Tile {
    constructor(world, pos) {
        super(world, pos, 1, "road")
        this.timeout = setTimeout(() => {
            if (!debug) this.generateCar(utils.randomInt(1, content.numberOfVehicles))
        }, utils.randomInt(0, this.world.game.spawnTime - (this.world.game.level * 100)))
    }
    generateCar(force) {

        this.timeout = setTimeout(() => {
            if (!debug) this.generateCar(utils.randomInt(1, content.numberOfVehicles))
        }, utils.randomInt(0, this.world.game.spawnTime - (this.world.game.level * 100)))

        if (this.hasSomething) return;
        let side = utils.randomInt(1, 2)
        let size = this.world.size / 2
        if (side == 1) size = size * 1
        if (side == 2) size = size * -1
        let carType = force
        switch (carType) {
            case 1:
                this.world.dynamicObjects.push(new Bus(this.world, this, size, this.y, 2, 1, 2, side))
                break;
            case 2:
                this.world.dynamicObjects.push(new BusFaster(this.world, this, size, this.y, 2, 1, 2, side))
                break;
            case 3:
                this.world.dynamicObjects.push(new Biker(this.world, this, size, this.y, 1, 1, 1, side))
                break;

            default: break;
        }
        this.hasSomething = true
    }
    destroy() {
        if (typeof this.timeout !== "undefined") clearTimeout(this.timeout)
    }
}