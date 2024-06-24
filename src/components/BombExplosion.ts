import { MAP } from "../constants/map";
import { images } from "../image/preload";
import { Point } from "../types/point";
import { isCollidedAABB } from "../utils/collision";
import Game from "./Game";

export default class BombExplosion {
  position: Point;
  sPosition: Point;
  width: number;
  height: number;
  spriteCounter: number;
  elaspedFrame: number;
  currentFrame: number;
  frameIndexes: number[];
  game: Game;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;

  constructor(
    point: Point,
    img: HTMLImageElement,
    game: Game,
    ctx: CanvasRenderingContext2D,
  ) {
    this.position = point;
    this.game = game;
    this.sPosition = { x: 0, y: 0 };
    this.width = MAP.tile.size;
    this.height = MAP.tile.size;

    this.spriteCounter = 0;
    this.elaspedFrame = 0;
    this.currentFrame = 0;
    this.frameIndexes = [0, 1, 2, 3];

    this.img = img;
    this.ctx = ctx;
  }

  /**
   * Draw bomb explosion
   */
  draw() {
    this.elaspedFrame++;
    this.currentFrame = (this.currentFrame + 1) % this.frameIndexes.length;

    this.checkCollision();

    this.frameBuffer();
    this.ctx.drawImage(
      this.img,
      this.sPosition.x,
      this.sPosition.y,
      18,
      16,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
    );
  }

  frameBuffer() {
    const frameIndex = this.frameIndexes[this.currentFrame];
    if (this.elaspedFrame % 25 === 0) {
      this.sPosition.x = frameIndex * 17;
    }
  }

  checkCollision() {
    this.game.enemyArray.forEach((enemy) => {
      if (isCollidedAABB(enemy, this)) {
        enemy.sWidth = 14;
        enemy.spriteCounter = 0;
        enemy.elaspedFrame = 0;
        enemy.currentFrame = 0;
        enemy.frameIndexes = [0, 1, 2, 3];
        enemy.img = images.enemies.enemyDyingSprite;
        enemy.isDying = true;

        this.game.score += 100; // TODO: make score value different for each type of enemy

        const timeoutId = setTimeout(() => {
          enemy.isDead = true;
          clearTimeout(timeoutId);
        }, 2000);
      }
    });
  }
}
