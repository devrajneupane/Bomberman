// Import global styles for the application
import "./styles/style.css";

import Game from "./components/Game";
import GameState from "./enums/GameState";
import { clearCanvas, putText } from "./utils/helper";

// Constants
import { CANVAS } from "./constants/canvas";
import { MAP } from "./constants/map";

const game = new Game();
let animationId: number;

function animate() {
  clearCanvas(game);

  if (game.state !== GameState.HomeScreen) {
    clearCanvas(game, "#b9b9b9", true);

    // Show remaining time, score and lives at the bottom of the screen
    putText(
      `TIME: ${game.timer}`,
      100 - game.player.offsetX ,
      (game.mapData.height + 1) * MAP.tile.size,
      game.ctx,
    );

    putText(
      `SCORE: ${game.score}`,
      350 - game.player.offsetX ,
      (game.mapData.height + 1) * MAP.tile.size,
      game.ctx,
    );

    putText(
      `LEFT: ${game.lives}`,
      600 - game.player.offsetX ,
      (game.mapData.height + 1) * MAP.tile.size,
      game.ctx,
    );
  }

  game.gameLoop();
  animationId = requestAnimationFrame(animate);
}

/**
 * Event listener for pause and resume
 */
document.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key !== "p") return;

  switch (game.state) {
    case GameState.Playing:
      clearCanvas(game);
      putText(
        "PAUSED",
        -game.player.offsetX + CANVAS.width / 2,
        CANVAS.height / 2,
        game.ctx,
      );
      putText(
        "Press P to resume",
        -game.player.offsetX + CANVAS.width / 2,
        CANVAS.height / 2 + 50,
        game.ctx,
      );

      game.state = GameState.Paused;
      cancelAnimationFrame(animationId!);
      break;

    case GameState.Paused:
      game.state = GameState.Playing;
      animate();
      break;

    default:
      break;
  }
});

/*
 * Event listener for game to start
 */
window.onload = () => {
  animate();
};
