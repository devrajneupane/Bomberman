import { CANVAS } from "../constants/canvas";
import { MAP } from "../constants/map";
import { DIRECTION_MAP } from "../constants/sprites";
import { keys } from "../input/input";
import { images } from "../image/preload";
import { MapData } from "./Layout";
import Bomb from "./Bomb";
import { Point } from "../types/point";

export default class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  sx: number;
  sy: number;
  direction: string;
  directions: string[];
  spriteCounter: number;
  img: HTMLImageElement;
  elaspedFrame: number = 0;
  currentFrame: number = 0;
  frameIndexes: number[];
  speed: number;
  offsetX: number;
  offsetY: number;
  mapData: MapData;
  bomb: Bomb;
  ctx: CanvasRenderingContext2D;

  constructor(mapData: MapData, ctx: CanvasRenderingContext2D) {
    this.x = 0;
    this.y = 0;
    this.width = MAP.tile.size;
    this.height = MAP.tile.size;
    this.ctx = ctx;

    this.sx = 0;
    this.sy = 0;

    this.spriteCounter = 0;
    this.speed = 5;
    this.img = images.player.playerSprite;

    this.directions = ["left", "right", "up", "down", "idle"];
    this.direction = this.directions[0];
    this.frameIndexes = DIRECTION_MAP[this.direction];
    this.offsetX = 0;
    this.offsetY = 0;
    this.mapData = mapData;

    this.bomb = new Bomb(this.calculateCoordinate(), this.ctx);
  }

  /**
   * Draw player on canvas
   */
  draw() {
    this.elaspedFrame++;
    this.currentFrame = (this.currentFrame + 1) % this.frameIndexes.length;

    if (keys.left) {
      this.direction = this.directions[0];
      this.moveLeft();
    } else if (keys.right) {
      this.direction = this.directions[1];
      this.moveRight();
    } else if (keys.up) {
      this.direction = this.directions[2];
      this.moveUp();
    } else if (keys.down) {
      this.direction = this.directions[3];
      this.moveDown();
    } else if (keys.keyX && !this.bomb.bombActive) {
      this.dropBomb();
    }

    if (this.bomb.bombActive) {
      this.bomb.draw();
    }

    this.ctx.drawImage(
      this.img,
      this.sx,
      0,
      16,
      16,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  /**
   * Frame Buffer
   */
  frameBuffer() {
    const frameIndex = this.frameIndexes[this.currentFrame];
    this.frameIndexes = DIRECTION_MAP[this.direction];
    if (this.elaspedFrame % 4 === 0) {
      this.sx = frameIndex * 16;
    }
  }

  /**
   * Move player left
   */
  moveLeft() {
    this.frameBuffer();
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x < CANVAS.width / 2 && this.offsetX < 0) {
      this.ctx.translate(this.speed, 0);
      this.offsetX += this.speed;
    }
  }

  /**
   * Move player right
   */
  moveRight() {
    this.frameBuffer();
    this.x += this.speed;
    if (this.x + this.width > this.mapData.width * MAP.tile.size) {
      this.x = this.mapData.width * MAP.tile.size - this.width;
    }
    if (
      this.x > CANVAS.width / 2 &&
      this.offsetX > -(this.mapData.width * MAP.tile.size - CANVAS.width - 1)
    ) {
      this.ctx.translate(-this.speed, 0);
      this.offsetX -= this.speed;
    }
  }

  /**
   * Move player up
   */
  moveUp() {
    this.frameBuffer();
    this.y -= this.speed;
    if (this.y < 0) {
      this.y = 0;
    }
  }

  /**
   * Move player down
   */
  moveDown() {
    this.frameBuffer();
    this.y += this.speed;
    if (this.y + this.height > CANVAS.height) {
      this.y = CANVAS.height - this.height;
    }
  }

  /**
   * Calculate coordinate of player in map
   */
  calculateCoordinate(): Point {
    const x = Math.floor((this.x + this.width / 2) / MAP.tile.size);
    const y = Math.floor((this.y + this.height / 2) / MAP.tile.size);
    return { x: x, y: y };
  }

  /**
   * Drop bomb at current position
   */
  dropBomb() {
    this.bomb = new Bomb(this.calculateCoordinate(), this.ctx);
    this.bomb.bombActive = true;

    setTimeout(() => {
      this.bomb.calculateExplosion()
      // this.bombActive = false;
    }, 2500);
  }
}
