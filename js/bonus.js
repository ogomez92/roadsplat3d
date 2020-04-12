import { Item } from './item'
import { Effect } from './effect'
import { utils } from './utilities'
import { strings } from './strings'
import { getUnlock, setUnlock, data, save, content } from './main'
import { speech } from './tts'
export class Bonus extends Item {
    constructor(world, x, y) {
        super(world, x, y, "loop/bonus")
    }
    step() {
        if (!this.alive) return;
        this.alive = false
        let bonuses=[1,4]
        if (getUnlock("hyperjump")) bonuses.push(2)
        if (!this.world.player.forceSpeed) bonuses.push(3)
        if (getUnlock("bombs")) bonuses.push(5)
let        bonusType=utils.randomElement(bonuses)
        switch (bonusType) {

            case 1:
                this.world.game.pool.playStatic("bonus/health", 0)
                this.world.player.hp += 25
                break;
            case 2:
                this.world.game.pool.playStatic("bonus/hyperjump", 0)
                data.jumps++
                break;
            case 3:
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
                break;
                case 5:
                data.bombs++;
                this.world.pool.playStatic("bonus/bomb",false)
                break;
                default:
                this.world.game.pool.playStatic("bonus/fake", 0)
break;
        }
        setTimeout(() => {
            speech.speak(strings.get("bonus" + bonusType))
        }, 280)
        save()
    }
}