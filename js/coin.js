import { Item } from './item'
import { data, save } from './main'
import { speech } from './tts'
export class Coin extends Item {
    constructor(world, x, y) {
        super(world, x, y, "loop/coin")
    }
    step() {
        this.world.player.coins++
        this.world.game.pool.playStatic("player/getCoin",0)
        data.coins = this.world.player.coins
        save()
        this.alive = false
    }
}