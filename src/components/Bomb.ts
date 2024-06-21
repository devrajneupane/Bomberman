import { MAP } from "../constants/map";
import { images } from "../image/preload";

export default class Bomb {
  x: number;
  y: number;
  width: number = MAP.tile.size;
  height: number = MAP.tile.size;
  sx: number;
  sy: number;
  bombActive: boolean = false;
  spriteCounter: number;
  elaspedFrame: number;
  currentFrame: number;
  frameIndexes: number[];
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(playerX: number, playerY: number, ctx: CanvasRenderingContext2D) {
    this.x = playerX;
    this.y = playerY;
    this.ctx = ctx;

    this.sx = 0;
    this.sy = 0;
    this.spriteCounter = 0;

    this.elaspedFrame = 0;
    this.currentFrame = 0;
    this.frameIndexes = [0, 1, 2];

    this.img = images.bomb.bombSprite;
  }

  draw() {
    this.elaspedFrame++;
    this.currentFrame = (this.currentFrame + 1) % this.frameIndexes.length;

    this.frameBuffer();
    this.ctx.drawImage(
      this.img,
      this.sx,
      this.sy,
      17,
      17,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  frameBuffer() {
    const frameIndex = this.frameIndexes[this.currentFrame];
    if (this.elaspedFrame % 25 === 0) {
      this.sx = frameIndex * 17;
    }
  }
}
