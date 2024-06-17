import "./styles/style.css";

import { CANVAS } from "./constants/canvas";
// import { MAP } from "./constants/map";
import Player from "./components/Player";
import mapData from "./tilemap.json";
// import { keys } from "./input/input";


const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const ctx = canvas.getContext("2d")!;

canvas.width = CANVAS.width;
canvas.height = CANVAS.height;

const player = new Player(ctx);

function animate() {
  ctx.fillStyle = "#1f8b00";
  ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  ctx.fillRect(0, 0, CANVAS.width, CANVAS.height);
  player.draw();
  requestAnimationFrame(animate);
}

player.img.onload = () => {
  animate();
};
