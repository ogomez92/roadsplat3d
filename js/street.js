import { GameObject } from './gameObject'
import {utils} from './utilities'
import { Tile } from './tile'
export class Street extends Tile {
    constructor(world, pos) {
        super(world, pos, 0, "street")
    }
    step() {
        super.step()
        this.world.player.stepProgress.pitch = utils.getProportion(this.y, this.world.player.furthestStreet, this.world.player.nearestStreet, 0.7, 1.3)
        this.world.player.stepProgress.replay()
    }
}