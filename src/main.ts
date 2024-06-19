import "./styles/style.css";

import { CANVAS } from "./constants/canvas";
import Player from "./components/Player";
import { Layout } from "./components/Layout";
import mapData from "./tilemap.json";
import { LayoutEditor } from "./components/LayoutEditor";

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

const player = new Player(mapData, ctx);
const layout = new Layout(mapData, ctx);
const layoutEditor = new LayoutEditor(mapData, canvas, ctx);

function animate() {
  ctx.fillStyle = "#1f8b00";
  ctx.clearRect(player.offsetX, 0, CANVAS.width, CANVAS.height);
  ctx.fillRect(-player.offsetX, 0, CANVAS.width, CANVAS.height);

  layout.renderMap(player);
  layoutEditor.drawGrid();
  layoutEditor.itemBar();
  player.draw();
  requestAnimationFrame(animate);
}

window.onload = () => {
  animate();
};
