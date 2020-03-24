export class Effect {
    constructor(world, name, time, onFuction, ofFunction) {
        this.world.game.pool.playStatic("effects/" + name + "On", 0)
        onFunction()
        setTimeout(() => {
            ofFunction()
            this.world.game.pool.playStatic("effects/" + name + "Off", 0)
        }, time)
    }
}