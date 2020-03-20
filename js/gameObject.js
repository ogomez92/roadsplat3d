export class GameObject {
    constructor(world, sound, x, y, z, width, height, depth) {
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
            console.log(this.source)
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
}