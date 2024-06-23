import { MAP } from "../constants/map";
import { images } from "../image/preload";
import { Items } from "../enums/items";

export type MapData = {
  width: number;
  height: number;
  tiles: number[][];
};

export class Layout {
  x: number = 0;
  y: number = 0;
  width: number = MAP.tile.size;
  height: number = MAP.tile.size;
  mapData: MapData;
  ctx: CanvasRenderingContext2D;
  img: HTMLImageElement = images.wall.concreteWall;

  constructor(mapData: MapData, ctx: CanvasRenderingContext2D) {
    this.mapData = mapData;
    this.ctx = ctx;
  }

  /**
   * Draw layout on canvas
   */
  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      16,
      16,
      this.x,
      this.y,
      MAP.tile.size,
      MAP.tile.size,
    );
  }

  /**
   * Renders map from json data
   */
  renderMap() {
    for (let y = 0; y < this.mapData.height; y++) {
      for (let x = 0; x < this.mapData.width; x++) {
        // const tileType = this.mapData.tiles[x][y];
        const tileType =
          (x & 1) === 0 && (y & 1) === 0
            ? Items.concreteWall
            : this.mapData.tiles[x][y];

        // TODO: Refactor this swtich statement
        switch (tileType) {
          case Items.Empty:
            continue;
          case Items.concreteWall:
            this.img = images.wall.concreteWall;
            break;
          case Items.brickWall:
            this.img = images.wall.brickWall;
            break;
          case Items.Player:
            // this.img = images.player.playerSprite;
            // break;
            continue;
          case Items.Ballom:
            this.img = images.enemies.ballomSprite;
            break;
          case Items.Dahl:
            this.img = images.enemies.dahlSprite;
            break;
          case Items.Minvo:
            this.img = images.enemies.minvoSprite;
            break;
          case Items.Onil:
            this.img = images.enemies.onilSprite;
            break;
          case Items.Ovape:
            this.img = images.enemies.ovapeSprite;
            break;
          case Items.Pass:
            this.img = images.enemies.passSprite;
            break;
          case Items.Pontan:
            this.img = images.enemies.pontanSprite;
            break;
          case Items.BombUp:
            this.img = images.powerUps.bombUp;
            break;
          case Items.FireUp:
            this.img = images.powerUps.fireUp;
            break;
          case Items.FlamePass:
            this.img = images.powerUps.flamePass;
            break;
          case Items.RemoteControl:
            this.img = images.powerUps.remoteControl;
            break;
          case Items.SpeedUp:
            this.img = images.powerUps.speedUp;
            break;
          case Items.WallPass:
            this.img = images.powerUps.wallPass;
            break;
          case Items.Door:
            this.img = images.door;
            break;
          default:
            break;
        }

        this.x = x * MAP.tile.size;
        this.y = y * MAP.tile.size;
        this.draw();
      }
    }
  }
}
