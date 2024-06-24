import Player from "./Player";
import Enemy from "./Enemy";
import Bomb from "./Bomb";
import { Layout, MapData } from "./Layout";
import { LayoutEditor } from "./LayoutEditor";
import { keys } from "../input/input";
import mapData from "../tilemap.json";
import { CANVAS } from "../constants/canvas";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

export default class Game {
  score: number;
  // highScore: number;
  time: number;
  layout: Layout;
  layoutEditor: LayoutEditor;
  loadedFromEditor: boolean;
  player: Player;
  enemy: Enemy;
  enemyArray: Enemy[];
  bomb: Bomb;
  mapData: MapData;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.mapData = mapData;
    this.ctx = ctx;
    this.score = 0;
    // this.highScore = ;
    this.time = 0;
    this.loadedFromEditor = false;
    this.enemyArray = [];

    this.layout = new Layout(this.mapData, this.ctx);
    this.layoutEditor = new LayoutEditor(this.mapData, canvas, this.ctx);
    this.player = new Player(this.mapData, this.ctx);
    this.enemy = new Enemy(this.mapData, this.player, this.ctx);
    this.bomb = new Bomb(this.player, this.mapData, this.ctx);
  }

  gameLoop() {
    this.layout.renderMap();
    if (!keys.space) {
      this.layoutEditor.drawGrid();
      this.layoutEditor.itemBar();
    } else {
      if (!this.loadedFromEditor) {
        this.enemyArray = Array(50)
          .fill(0)
          .map(
            () => new Enemy(this.layoutEditor.mapData, this.player, this.ctx),
          );
        this.loadedFromEditor = true;
      }
      this.layout.renderMap();
      // TODO: hide itemCanvas from layoutEditor
      this.layoutEditor.itemCanvas.style.display = "none";
      this.player.draw();
      for (let enemy of this.enemyArray) {
        enemy.draw();
      }
    }
  }
}
