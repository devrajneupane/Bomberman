import { Point } from "../types/point";
import { MAP } from "../constants/map";

export default class BombExplosion {
  point: Point;
  width: number;
  height: number;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    point: Point,
    img: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
  ) {
    this.point = point;
    this.width = MAP.tile.size;
    this.height = MAP.tile.size;

    this.img = img;
    this.ctx = ctx;
  }

  /**
   * Draw bomb explosion
   */
  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      18,
      16,
      this.point.x,
      this.point.y,
      this.width,
      this.height,
    );
    // this.ctx.strokeStyle = "red";
    // this.ctx.strokeRect(
    //   this.point.x,
    //   this.point.y,
    //   this.width,
    //   this.height,
    // )
  }
}
