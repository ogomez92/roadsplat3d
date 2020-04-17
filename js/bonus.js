import { Item } from './item'
import { Effect } from './effect'
import { utils } from './utilities'
import { strings } from './strings'
import { increase, decrease, getUnlock, setUnlock, data, save, content } from './main'
import { speech } from './tts'
export class Bonus extends Item {
    constructor(world, x, y) {
        super(world, x, y, "loop/bonus")
    }
    step() {
        if (!this.alive) return;
        this.alive = false
        let bonuses = [1, 4, 7]
        if (getUnlock("hyperjump")) bonuses.push(2)

        if (getUnlock("bombs")) bonuses.push(5)
        let bonusType = utils.randomElement(bonuses)
        switch (bonusType) {

            case 1:
                this.world.game.pool.playStatic("bonus/health", 0)
                this.world.player.hp += 100
                break;
            case 2:
                this.world.game.pool.playStatic("bonus/hyperjump", 0)
                increase("jumps")
                break;
            //case 4 is fake bonus so default
            case 5:
                increase("bombs")
                this.world.game.pool.playStatic("bonus/bomb", false)
                break;
            case 7:
                increase("stoppers")
                save()
                this.world.game.pool.playStatic("bonus/stopper", false)
                break;
            default:
                this.world.game.pool.playStatic("bonus/fake", false)
                break;
        }
        setTimeout(() => {
            speech.speak(strings.get("bonus" + bonusType))
        }, 280)
        save()
    }
    coffeeOn(that) {
        that.oldSpeed = that.world.player.currentSpeed
        that.world.player.slowDown(10)
        that.world.player.speedUp(7)
        that.world.player.forceSpeed = true
        that.world.player.forcedSpeed = 7

    }
    coffeeOff(that) {
        that.world.player.forceSpeed = false
        that.world.player.slowDown(10)
        that.world.player.speedUp(that.oldSpeed)
    }
}