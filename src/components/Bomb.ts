import { MAP } from "../constants/map";
import { Direction } from "../enums/Direction";
import { Items } from "../enums/items";
import { images } from "../image/preload";
import { Obj } from "../types/Obj";
import { Point } from "../types/point";
import BombExplosion from "./BombExplosion";
import Collectible from "./Collectibles";
import Game from "./Game";
import { MapData } from "./Layout";
import Player from "./Player";
import Wall from "./Wall";

export default class Bomb {
  position: Point;
  sPosition: Point;
  sWidth: number;
  sHeight: number;
  width: number = MAP.tile.size;
  height: number = MAP.tile.size;
  player: Player;
  game: Game;
  collectible: Collectible;
  bombActive: boolean = false;
  bombExploded: boolean;
  spriteCounter: number;
  elaspedFrame: number;
  currentFrame: number;
  frameIndexes: number[];
  mapData: MapData;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  explosionArray: Obj[];

  constructor(
    game: Game,
    player: Player,
    collectible: Collectible,
    mapData: MapData,
    ctx: CanvasRenderingContext2D,
  ) {
    this.ctx = ctx;
    this.game = game;
    this.player = player;
    this.collectible = collectible;
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
    for (let explosion of this.explosionArray) {
      explosion.draw();
    }
  }

  frameBuffer() {
    const frameIndex = this.frameIndexes[this.currentFrame];
    if (this.elaspedFrame % 25 === 0) {
      this.sPosition.x = frameIndex * this.sWidth;
      if (frameIndex === 2) {
        this.frameIndexes.reverse();
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

    for (let direction of Object.values(Direction)) {
      switch (direction) {
        case Direction.Left:
          this.bombEffect(
            this.position.x - 1,
            this.position.y,
            images.bomb.bombExplosionLeftSprite,
          );
          break;

        case Direction.Up:
          this.bombEffect(
            this.position.x,
            this.position.y - 1,
            images.bomb.bombExplosionTopSprite,
          );
          break;

        case Direction.Right:
          this.bombEffect(
            this.position.x + 1,
            this.position.y,
            images.bomb.bombExplosionRightSprite,
          );
          break;

        case Direction.Down:
          this.bombEffect(
            this.position.x,
            this.position.y + 1,
            images.bomb.bombExplosionBottomSprite,
          );
          break;

        default:
          break;
      }
      const timeoutId = setTimeout(() => {
        this.bombActive = false;
        clearTimeout(timeoutId);
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
        const bombExplosion = new BombExplosion(pos, img, this.game, this.ctx);
        this.explosionArray.push(bombExplosion);
        break;

      case Items.brickWall:
        // Explode brick wall and reset its tile
        const brickWall = new Wall(
          { x: x * MAP.tile.size, y: y * MAP.tile.size },
          images.wall.brickWallExplosionSprite,
          this.ctx,
        );
        this.explosionArray.push(brickWall);

        // Check if collectible exists at this position and display it if exists
        if (
          x * MAP.tile.size === this.collectible.position.x &&
          y * MAP.tile.size === this.collectible.position.y
        ) {
          this.collectible.hidden = false;
          this.mapData.tiles[x][y] = Items.SpeedUp;
        } else {
          this.mapData.tiles[x][y] = Items.Empty;
        }
        break;

      case Items.Player:
        // TODO: reset stage or game over
        this.game.score = 0;

        // Explode player
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
        break;

      default:
        break;
    }
  }
}
