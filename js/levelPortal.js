import { GameObject } from "./gameObject";
import { strings } from './strings'
import { StationaryObject } from './stationaryObject'
import { utils } from "./utilities";
import { speech } from "./tts";
import { save, data, content } from "./main";
export class LevelPortal extends GameObject {
  constructor(
    world,
    tile,
    x,
    y,
    width,
    height,
    depth,
    sound = "car",
    speed,
    side,
    z = 1,
    canHorn = "",
    name, blowUp = ""
  ) {
    super(world, sound, x, y, z, width, height, depth);
    this.blowUpSound = blowUp
    this.world.player.on("blowup", (() => {

      if (!this.alive || (this.x < -7 || this.x > 7)) return;
      this.alive = false;
      if (this.blowUpSound != "") new StationaryObject(this.world, this.world.player.y + 2, "blowup/" + this.blowUpSound, false, this.x)
      if (this.blowUpSound == "") new StationaryObject(this.world, this.world.player.y + 2, "blowup/generic", false, this.x)
      if (typeof data.bulletGallery === "undefined") {
        data.bulletGallery = {}
      }
      if (this.blowUpSound != "") data.bulletGallery[this.blowUpSound] = true
      save()
      this.world.player.hp += 1000
      this.world.game.score = this.world.game.bankedScore
      this.world.game.canLevel = false
      this.world.game.canLevelNotify = false
      if (this.canHorn != "") this.hornSound.pause();
      this.tile.hasSomething = false;
    }));

    this.name = name;
    this.speed = speed;
    this.passed = false;
    this.side = side;
    this.tile = tile;
    this.tile.hasSomething = true;
    this.canHorn = canHorn;
    if (this.canHorn != "") {
      if (this.canHorn == 1) this.canHorn = this.name;
      this.hornSound = document.createElement("audio");
      this.hornSound.src = "./sounds/horn/" + this.name + ".ogg";
      this.hornSource = this.world.context.createMediaElementSource(
        this.hornSound
      );
      this.hornResonanceSource = this.world.scene.createSource();
      this.hornSource.connect(this.hornResonanceSource.input);
      //horn follows the player because a it plays only if player is on the road and b we want the player to feel trapped on the road by this honking car since that's what happens
      this.hornResonanceSource.setPosition(this.x, this.world.player.y, this.z);
      this.hornSound.loop = true;
    }
  }
  update() {
    if (this.side == 2) this.x += this.speed;
    if (this.side == 1) this.x -= this.speed;
    if (this.x >= this.world.size / 2 || this.x <= (this.world.size / 2) * -1) {
      this.alive = false;
      if (this.canHorn != "") this.hornSound.pause();
      this.tile.hasSomething = false;
    } else {
      //ok, player spans the entire road. So the car sound should equally follow the player to make him feel trapped.
      if (this.world.player.tileType != 1)
        this.source.setPosition(this.x, this.y, this.z);
      if (this.world.player.tileType == 1)
        this.source.setPosition(this.x, this.world.player.y, this.z);
      if (
        this.passed ||
        (this.canHorn != "" && this.y != this.world.player.y)
      ) {
        if (this.canHorn != "") this.hornSound.pause();
      }
      if (
        !this.passed &&
        this.canHorn != "" &&
        this.world.player.tileType == 1
      ) {
        this.hornResonanceSource.setPosition(this.x, this.y, this.z);
        this.hornSound.play();
      }
      if (!this.world.player.jump) {
        if (!this.passed) {
          if (
            Math.round(this.x) == this.world.player.x &&
            this.world.player.tileType != 1
          ) {
            this.passed = true;
            this.tile.hasSomething = false;
            if (typeof this.tile.timeout !== "undefined") {
              clearTimeout(this.tile.timeout);
            }
            this.tile.timeout = setTimeout(() => {
              this.tile.generateCar(
                utils.randomInt(1, content.numberOfVehicles)
              );
            }, utils.randomInt(this.world.game.spawnTime, this.world.game.spawnTime + 300))
          }
          if (
            !this.passed &&
            this.alive &&
            Math.round(this.x) == this.world.player.x &&
            this.world.player.tileType == 1
          ) {
            this.passed = true;
            this.tile.hasSomething = false;
this.alive=false
            //level here
            this.world.game.canLevel = false
            this.world.game.bankedScore = this.world.game.level * 1500
            this.world.game.level++;
            this.world.game.spawnTime -= 150;
            if (this.world.game.spawnTime < 200) this.world.game.spawnTime = 200;
            setTimeout(() => {
              speech.speak(strings.get("level") + " " + this.world.game.level)
            }, 400)
            this.world.player.flyTo(this.world.player.nearestObjective,
              3,
              "level_air", "level_land"
            );
            this.world.game.canLevelNotify = false

            this.world.game.score += (this.world.game.level * 100)
            this.world.size -= Math.round((this.world.game.level));
            //level code end
          }
          if (typeof this.tile.timeout !== "undefined") {
            clearTimeout(this.tile.timeout);
          }
          this.tile.timeout = setTimeout(() => {
            this.tile.generateCar(utils.randomInt(1, content.numberOfVehicles));
          }, utils.randomInt(0, this.world.game.spawnTime - this.world.game.level * 100));
        }
      }
    }
  }
}
