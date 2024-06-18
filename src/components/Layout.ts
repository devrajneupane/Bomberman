import { MAP } from "../constants/map";
import Player from "./Player";
import { CANVAS } from "../constants/canvas";
import { images } from "../image/preload";

export type MapData = {
  width: number;
  height: number;
  tiles: number[][];
};

export class Layout {
  x: number = 0;
  y: number = 0;
  mapData: MapData;
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement = images.wall.hardWall;

  constructor(mapData: MapData, ctx: CanvasRenderingContext2D) {
    this.mapData = mapData;
    this.ctx = ctx;
  }

  /**
   * Draw layout on canvas
   */
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, MAP.tile.size, MAP.tile.size);
  }

  /**
   * Renders map from json data
   */
  renderMap(player: Player) {
    for (let y = 0; y < this.mapData.height; y++) {
      for (let x = 0; x < this.mapData.width; x++) {
        const tileType = this.mapData.tiles[x][y];

        switch (tileType) {
          case 0:
            continue;
          case 1:
            this.img = images.wall.hardWall;
            break;
          case 2:
            this.img = images.wall.wall;
            break;
          default:
            break;
        }

        // Move map
        // FIX: Still not working
        if (player.x >= CANVAS.width / 2) {
          this.x = (x - 1) * MAP.tile.size;
        } else {
          this.x = x * MAP.tile.size;
        }
        this.y = y * MAP.tile.size;
        this.draw();
      }
    }
  }
}
