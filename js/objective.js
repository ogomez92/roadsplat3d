import { GameObject } from './gameObject'
import { Tile } from './tile'
import { speech } from './tts'
export class Objective extends Tile {
    constructor(world, pos) {
        super(world, pos, 2, "objective")
        this.levelCap = this.world.game.level
        if (this.levelCap > 15) this.levelCap = 15
    }
    scoreDeduct() {
        if (this.y == this.world.player.y) {
            this.world.game.tick.replay()
            this.world.game.score -= (100 * this.world.game.level)
            if (this.world.game.score < 0) this.world.game.score == 0
            this.levelCap = this.world.game.level
            if (this.levelCap > 15) this.levelCap = 15
        }
    }
    destroy() {
        clearTimeout(this.timeout)
    }
    step() {
        super.step()
        let sound = this.world.game.pool.playStatic("steps/objective", 0)
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.scoreDeduct()
        }, 1300 - (this.levelCap * 75))
        this.world.generateTiles()
        this.world.player.slowDown(10)
    }
}