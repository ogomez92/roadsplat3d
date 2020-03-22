import { Car } from './car'
//bus faster
export class BusFaster extends Car {
    constructor(world, tile, x, y, width, height, depth, side) {
        super(world, tile, x, y, width, height, depth, "vehicles/busfast", 0.05, side, 2, true, "busfast")
        this.name = "busfast"
        this.speed = 0.63;
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}
//bus
export class Bus extends Car {
    constructor(world, tile, x, y, width = 2, height = 1, depth = 2, side) {
        super(world, tile, x, y, width, height, depth, "vehicles/bus", 0.05, side, 2, true, "bus")
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
        super(world, tile, x, y, width, height, depth, "vehicles/" + name, 0.05, side, 0.5, true, name)
        this.speed = 0.45
        this.name = name
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}
export class Rickroll extends Car {
    constructor(world, tile, x, y, width, height, depth, side, name = "rickroll") {
        super(world, tile, x, y, width, height, depth, "vehicles/" + name, 0.05, side, 0.5, true, name)
        this.speed = 0.25
        this.name = name
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}
export class Gasolina extends Car {
    constructor(world, tile, x, y, width, height, depth, side, name = "gasolina") {
        super(world, tile, x, y, width, height, depth, "vehicles/" + name, 0.05, side, 0.5, true, name)
        this.speed = 0.60
        this.name = name
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}
export class Train1 extends Car {
    constructor(world, tile, x, y, width, height, depth, side, name = "train1") {
        super(world, tile, x, y, width, height, depth, "vehicles/" + name, 0.05, side, 0.5, true, name)
        this.speed = 0.35
        this.name = name
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}
export class Train2 extends Car {
    constructor(world, tile, x, y, width, height, depth, side, name = "train2") {
        super(world, tile, x, y, width, height, depth, "vehicles/" + name, 0.05, side, 0.5, true, name)
        this.speed = 0.20
        this.name = name
        this.side = side;
        this.tile = tile;
        this.tile.hasSomething = true
    }
}