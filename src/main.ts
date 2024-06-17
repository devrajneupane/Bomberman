import "./styles/style.css";

import { CANVAS } from "./constants/canvas";
import Player from "./components/Player";
import { Layout } from "./components/Layout";
import mapData from "./tilemap.json";


const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

const player = new Player(ctx);
const layout = new Layout(ctx);

function animate() {
  ctx.fillStyle = "#1f8b00";
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);

  layout.renderMap(mapData, player);
  player.draw(layout);
  requestAnimationFrame(animate);
}

player.img.onload = () => {
  animate();
};
