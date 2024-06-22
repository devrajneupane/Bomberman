import { MapData } from "./Layout";
import { keys } from "../input/input";
import { MAP } from "../constants/map";
import { images } from "../image/preload";
import { CANVAS } from "../constants/canvas";
import { isCollided } from "../utils/collision";
import { Direction } from "../enums/Direction";
import { DIRECTION_MAP } from "../constants/sprites";

export default class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  sx: number;
  sy: number;
  direction: Direction;
  spriteCounter: number;
  img: HTMLImageElement;
  elaspedFrame: number = 0;
  currentFrame: number = 0;
  frameIndexes: number[];
  speed: number;
  offsetX: number;
  offsetY: number;
  playerOffset: number = 15;
  mapData: MapData;
  ctx: CanvasRenderingContext2D;

  constructor(mapData: MapData, ctx: CanvasRenderingContext2D) {
    this.x = MAP.tile.size + this.playerOffset;
    this.y = MAP.tile.size + this.playerOffset;
    this.width = MAP.tile.size - this.playerOffset;
    this.height = MAP.tile.size - this.playerOffset;
    this.ctx = ctx;

    this.sx = 0;
    this.sy = 0;

    this.spriteCounter = 0;
    this.speed = 3;
    this.img = images.player.playerSprite;

    this.direction = Direction.Right;
    this.frameIndexes = DIRECTION_MAP[this.direction];
    this.offsetX = 0;
    this.offsetY = 0;
    this.mapData = mapData;
  }

  /**
   * Draw player on canvas
   */
  draw() {
    this.elaspedFrame++;
    this.currentFrame = (this.currentFrame + 1) % this.frameIndexes.length;

    if (keys.left) {
      this.direction = Direction.Left;
      this.frameBuffer();
      this.moveLeft();
    } else if (keys.right) {
      this.direction = Direction.Right;
      this.frameBuffer();
      this.moveRight();
    } else if (keys.up) {
      this.direction = Direction.Up;
      this.frameBuffer();
      this.moveUp();
    } else if (keys.down) {
      this.direction = Direction.Down;
      this.moveDown();
      this.frameBuffer();
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
    this.ctx.strokeStyle = "red";
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  /**
   * Frame Buffer
   */
  frameBuffer() {
    const frameIndex = this.frameIndexes[this.currentFrame];
    this.frameIndexes = DIRECTION_MAP[this.direction];
    if (this.elaspedFrame % 8 === 0) {
      this.sx = frameIndex * 16;
    }
  }

  /**
   * Move player left
   */
  moveLeft() {
    if (isCollided(this, Direction.Left)) return;
    this.x -= this.speed;
    if (this.x < MAP.tile.size) {
      this.x = MAP.tile.size;
    }
    if (this.x <= CANVAS.width / 2 && this.offsetX < 0) {
      this.ctx.translate(this.speed, 0);
      this.offsetX += this.speed;
    }
  }

  /**
   * Move player right
   */
  moveRight() {
    if (isCollided(this, Direction.Right)) return;
    this.x += this.speed;
    if (
      this.x + this.width >
      this.mapData.width * MAP.tile.size - MAP.tile.size
    ) {
      this.x = this.mapData.width * MAP.tile.size - this.width - MAP.tile.size;
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
    if (isCollided(this, Direction.Up)) return;
    this.y -= this.speed;
    if (this.y < MAP.tile.size) {
      this.y = MAP.tile.size;
    }
  }

  /**
   * Move player down
   */
  moveDown() {
    if (isCollided(this, Direction.Down)) return;
    this.y += this.speed;
    if (
      this.y + this.height >
      this.mapData.height * MAP.tile.size - MAP.tile.size
    ) {
      this.y =
        this.mapData.height * MAP.tile.size - this.height - MAP.tile.size;
    }
  }
}
