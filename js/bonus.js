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
        bonusType = content.bonusTypes
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
            case 3:
                if (this.world.player.forceSpeed) {
                    this.world.game.pool.playStatic("bonus/fake", 0)
                } else {
                    let crawl = new Effect(this.world, "crawl", 20000, (() => {
                        this.oldSpeed = this.world.player.currentSpeed
                        this.world.player.slowDown(10)
                        this.world.player.speedUp(6)
                        this.world.player.forceSpeed = true
                        this.world.player.forcedSpeed = 6
                    }), (() => {
                        this.world.player.speedUp(this.oldSpeed)
                        this.world.player.forceSpeed = false
                    }))
                }
                break;
            default: break;
        }
        setTimeout(() => {
            speech.speak(strings.get("bonus" + bonusType))
        }, 280)
        save()
    }
}