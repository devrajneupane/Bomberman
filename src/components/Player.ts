import { CANVAS } from "../constants/canvas";
import { MAP } from "../constants/map";
import { DIRECTION_MAP } from "../constants/sprites";
import { keys } from "../input/input";
import playerSprite from "/game/sprites/player/walking.png";

type Camera = {
  x: number;
  y: number;
};

export default class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  sx: number;
  sy: number;
  direction: string;
  directions: Array<string>;
  spriteCounter: number;
  img: HTMLImageElement;
  elaspedFrame: number = 0;
  currentFrame: number = 0;
  frameIndexes: Array<number>;
  speed: number;
  ctx: CanvasRenderingContext2D;
  camera: Camera;
  constructor(
    ctx: CanvasRenderingContext2D,
  ) {
    this.x = 0;
    this.y = 0;
    this.width = MAP.tile.size - 2;
    this.height = MAP.tile.size - 2;
    this.ctx = ctx;

    this.sx = 0;
    this.sy = 0;

    this.spriteCounter = 0;
    this.speed = 5;
    this.img = new Image();
    this.img.src = playerSprite;

    this.directions = ["left", "right", "up", "down", "idle"];
    this.direction = this.directions[0];
    this.frameIndexes = DIRECTION_MAP[this.direction];
    this.camera = {
      x: this.x,
      y: this.y,
    };
  }

  /**
   * Draw player on canvas
   */
  draw() {
    this.elaspedFrame++;
    this.currentFrame = (this.currentFrame + 1) % this.frameIndexes.length;

    if (keys.left) {
      this.direction = this.directions[0];
      this.frameBuffer();
      this.moveLeft();
      // if (this.x < CANVAS.width / 2) {
      //   layout.x += MAP.tile.size;
      // }
    } else if (keys.right) {
      this.direction = this.directions[1];
      this.frameBuffer();
      this.moveRight();
    } else if (keys.up) {
      this.direction = this.directions[2];
      this.frameBuffer();
      this.moveUp();
    } else if (keys.down) {
      this.direction = this.directions[3];
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
    // this.ctx.strokeStyle = "#fff";
    // this.ctx.strokeRect(this.x, this.y, this.width, this.height);
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
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = 0;
    }
  }

  /**
   * Move player right
   */
  moveRight() {
    this.x += this.speed;
    if (this.x + this.width > CANVAS.width) {
      this.x = CANVAS.width - this.width;
    }
  }

  /**
   * Move player up
   */
  moveUp() {
    this.y -= this.speed;
    if (this.y < 0) {
      this.y = 0;
    }
  }

  /**
   * Move player down
   */
  moveDown() {
    this.y += this.speed;
    if (this.y + this.height > CANVAS.height) {
      this.y = CANVAS.height - this.height;
    }
  }
}
