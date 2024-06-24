import { MAP } from "../constants/map";
import { POWER_UP } from "../constants/sprites";
import { Items } from "../enums/items";
import { Point } from "../types/point";
import { getRandomEnemyPosition } from "../utils/getRandomEnemyPosition";
import { MapData } from "./Layout";

export default class Collectible {
  position: Point;
  sWidth: number;
  sHeight: number;
  width: number;
  height: number;
  name: Items;
  hidden: boolean = true;
  mapData: MapData;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    mapData: MapData,
    img: HTMLImageElement,
    ctx: CanvasRenderingContext2D,
  ) {
    this.img = img;
    this.ctx = ctx;
    this.mapData = mapData;

    this.position = getRandomEnemyPosition(this.mapData);
    this.sWidth = POWER_UP.size.sWidth;
    this.sHeight = POWER_UP.size.sHeight;

    this.width = MAP.tile.size;
    this.height = MAP.tile.size;
    this.name = Items.SpeedUp

    this.addBrickWall();
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      this.sWidth,
      this.sHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  /**
   * Initally add brick wall at collectible position
   */
  addBrickWall() {
    let x = this.position.x / MAP.tile.size;
    const y = this.position.y / MAP.tile.size;

    this.mapData.tiles[x][y] = Items.brickWall;
  }

  /**
   * Calculate coordinate of collectible in map
   */
  calculateCoordinate(): Point {
    const x = Math.floor(this.position.x / MAP.tile.size);
    const y = Math.floor(this.position.y / MAP.tile.size);
    return { x: x, y: y };
  }
}
