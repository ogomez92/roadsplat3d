import { GameObject } from './gameObject'
import { Tile } from './tile'
import {speech} from './tts'
export class Objective extends Tile {
    constructor(world, pos) {
        super(world, pos, 2,"objective")
    }
    step() {
        super.step()
        this.world.generateTiles()

    }
}