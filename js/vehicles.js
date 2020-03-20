import { Car } from './car'
//bus faster
export class BusFaster extends Car {
    constructor(world, tile, x, y, width, height, depth, side) {
        super(world, tile, x, y, width, height, depth, "/vehicles/busfast", 0.05, side,2)
        this.name = "busfast"
        this.speed = 0.63;
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}
//bus
export class Bus extends Car {
    constructor(world, tile, x, y, width, height, depth, side) {
        super(world, tile, x, y, width, height, depth, "/vehicles/bus", 0.05, side,2)
        this.name = "bus"
        this.speed = 0.35;
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}
//biker
export class Biker extends Car {
    constructor(world, tile, x, y, width, height, depth, side, name = "biker") {
        super(world, tile, x, y, width, height, depth, "/vehicles/" + name, 0.05, side,0.5)
        this.speed = 0.45
        this.name = name
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}