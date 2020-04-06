import { GameObject } from './gameObject'
import { Tile } from './tile'
import { speech } from './tts'
export class Objective extends Tile {
    constructor(world, pos) {
        super(world, pos, 2, "objective")
    }
    destroy() {

    }
    step() {
        super.step()
        this.world.game.pool.playStatic("steps/objective", 0)
        this.world.player.scoreTimeout = setInterval(() => {
            this.world.player.scoreDeduct()
        }, 1300 - (this.world.player.levelCap * 75))
        this.world.generateTiles()
        this.world.player.slowDown(10)
    }
}