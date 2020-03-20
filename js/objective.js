import { GameObject } from './gameObject'
import { Tile } from './tile'
export class Objective extends Tile {
    constructor(world, pos) {
        super(world, pos, 2,"objective")
    }
}