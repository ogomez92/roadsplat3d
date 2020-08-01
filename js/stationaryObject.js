import { GameObject } from './gameObject'
import { utils } from './utilities'
import { speech } from './tts'
export class StationaryObject extends GameObject {
    constructor(world, y, sound, loop = false, x = 0) {
        super(world, sound, x, y, 0, 1, 1, 1)
        this.sound.loop = loop
this.sound.addEventListener("ended", ()=> {
console.log("ended")
if (!loop) {
console.log("Stationary item destroyed")
this.destroy()
}
})
    }
}