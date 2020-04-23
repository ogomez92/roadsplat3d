import { GameObject } from './gameObject'
import { Car } from './car'
import { LevelPortal } from './levelPortal'
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
        }, utils.randomInt(this.world.game.spawnTime, this.world.game.spawnTime + 300))
    }
    generateCar(force) {
        if (!this.generator || !this.alive || this.world.greenLight) return;
        if (typeof this.timeout !== "undefined") clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            if (!debug) this.generateCar(utils.randomInt(1, content.numberOfVehicles))
        }, utils.randomInt(this.world.game.spawnTime, this.world.game.spawnTime + 300))
        if (this.hasSomething) return;
        let side = utils.randomInt(1, 2)
        let size = this.world.size / 2
        if (side == 1) size = size * 1
        if (side == 2) size = size * -1
        let carType = force
        try {
            let chance = utils.randomInt(1, 100)
            //carType=content.numberOfVehicles

            if (this.world.game.canLevel && chance <= 80) {
                this.world.dynamicObjects.push(new LevelPortal(this.world, this, size, this.y, 2, 1, 2, "level_portal", 0.40, side, 1, "", "level_portal", "level_portal"))
            } else {
                this.world.dynamicObjects.push(new Car(this.world, this, size, this.y, 2, 1, 2, parsedCars[carType].sound, parsedCars[carType].speed, side, parsedCars[carType].z, parsedCars[carType].hornable, parsedCars[carType].name, parsedCars[carType].blowup,this.world.player.nearestObjective))
            }
        } catch (e) {
            console.error("Error generating car " + carType + ": " + e)
        }
        this.hasSomething = true
    }
    destroy() {
        if (typeof this.timeout !== "undefined") clearTimeout(this.timeout)
    }
    step() {
        super.step()
        this.world.player.stepProgress.pitch = utils.getProportion(this.y, this.world.player.nearestRoad, this.world.player.furthestRoad, 0.3, 1.7)
        this.world.player.stepProgress.replay()
    }
}