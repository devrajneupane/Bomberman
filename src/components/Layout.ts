import { MAP } from "../constants/map";
import hardWall from "/game/map/hard-wall.png";
import Player from "./Player";
import wall from "/game/sprites/wall/wall.png";
import { CANVAS } from "../constants/canvas";

export class Layout {
  x: number = 0;
  y: number = 0;
  width: number = MAP.tile.size;
  height: number = MAP.tile.size;
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;

    this.img = new Image();
  }

  /**
   * Draw layout on canvas
   */
  draw() {
    this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Renders map from json data
   */
  renderMap(mapData: any, player: Player) {
    const { width, height, tiles } = mapData;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const tileType = tiles[x][y];

        switch (tileType) {
          case 0:
            this.img.src = wall;
            break;
          case 1:
            this.img.src = hardWall;
            break;
          default:
            break;
        }

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
