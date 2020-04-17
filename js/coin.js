import { Item } from './item'
import { data, save } from './main'
import { speech } from './tts'
export class Coin extends Item {
    constructor(world, x, y) {
        super(world, x, y, "loop/coin")
    }
    step() {
        data.coins += this.world.game.level
        this.world.game.pool.playStatic("player/getCoin", 0)
        save()
        this.alive = false
    }
}