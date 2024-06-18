export const keys = {
  left: false,
  right: false,
  up: false,
  down: false,
  enter: false,
  space: false,
};

export const mouse = {
  itemX: 0,
  itemY: 0,
  canvasX: 0,
  canvasY: 0,
};

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const itemCanvas = document.querySelector<HTMLCanvasElement>("#itemCanvas")!;

document.addEventListener("keydown", (event: KeyboardEvent) => {
  switch (event.key) {
    case "ArrowLeft":
    case "h":
    case "a": {
      keys.left = true;
      break;
    }

    case "ArrowRight":
    case "l":
    case "d": {
      keys.right = true;
      break;
    }
    case "ArrowUp":
    case "k":
    case "w": {
      keys.up = true;
      break;
    }
    case "ArrowDown":
    case "j":
    case "s": {
      keys.down = true;
      break;
    }
    case "Enter": {
      keys.enter = true;
      break;
    }
    case " ": {
      keys.space = true;
      break;
    }
  }
});

document.addEventListener("keyup", () => {
  keys.left = false;
  keys.right = false;
  keys.up = false;
  keys.down = false;
  keys.enter = false;
  keys.space = false;
});

itemCanvas.addEventListener("click", (event: MouseEvent) => {
  mouse.itemX = event.x;
  mouse.itemY = event.y;
});

canvas.addEventListener("click", (event: MouseEvent) => {
  mouse.canvasX = event.x;
  mouse.canvasY = event.y;
});
