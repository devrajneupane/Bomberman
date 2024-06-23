import { MAP } from "../constants/map";
import { Items } from "../enums/items";
import { images } from "../image/preload";
import { Point } from "../types/point";
import BombExplosion from "./BombExplosion";
import { MapData } from "./Layout";
import Player from "./Player";

export default class Bomb {
  position: Point;
  sPosition: Point;
  sWidth: number;
  sHeight: number;
  width: number = MAP.tile.size;
  height: number = MAP.tile.size;
  player: Player;
  bombActive: boolean = false;
  bombExploded: boolean;
  spriteCounter: number;
  elaspedFrame: number;
  currentFrame: number;
  frameIndexes: number[];
  mapData: MapData;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  explosionArray: BombExplosion[];

  constructor(player: Player, mapData: MapData, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.player = player;
    this.mapData = mapData;

    this.sWidth = 17;
    this.sHeight = 18;
    this.sPosition = { x: 0, y: 0 };
    this.position = player.calculateCoordinate();

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

    this.frameBuffer();
    this.ctx.drawImage(
      this.img,
      this.sPosition.x,
      this.sPosition.y,
      this.sWidth,
      this.sHeight,
      this.position.x * MAP.tile.size,
      this.position.y * MAP.tile.size,
      this.width,
      this.height,
    );
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(
      this.position.x * MAP.tile.size,
      this.position.y * MAP.tile.size,
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
      this.sPosition.x = frameIndex * this.sWidth;
      if (frameIndex === 2){
        this.frameIndexes.reverse()
      }
    }
  }

  /**
   * Draw bomb explosion from bomb position
   */
  calculateExplosion() {
    this.frameIndexes.push(4);
    this.sPosition = { x: 0, y: 1 };

    // Change bomb image
    this.img = images.bomb.bombExplosionCenterSprite;

    for (let direction of ["left", "top", "right", "bottom"]) {
      switch (direction) {
        case "left":
          this.bombEffect(
            this.position.x - 1,
            this.position.y,
            images.bomb.bombExplosionLeftSprite,
          );
          break;

        case "top":
          this.bombEffect(
            this.position.x,
            this.position.y - 1,
            images.bomb.bombExplosionTopSprite,
          );
          break;

        case "right":
          this.bombEffect(
            this.position.x + 1,
            this.position.y,
            images.bomb.bombExplosionRightSprite,
          );
          break;

        case "bottom":
          this.bombEffect(
            this.position.x,
            this.position.y + 1,
            images.bomb.bombExplosionBottomSprite,
          );
          break;

        default:
          break;
      }
      setTimeout(() => {
        this.bombActive = false;
      }, 1000);
    }
    this.bombExploded = true;
  }

  /**
   * Calculate effect of bomb to its neighbouring tiles
   */
  bombEffect(x: number, y: number, img: HTMLImageElement) {
    switch (this.mapData.tiles[x][y]) {
      case Items.Empty:
        // Show bomb explosion
        const pos: Point = {
          x: x * MAP.tile.size,
          y: y * MAP.tile.size,
        };
        const leftExplosion = new BombExplosion(pos, img, this.ctx);
        this.explosionArray.push(leftExplosion);
        break;

      case Items.brickWall:
        // TODO: explode brick wall
        this.mapData.tiles[x][y] = 0;
        break;

      case Items.Player:
        // TODO: explode player and reset statge or game over
        this.player.img = images.player.playerDyingSprite;
        this.player.sHeight = 21;
        this.player.currentFrame = 0;
        this.player.elaspedFrame = 0;
        this.player.isDying = true;
        this.elaspedFrame = 0;

        setTimeout(() => {
          this.player.isDead = true;
        }, 2000);
        break;

      case Items.Dahl:
        // TODO: explode enemy and increase score
        break;

      default:
        break;
    }
  }
}