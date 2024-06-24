import Player from "./Player";
import { MapData } from "./Layout";
import { Items } from "../enums/items";
import { Point } from "../types/point";
import { EnemySprite } from "../types/EnemySprite";
import { Direction } from "../enums/Direction";

import { MAP } from "../constants/map";
import { ENEMIES } from "../constants/sprites";

import { images } from "../image/preload";
import { getRandomKey, getRandomValue } from "../utils/helper";
import { isCollidedAABB, isEnemyCollided } from "../utils/collision";
import { getRandomEnemyPosition } from "../utils/getRandomEnemyPosition";


export default class Enemy {
  position: Point;
  width: number;
  height: number;
  sPosition: Point;
  sWidth: number;
  sHeight: number;
  prevX: number;
  prevY: number;
  prevItem: Items;
  spriteName: EnemySprite;
  speed: number;
  direction: Direction;
  dirCount: number;
  elaspedFrame: number = 0;
  currentFrame: number = 0;
  frameIndexes: number[];
  spriteCounter: number;
  enemyOffset: number = 5;
  mapData: MapData;
  isDying: boolean = false;
  isDead: boolean = false;
  player: Player;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(mapData: MapData, player: Player, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.player = player;
    this.mapData = mapData;
    this.width = MAP.tile.size - this.enemyOffset;
    this.height = MAP.tile.size - this.enemyOffset;
    this.sPosition = { x: 0, y: 0 };
    this.position = getRandomEnemyPosition(this.mapData);

    this.dirCount = 0;
    this.spriteCounter = 0;
    this.spriteName = getRandomKey(ENEMIES.sprites)!;

    this.sWidth = ENEMIES.sprites[this.spriteName].sWidth as number;
    this.sHeight = ENEMIES.sprites[this.spriteName].sWidth as number;
    this.speed = ENEMIES.sprites[this.spriteName].speed as number;
    this.prevX = 0;
    this.prevY = 0;
    this.prevItem = Items.Empty;

    this.img = images.enemies[this.spriteName];
    this.direction = getRandomValue(Direction)!;
    this.frameIndexes = ENEMIES.directions[this.direction];
  }

  draw() {
    if (this.isDead) return;

    if (!this.isDying) {
      this.elaspedFrame++;
      this.currentFrame = (this.currentFrame + 1) % this.frameIndexes.length;

      // check collision with player
      this.isCollidedWithPlayer();

      switch (this.direction) {
        case Direction.Left: {
          this.moveLeft();
          break;
        }
        case Direction.Up: {
          this.moveUp();
          break;
        }
        case Direction.Right: {
          this.moveRight();
          break;
        }
        case Direction.Down: {
          this.moveDown();
          break;
        }
        default:
          break;
      }
    }

    this.ctx.drawImage(
      this.img,
      this.sPosition.x,
      this.sPosition.y,
      this.sWidth,
      this.sHeight,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }

  /**
   * Move enemy left
   */
  moveLeft() {
    this.frameBuffer();
    if (isEnemyCollided(this, this.direction)) {
      this.direction = Direction.Right;
      this.randomizeDirection();
      return;
    }
    this.position.x -= this.speed;
    if (this.position.x < MAP.tile.size) {
      this.position.x = MAP.tile.size;
      this.direction = Direction.Right;
    }
  }

  /**
   * Move enemy right
   */
  moveRight() {
    this.frameBuffer();
    if (isEnemyCollided(this, this.direction)) {
      this.direction = Direction.Left;
      this.randomizeDirection();
      return;
    }
    this.position.x += this.speed;
    if (
      this.position.x + this.width >
      (this.mapData.width - 1) * MAP.tile.size
    ) {
      this.position.x = (this.mapData.width - 1) * MAP.tile.size - this.width;
      this.direction = Direction.Left;
    }
  }

  /**
   * Move enemy up
   */
  moveUp() {
    this.frameBuffer();
    if (isEnemyCollided(this, this.direction)) {
      this.direction = Direction.Down;
      this.randomizeDirection();
      return;
    }
    this.position.y -= this.speed;
    if (this.position.y < MAP.tile.size) {
      this.position.y = MAP.tile.size;
      this.direction = Direction.Down;
    }
  }

  /**
   * Move enemy down
   */
  moveDown() {
    this.frameBuffer();
    if (isEnemyCollided(this, this.direction)) {
      this.direction = Direction.Up;
      this.randomizeDirection();
      return;
    }
    this.position.y += this.speed;
    if (
      this.position.y + this.height >
      (this.mapData.height - 1) * MAP.tile.size
    ) {
      this.position.y = (this.mapData.height - 1) * MAP.tile.size - this.height;
      this.direction = Direction.Up;
    }
  }

  /**
   * @desc Frame Buffer
   */
  frameBuffer() {
    const frameIndex = this.frameIndexes[this.currentFrame];
    this.frameIndexes = ENEMIES.directions[this.direction];
    if (this.elaspedFrame % 10 === 0) {
      this.sPosition.x = frameIndex * this.sWidth;
    }
  }

  /**
   * Kill player if collided with player
   */
  isCollidedWithPlayer() {
    if (!isCollidedAABB(this.player, this)) return;

    this.player.img = images.player.playerDyingSprite;
    this.player.sHeight = 21;
    this.player.currentFrame = 0;
    this.player.elaspedFrame = 0;
    this.player.isDying = true;
    this.elaspedFrame = 0;

    const timeoutId = setTimeout(() => {
      this.player.isDead = true;
      const { x, y } = this.player.calculateCoordinate();
      this.mapData.tiles[x][y] = Items.Empty;
      clearTimeout(timeoutId);
    }, 2000);
  }

  /**
   * Randomly choose direction if it's bouncing back and forth in same
   * direction for more than 5 times
   */
  randomizeDirection() {
    this.dirCount++;
    if (this.dirCount > 5) {
      this.direction =
        Object.values(Direction)[
          Math.floor(Math.random() * Object.keys(Direction).length)
        ];
      this.dirCount = 0;
    }
  }
}
