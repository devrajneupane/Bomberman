import { CANVAS } from "../constants/canvas";
import { MAP } from "../constants/map";
import { DIRECTION_MAP } from "../constants/sprites";
import { Direction } from "../enums/Direction";
import { Items } from "../enums/items";
import { images } from "../image/preload";
import { keys } from "../input/input";
import { Point } from "../types/point";
import { isCollided } from "../utils/collision";
import Bomb from "./Bomb";
// import Enemy from "./Enemy";
import { MapData } from "./Layout";

export default class Player {
  position: Point;
  width: number;
  height: number;
  sx: number;
  sy: number;
  sWidth: number;
  sHeight: number;
  prevX: number;
  prevY: number;
  prevItem: Items;
  direction: Direction;
  spriteCounter: number;
  img: HTMLImageElement;
  elaspedFrame: number = 0;
  currentFrame: number = 0;
  frameIndexes: number[];
  isDead: boolean = false;
  isDying: boolean = false;
  speed: number;
  offsetX: number;
  offsetY: number;
  playerOffset: number = 10;
  mapData: MapData;
  bomb: Bomb;
  // enemy: Enemy;
  ctx: CanvasRenderingContext2D;

  constructor(mapData: MapData, ctx: CanvasRenderingContext2D) {
    this.position = {
      x: MAP.tile.size + this.playerOffset,
      y: MAP.tile.size + this.playerOffset,
    };
    this.width = MAP.tile.size - this.playerOffset;
    this.height = MAP.tile.size - this.playerOffset;
    this.ctx = ctx;

    this.sx = 0;
    this.sy = 0;
    this.sWidth = 16;
    this.sHeight = 16;

    this.prevX = 0;
    this.prevY = 0;
    this.prevItem = Items.Empty;

    this.spriteCounter = 0;
    this.speed = 2;
    this.img = images.player.playerSprite;

    this.direction = Direction.Right;
    this.frameIndexes = DIRECTION_MAP[this.direction];
    this.offsetX = 0;
    this.offsetY = 0;
    this.mapData = mapData;

    this.bomb = new Bomb(this, this.mapData, this.ctx);
  }

  /**
   * Draw player on canvas
   */
  draw() {
    if (this.isDead) return;

    this.elaspedFrame++;
    this.currentFrame = (this.currentFrame + 1) % this.frameIndexes.length;
    if (this.isDying) {
      this.frameBuffer(25);
    }

    if (keys.left) {
      this.direction = Direction.Left;
      this.moveLeft();
    } else if (keys.right) {
      this.direction = Direction.Right;
      this.moveRight();
    } else if (keys.up) {
      this.direction = Direction.Up;
      this.moveUp();
    } else if (keys.down) {
      this.direction = Direction.Down;
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
      this.sy,
      this.sWidth,
      this.sHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }

  /**
   * Frame Buffer
   */
  // TODO: move it to utils
  frameBuffer(delta: number = 4) {
    const frameIndex = this.frameIndexes[this.currentFrame];
    this.frameIndexes = this.isDying
      ? DIRECTION_MAP["dying"]
      : DIRECTION_MAP[this.direction];
    if (this.elaspedFrame % delta === 0) {
      this.sx = frameIndex * 16;
    }
  }

  /**
   * Move player left
   */
  moveLeft() {
    if (isCollided(this, Direction.Left)) return;
    this.frameBuffer();
    this.position.x -= this.speed;
    if (this.position.x < MAP.tile.size) {
      this.position.x = MAP.tile.size;
    }
    if (this.position.x <= CANVAS.width / 2 && this.offsetX < 0) {
      this.ctx.translate(this.speed, 0);
      this.offsetX += this.speed;
    }
    this.updateTile();
  }

  /**
   * Move player right
   */
  moveRight() {
    if (isCollided(this, Direction.Right)) return;
    this.frameBuffer();
    this.position.x += this.speed;
    if (
      this.position.x + this.width >
      (this.mapData.width - 1) * MAP.tile.size
    ) {
      this.position.x = (this.mapData.width - 1) * MAP.tile.size - this.width;
    }
    if (
      this.position.x > CANVAS.width / 2 &&
      this.offsetX > -(this.mapData.width * MAP.tile.size - CANVAS.width - 1)
    ) {
      this.ctx.translate(-this.speed, 0);
      this.offsetX -= this.speed;
    }
    this.updateTile();
  }

  /**
   * Move player up
   */
  moveUp() {
    if (isCollided(this, Direction.Up)) return;
    this.frameBuffer();
    this.position.y -= this.speed;
    if (this.position.y < MAP.tile.size) {
      this.position.y = MAP.tile.size;
    }
    this.updateTile();
  }

  /**
   * Move player down
   */
  moveDown() {
    if (isCollided(this, Direction.Down)) return;
    this.frameBuffer();
    this.position.y += this.speed;
    if (
      this.position.y + this.height >
      (this.mapData.height - 1) * MAP.tile.size
    ) {
      this.position.y = (this.mapData.height - 1) * MAP.tile.size - this.height;
    }
    this.updateTile();
  }

  /**
   * Calculate coordinate of player in map
   */
  calculateCoordinate(): Point {
    const x = Math.floor((this.position.x + this.width / 2) / MAP.tile.size);
    const y = Math.floor((this.position.y + this.height / 2) / MAP.tile.size);
    return { x: x, y: y };
  }

  /**
   * Drop bomb at current position
   */
  dropBomb() {
    this.bomb = new Bomb(this, this.mapData, this.ctx);
    this.bomb.bombActive = true;

    setTimeout(() => {
      this.bomb.calculateExplosion();
    }, 2500);
  }

  /**
   * Update tile as player move through it
   */
  updateTile() {
    const pos = this.calculateCoordinate();

    if (pos.x !== this.prevX || pos.y !== this.prevY) {
      this.mapData.tiles[this.prevX][this.prevY] = this.prevItem;
      this.prevItem = this.mapData.tiles[pos.x][pos.y];
      this.mapData.tiles[pos.x][pos.y] = Items.Player;
      this.prevX = pos.x;
      this.prevY = pos.y;
    }
  }
}
