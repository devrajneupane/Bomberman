import "./styles/style.css";

import { CANVAS } from "./constants/canvas";
import Game from "./components/Game";
const game = new Game();

function animate() {
  game.ctx.fillStyle = "#1f8b00";
  // ctx.clearRect(player.offsetX || layoutEditor.offsetX, 0, CANVAS.width, CANVAS.height);
  game.ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
  game.ctx.fillRect(
    -game.player.offsetX || -game.layoutEditor.offsetX,
    0,
    CANVAS.width,
    CANVAS.height,
  );

  game.gameLoop();

  requestAnimationFrame(animate);
}

window.onload = () => {
  animate();
};
