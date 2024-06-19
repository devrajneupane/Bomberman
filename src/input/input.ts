export const keys = {
  left: false,
  right: false,
  up: false,
  down: false,
  enter: false,
  space: false,
};

export const clicks = {
  item: { x: 0, y: 0 },
  canvas: new Set<number>(),
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
  clicks.item.x = event.x;
  clicks.item.y = event.y;
});

canvas.addEventListener("click", (event: MouseEvent) => {
  clicks.canvas.add(event.x).add(event.y);
});
