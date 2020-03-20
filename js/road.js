import { GameObject } from './gameObject'
import { utils } from './utilities'
import { Tile } from './tile'
import {Car} from './car'
export class Road extends Tile {
    constructor(world, pos) {
        super(world, pos, 1, "steps/road")
        setTimeout(() => {
            this.generateCar()
        }, utils.randomInt(this.world.game.spawnTime - (this.world.game.level * 300), this.world.game.spawnTime + 300))
    }
    generateCar() {
        setTimeout(() => {
            this.generateCar()
        }, this.world.game.spawnTime)

        if (this.hasSomething) return;
        let side = utils.randomInt(1, 2)
        let size = this.world.size / 2
        if (side == 1) size = size * 1
        if (side == 2) size = size * -1
        this.world.dynamicObjects.push(new Car(this.world, this, size, this.y, 1, 1, 0.5, "car", 0.2, side))
    }
}