import "./styles/style.css";

import { CANVAS } from "./constants/canvas";
import Player from "./components/Player";
import { Layout } from "./components/Layout";
import mapData from "./tilemap.json";
import { LayoutEditor } from "./components/LayoutEditor";
import { keys } from "./input/input";
import Enemy from "./components/Enemy";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

const player = new Player(mapData, ctx);
const layout = new Layout(mapData, ctx);
const layoutEditor = new LayoutEditor(mapData, canvas, ctx);

let loadedFromEditor = false;
let enemyArray: Enemy[];

function animate() {
  ctx.fillStyle = "#1f8b00";
  // ctx.clearRect(player.offsetX || layoutEditor.offsetX, 0, CANVAS.width, CANVAS.height);
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  ctx.fillRect(
    -player.offsetX || -layoutEditor.offsetX,
    0,
    CANVAS.width,
    CANVAS.height,
  );

  layout.renderMap();

  if (!keys.space) {
    layoutEditor.drawGrid();
    layoutEditor.itemBar();
  } else {
    if (!loadedFromEditor) {
      enemyArray = Array(5)
        .fill(0)
        .map(() => new Enemy(layoutEditor.mapData, player, ctx));
      loadedFromEditor = true;
    }
    layout.renderMap();
    // TODO: hide itemCanvas from layoutEditor
    layoutEditor.itemCanvas.style.display = "none";
    player.draw();
    for (let enemy of enemyArray) {
      enemy.draw();
    }
    player.draw();
  }

  requestAnimationFrame(animate);
}

window.onload = () => {
  animate();
};
