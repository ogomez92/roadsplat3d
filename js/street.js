import { GameObject } from './gameObject'
import { Tile } from './tile'
export class Street expands Tile {
    constructor(world, pos) {
        super(world, pos, 0)
    }
}