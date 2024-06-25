import Game from "../components/Game";
import { CANVAS } from "../constants/canvas";
import GameState from "../enums/GameState";
import { MenuText } from "../enums/MenuText";
import { images } from "../image/preload";
import { clicks } from "../input/input";
import { putText } from "../utils/helper";
import TextInfo from "../types/TextInfo";
import audio from "../audio/preload";

export default class Scene {
  game: Game;
  img: HTMLImageElement;
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  bannerX: number;
  bannerY: number;
  bannerWidth: number;
  bannerHeight: number;
  buttons: TextInfo[];

  constructor(
    game: Game,
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
  ) {
    this.game = game;
    this.ctx = ctx;
    this.canvas = canvas;
    this.img = images.misc.banner;
    this.bannerWidth = 500;
    this.bannerHeight = 300;
    this.bannerX = CANVAS.width / 2 - this.bannerWidth / 2;
    this.bannerY = 80;
    this.buttons = [];
  }

  /**
   * Draw main menu screen on canvas
   */
  draw() {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      228,
      141,
      this.bannerX,
      this.bannerY,
      this.bannerWidth,
      this.bannerHeight,
    );
    putText(
      MenuText.Start,
      this.bannerX + 100,
      this.bannerY + this.bannerHeight + 50,
      this.ctx,
      this,
    );
    putText(
      MenuText.Continue,
      this.bannerX + this.bannerWidth / 2 + 100,
      this.bannerY + this.bannerHeight + 50,
      this.ctx,
      this,
    );
    putText(
      "TOP",
      this.bannerX + 100,
      this.bannerY + this.bannerHeight + 100,
      this.ctx,
      this,
    );
    putText(
      `${this.game.highScore}`,
      this.bannerX + this.bannerWidth / 2 + 100,
      this.bannerY + this.bannerHeight + 100,
      this.ctx,
      this,
    );
    putText(
      MenuText.LevelEditor,
      this.bannerX + this.bannerWidth / 2,
      this.bannerY + this.bannerHeight + 150,
      this.ctx,
      this,
      25,
    );

    this.handleCanvasClick();
    // audio.stage.titleScreen.play();
  }

  /**
   * Click event handler for start screen
   */
  handleCanvasClick() {
    const canvasRect = this.canvas.getBoundingClientRect();
    let [mouseX, mouseY] = [...clicks.canvas];

    const X = mouseX - canvasRect.left;
    const Y = mouseY - canvasRect.top;

    this.buttons.forEach(
      ({ text, textX: x, textY: y, textWidth, textHeight }) => {
        if (this.isMouseOverText(X, Y, x, y, textWidth, textHeight)) {
          switch (text) {
            case MenuText.Start:
              this.game.state = GameState.Playing;
              this.game.startTimer();

              // Pause the title screen music and reset the playback position to the beginning
              // audio.stage.titleScreen.pause();
              // audio.stage.titleScreen.currentTime = 0;
              audio.stage.stageTheme.play();
              break;

            case MenuText.Continue:
              // TODO: start GAME
              break;

            case MenuText.LevelEditor:
              this.game.state = GameState.LevelEditor;
              break;

            default:
              break;
          }
        }
      },
    );

    clicks.canvas.clear();
  }

  /**
   * Check if mouse is over text
   *
   * @param mouseX - X position of mouse
   * @param mouseY - Y position of mouse
   * @param textX - X position of text
   * @param textY - Y position of text
   * @param textWidth - Width of text
   * @param textHeight - Height of text
   * @returns True if mouse is over text, false otherwise
   */
  isMouseOverText(
    mouseX: number,
    mouseY: number,
    textX: number,
    textY: number,
    textWidth: number,
    textHeight: number,
  ): boolean {
    return (
      mouseX >= textX &&
      mouseX <= textX + textWidth &&
      mouseY >= textY - textHeight &&
      mouseY <= textY
    );
  }
}
