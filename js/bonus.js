import { Item } from './item'
import { Effect } from './effect'
import { utils } from './utilities'
import { strings } from './strings'
import { data, save, content } from './main'
import { speech } from './tts'
export class Bonus extends Item {
    constructor(world, x, y) {
        super(world, x, y, "loop/bonus")
    }
    step() {
        this.alive = false
        let bonusType = utils.randomInt(1, content.bonusTypes)
        switch (bonusType) {

            case 1:
                this.world.game.pool.playStatic("bonus/health", 0)
                this.world.player.hp += 25
                break;
            case 2:
                this.world.game.pool.playStatic("bonus/hyperjump", 0)
                this.world.player.jumps++
                data.jumps++
                break;
            default: break;
        }
        setTimeout(() => {
            speech.speak(strings.get("bonus" + bonusType))
        }, 280)
        save()
    }
}