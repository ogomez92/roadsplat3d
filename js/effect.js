export class Effect {
    constructor(world, name, time, onFunction, ofFunction) {
        this.world = world
        this.world.game.pool.playStatic("effects/" + name, 0)
        onFunction()
        setTimeout(() => {
            ofFunction()
            this.world.game.pool.playStatic("effects/" + name + "Off", 0)
        }, time)
    }
}