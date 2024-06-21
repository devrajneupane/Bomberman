import { MAP } from "../constants/map";
import { images } from "../image/preload";
import { Point } from "../types/point";
import BombExplosion from "./BombExplosion";

export default class Bomb {
  x: number;
  y: number;
  width: number = MAP.tile.size;
  height: number = MAP.tile.size;
  sx: number;
  sy: number;
  bombActive: boolean = false;
  bombExploded: boolean;
  spriteCounter: number;
  elaspedFrame: number;
  currentFrame: number;
  frameIndexes: number[];
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  explosionArray: BombExplosion[];

  constructor(playerCoordinate: Point, ctx: CanvasRenderingContext2D) {
    this.x = playerCoordinate.x;
    this.y = playerCoordinate.y;
    this.ctx = ctx;

    this.sx = 0;
    this.sy = 0;
    this.spriteCounter = 0;

    this.elaspedFrame = 0;
    this.currentFrame = 0;
    this.frameIndexes = [0, 1, 2];
    this.bombExploded = false;

    this.img = images.bomb.bombSprite;
    this.explosionArray = [];
  }

  /**
   * Draw bomb at current player position
   */
  draw() {
    this.elaspedFrame++;
    this.currentFrame = (this.currentFrame + 1) % this.frameIndexes.length;

    if (!this.bombExploded) {
      this.frameBuffer();
    }
    this.ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      17,
      17,
      this.x * MAP.tile.size,
      this.y * MAP.tile.size,
      this.width,
      this.height,
    );
    for (let explosion of this.explosionArray) {
      explosion.draw();
    }
  }

  frameBuffer() {
    const frameIndex = this.frameIndexes[this.currentFrame];
    if (this.elaspedFrame % 25 === 0) {
      this.sx = frameIndex * 17;
    }
  }

  /**
   * Draw bomb explosion from bomb position
   */
  calculateExplosion() {
    this.bombExploded = true;
    // Change bomb image
    this.img = images.bomb.bombExplosionCenterSprite;

    for (let direction of ["left", "top", "right", "bottom"]) {
      switch (direction) {
        case "left":
          const leftCoordinate: Point = {
            x: (this.x - 1) * MAP.tile.size ,
            y: this.y * MAP.tile.size,
          };
          // this.drawExplosion(
          //   leftCoordinate,
          //   images.bomb.bombExplosionLeftSprite,
          // );
          const leftExplosion = new BombExplosion(
            leftCoordinate,
            images.bomb.bombExplosionLeftSprite,
            this.ctx,
          );
          this.explosionArray.push(leftExplosion);
          break;

        case "top":
          const topCoordinate: Point = {
            x: this.x * MAP.tile.size,
            y: (this.y - 1) * MAP.tile.size,
          };
          // this.drawExplosion(topCoordinate, images.bomb.bombExplosionTopSprite);
          const topExplosion = new BombExplosion(
            topCoordinate,
            images.bomb.bombExplosionTopSprite,
            this.ctx,
          );
          this.explosionArray.push(topExplosion);
          break;

        case "right":
          const rightCoordinate: Point = {
            x: (this.x + 1) * MAP.tile.size,
            y: this.y * MAP.tile.size,
          };
          // this.drawExplosion(
          //   rightCoordinate,
          //   images.bomb.bombExplosionRightSprite,
          // );
          const rightExplosion = new BombExplosion(
            rightCoordinate,
            images.bomb.bombExplosionRightSprite,
            this.ctx,
          );
          this.explosionArray.push(rightExplosion);
          // rightExplosion.draw()
          break;

        case "bottom":
          const bottomCoordinate: Point = {
            x: this.x * MAP.tile.size,
            y: (this.y + 1) * MAP.tile.size,
          };
          // this.drawExplosion(
          //   bottomCoordinate,
          //   images.bomb.bombExplosionBottomSprite,
          // );
          const bottomExplosion = new BombExplosion(
            bottomCoordinate,
            images.bomb.bombExplosionBottomSprite,
            this.ctx,
          );
          this.explosionArray.push(bottomExplosion);
          // bottomExplosion.draw()
          break;

        default:
          break;
      }
      setTimeout(() => {
        this.bombActive = false;
      }, 1000);
    }
  }
}
