import { GameObject } from './gameObject'
import { utils } from './utilities'
import { speech } from './tts'
export class Ambience extends GameObject {
    constructor(world, x, y, sound, direction = utils.randomInt(1, 4)) {
        super(world, "ambience" / sound, x, y, z, 1, 1, 1)
        this.direction = direction
        setTimeout(() => {
            this.destroy()
        }, 10000)
    })
}
update() {
if (!this.alive) return;
    switch (this.direction) {
        case 1:
            this.x += utils.getRandomArbitrary(0, 0.05)
            this.y += utils.getRandomArbitrary(0, 0.05)
            break;
        case 2:
            this.x -= utils.getRandomArbitrary(0, 0.05)
            this.y -= utils.getRandomArbitrary(0, 0.05)
            break;
        case 3:
            this.x += utils.getRandomArbitrary(0, 0.05)
            this.y -= utils.getRandomArbitrary(0, 0.05)
            break;
        case 4:
            this.x -= utils.getRandomArbitrary(0, 0.05)
            this.y += utils.getRandomArbitrary(0, 0.05)
            break;
    }
    this.source.setPosition(this.x, this.y, this.z)

}
}