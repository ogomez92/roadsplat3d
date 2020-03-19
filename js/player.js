import { GameObject } from './gameObject'
export class Player extends GameObject {
    constructor(world) {
        super(world, "", 0, 0, 1.6, 1, 0.5, 1.6)
        this.world.scene.setListenerPosition(0, 0, 0)
    }
}