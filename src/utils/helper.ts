import Game from "../components/Game";
import Scene from "../scenes/MainMenu";

// Constants
import { CANVAS } from "../constants/canvas";
import { MAP } from "../constants/map";

/**
 * Selects random key from given object
 * @param obj Object from which a random key is needed
 */
export function getRandomKey<T extends Record<string, any>>(
  obj: T,
): keyof T | undefined {
  const keys = Object.keys(obj);
  if (keys.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}

/**
 * Selects random value from given object
 * @param obj Object from which a random value is needed
 */
export function getRandomValue<T extends Record<string, any>>(
  obj: T,
): T[keyof T] | undefined {
  const keys = Object.keys(obj);
  if (keys.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * keys.length);
  const randomKey = keys[randomIndex] as keyof T;
  return obj[randomKey];
}

/**
 * Put text on canvas at given position
 *
 * @param text - Text to display
 * @param x - X position of text
 * @param y - Y position of text
 * @param ctx - Canvas rendering context
 * @param mainMenu - Scene object
 * @param fontSize - Font size of text
 */
export function putText(
  text: string,
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  mainMenu?: Scene,
  fontSize?: number,
) {
  ctx.font = `${fontSize ?? 30}px BitBold`;
  ctx.fillStyle = "#fff";

  const textWidth = ctx.measureText(text).width;
  const textHeight = parseInt(ctx.font, 10);
  x = x - textWidth / 2;

  if (mainMenu)
    mainMenu.buttons.push({
      text: text,
      textX: x,
      textY: y,
      textWidth: textWidth,
      textHeight: textHeight,
    });

  ctx.fillText(text, x, y);
}

/**
 * Clear canvas from given x position to canvas width
 *
 * @param game - `Game` object
 * @param fillStyle - Fill style for canvas
 * @param partial - Clear canvas partially
 */
export function clearCanvas(
  game: Game,
  fillStyle?: string,
  partial: boolean = false,
) {
  const y = partial ? game.mapData.height * MAP.tile.size : 0;

  game.ctx.fillStyle = fillStyle ?? "#1f8b00";
  game.ctx.clearRect(0, y, CANVAS.width, CANVAS.height);
  game.ctx.fillRect(
    -game.player.offsetX || -game.layoutEditor.offsetX,
    y,
    CANVAS.width,
    CANVAS.height,
  );
}
