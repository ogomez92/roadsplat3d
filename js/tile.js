import { GameObject } from './gameObject'
export class tile expands gameObject {
    constructor(world,pos, type) {
        this.y = pos;
        this.type = type;
        this.hasSomething=false
        this.world=world;
    }
}