import "./styles/style.css";

import { CANVAS } from "./constants/canvas";
import Player from "./components/Player";
import { Layout } from "./components/Layout";
import mapData from "./tilemap.json";
import { LayoutEditor } from "./components/LayoutEditor";
import { keys } from "./input/input";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

const player = new Player(mapData, ctx);
const layout = new Layout(mapData, ctx);
const layoutEditor = new LayoutEditor(mapData, canvas, ctx);

function animate() {
  ctx.fillStyle = "#1f8b00";
  // ctx.clearRect(player.offsetX || layoutEditor.offsetX, 0, CANVAS.width, CANVAS.height);
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  ctx.fillRect(-player.offsetX || -layoutEditor.offsetX, 0, CANVAS.width, CANVAS.height);

  layout.renderMap();

  if (!keys.space) {
    layoutEditor.drawGrid();
    layoutEditor.itemBar();
  } else {
  layout.renderMap();
    player.draw();
    layoutEditor.itemCanvas.style.display = "none";
  }

  requestAnimationFrame(animate);
}

window.onload = () => {
  animate();
};
