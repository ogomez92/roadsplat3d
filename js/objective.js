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
        if (this.world.game.canLevel) {
            this.world.player.y = this.world.player.nearestStreet;
            this.world.scene.setListenerPosition(this.world.player.x, this.world.player.y, this.world.player.z)
            this.world.game.pool.playStatic("level_forcefield", false)
            return;
        }
        this.world.game.pool.playStatic("steps/objective", 0)
        this.world.player.scoreTimeout = setInterval(() => {
            this.world.player.scoreDeduct()
        }, 1100 - (this.world.player.levelCap * 50))
        this.world.generateTiles()
        this.world.game.score += (250)
        this.world.player.slowDown(10)
    }
}