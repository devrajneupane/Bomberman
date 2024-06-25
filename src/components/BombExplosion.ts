import Game from "./Game";
import { Point } from "../types/point";

import { images } from "../image/preload";
import { isCollidedAABB } from "../utils/collision";

// Constants
import { MAP } from "../constants/map";

/**
 * Represents bomb explosion object
 * @class
 */
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

  /**
   * Create an instance of `BombExplosion`
   *
   * @constructor
   * @param point Position at which the bomb will explode.
   * @param img Image element representing the bomb sprite.
   * @param game Instance of the `Game` class to track game state.
   * @param ctx 2D rendering context for the <canvas> element.
   */
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

  /**
   * Ensure sprite animation update occurs periodically
   */
  frameBuffer() {
    const frameIndex = this.frameIndexes[this.currentFrame];
    if (this.elaspedFrame % 25 === 0) {
      this.sPosition.x = frameIndex * 17;
    }
  }

  /**
   * Check collision between exploded bomb and other objects like
   * `Player/Enemy/Wall`
   */
  checkCollision() {
    this.game.enemyArray.forEach((enemy) => {
      if (isCollidedAABB(enemy, this)) {
        // Update enemy sprite
        enemy.sWidth = 14;
        enemy.spriteCounter = 0;
        enemy.elaspedFrame = 0;
        enemy.currentFrame = 0;
        enemy.frameIndexes = [0, 1, 2, 3];
        enemy.img = images.enemies.enemyDyingSprite;

        enemy.isDying = true;
        this.game.score += 100;

        const timeoutId = setTimeout(() => {
          enemy.isDead = true;
          // if (this.game.scoreUpdated) {
          // this.game.score += 100;
          //   this.game.scoreUpdated = !this.game.scoreUpdated;
          // }
          clearTimeout(timeoutId);
        }, 2000);
      }
    });
  }
}
