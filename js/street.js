import { GameObject } from './gameObject'
import { utils } from './utilities'
import { Tile } from './tile'
export class Street extends Tile {
    constructor(world, pos) {
        super(world, pos, 0, "street")
    }
    step() {
        super.step()
    }
}