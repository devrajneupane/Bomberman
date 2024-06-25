import Bomb from "./Bomb";
import Enemy from "./Enemy";
import Player from "./Player";
import Collectible from "./Collectibles";
import MainMenu from "../scenes/MainMenu";
import GameState from "../enums/GameState";
import { Layout, MapData } from "./Layout";
import { LayoutEditor } from "./LayoutEditor";

import mapData from "../tilemap.json";
import { keys } from "../input/input";
import { images } from "../image/preload";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

// Constants
import { CANVAS } from "../constants/canvas";
import { SCORE_KEY } from "../constants/localStorage";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

export default class Game {
  score: number;
  scoreUpdated: boolean;
  highScore: number;
  timer: number;
  lives: number = 3;
  homeScreen: boolean = true;
  layout: Layout;
  layoutEditor: LayoutEditor;
  player: Player;
  state: GameState;
  collectible: Collectible;
  enemyArray: Enemy[];
  bomb: Bomb;
  mapData: MapData;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.mapData = mapData;
    this.ctx = ctx;
    this.score = 0;
    this.scoreUpdated = false;
    this.highScore = getLocalStorage(SCORE_KEY) ?? 0;
    this.timer = 200;
    this.enemyArray = [];
    this.state = GameState.HomeScreen;

    this.layout = new Layout(this.mapData, this.ctx);
    this.layoutEditor = new LayoutEditor(this.mapData, canvas, this.ctx);
    this.collectible = new Collectible(
      this.mapData,
      images.powerUps.speedUp,
      this.ctx,
    );
    this.player = new Player(this, this.collectible, this.mapData, this.ctx);
    this.bomb = new Bomb(
      this,
      this.player,
      this.collectible,
      this.mapData,
      this.ctx,
    );

    // this.enemyArray = Array(15)
    //   .fill(0)
    //   .map(() => new Enemy(this.layoutEditor.mapData, this.player, this.ctx));
  }

  gameLoop() {
    // FIX: this is not the way
    if (this.enemyArray.length === 0)
      this.enemyArray = Array(15)
        .fill(0)
        .map(
          () =>
            new Enemy(this.layoutEditor.mapData, this.player, this, this.ctx),
        );

    switch (this.state) {
      case GameState.HomeScreen:
        const home = new MainMenu(this, this.ctx, canvas);
        home.draw();
        return;

      case GameState.LevelEditor:
        this.layoutEditor.drawGrid();
        this.layoutEditor.itemBar();

        if (keys.space) {
          this.state = GameState.Playing;
          this.layoutEditor.itemCanvas.style.display = "none";

          // Translate canvas back to original position
          this.ctx.translate(-this.layoutEditor.offsetX, 0);
          this.layoutEditor.offsetX = 0;

          // start timer
          this.startTimer();

          keys.space = false;
        }
        break;

      case GameState.Playing:
        this.layout.renderMap();
        for (let enemy of this.enemyArray) enemy.draw();
        if (!this.player.isDead) this.player.draw();

        break;

      case GameState.GameOver:
        if (this.score > this.highScore) {
          setLocalStorage(SCORE_KEY, this.score);
        }

        if (this.lives === 0 && this.player.isDead) {
          this.state = GameState.HomeScreen;
        }
        return;

      default:
        break;
    }
    this.layout.renderMap();
  }

  /**
   * Set timer for the game
   */
  startTimer() {
    const countdownInterval = setInterval(() => {
      this.timer--;

      // Check if timer has reached 0
      if (this.timer <= 0) {
        clearInterval(countdownInterval);
        if (this.lives <= 0) this.state = GameState.GameOver;
      }
    }, 1000);
  }
}
