const EventEmitter = require('events')
export class GameObject extends EventEmitter {

    constructor(world, sound, x, y, z, width, height, depth) {
        super()
        this.world = world
        this.alive = true
        this.x = x
        this.y = y
        this.z = z
        if (sound != "") {
            this.sound = document.createElement("audio")
            this.sound.src = "./sounds/" + sound + ".ogg"
            this.mediaSource = this.world.context.createMediaElementSource(this.sound)
            this.source = this.world.scene.createSource();
            this.source.sourceWidth = width;
            this.source.sourceHeight = height
            this.source.sourceDepth = depth;
            this.mediaSource.connect(this.source.input);
            this.source.setPosition(this.x, this.y, this.z)
            this.sound.play()
            this.sound.loop = true

        }
    }
    update() {

    }
    destroy() {
this.alive=false
        if (this.sound != null) {
            this.sound.load()
}
            this.sound=null
            this.mediaSource=null;
            this.source=null;
            }
}