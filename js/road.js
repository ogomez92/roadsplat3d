import { GameObject } from './gameObject'
import { Car } from './car'
import { debug } from './main'
import { parsedCars, content } from './main'
import { utils } from './utilities'
import { Tile } from './tile'
import { speech } from './tts'
export class Road extends Tile {
    constructor(world, pos, generator = false) {
        super(world, pos, 1, "road")
        this.generator = generator
        this.timeout = setTimeout(() => {
            if (!debug) this.generateCar(utils.randomInt(1, content.numberOfVehicles))
        }, utils.randomInt(0, this.world.game.spawnTime - (this.world.game.level * 100)))
    }
    generateCar(force) {
        if (!this.generator || !this.alive) return;
        if (typeof this.timeout !== "undefined") clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            if (!debug) this.generateCar(utils.randomInt(1, content.numberOfVehicles))
        }, utils.randomInt(0, this.world.game.spawnTime - (this.world.game.level * 100)))
        if (this.hasSomething) return;
        let side = utils.randomInt(1, 2)
        let size = this.world.size / 2
        if (side == 1) size = size * 1
        if (side == 2) size = size * -1
        let carType = force
        try {
            this.world.dynamicObjects.push(new Car(this.world, this, size, this.y, 2, 1, 2, parsedCars[carType].sound, parsedCars[carType].speed, side, parsedCars[carType].z, parsedCars[carType].hornable, parsedCars[carType].name))
        } catch (e) {
            speech.speak("Error generating car " + carType + ": " + e)
        }
        this.hasSomething = true
    }
    destroy() {
        if (typeof this.timeout !== "undefined") clearTimeout(this.timeout)
    }
    step() {
        super.step()
        this.world.player.stepProgress.pitch = utils.getProportion(this.y, this.world.player.nearestRoad, this.world.player.furthestRoad, 0.1, 2.0)
        this.world.player.stepProgress.replay()
    }
}