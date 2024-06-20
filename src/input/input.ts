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
  canvasRight: new Set<number>(),
};

const canvas = document.querySelector<HTMLCanvasElement>("#canvas")!;
const itemCanvas = document.querySelector<HTMLCanvasElement>("#itemCanvas")!;

// Variable to track mouse state
let isMouseDown = false;

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

// TODO: make click event listner only active for layout editor

// Event listener for when mouse button is preased inside item bar
itemCanvas.addEventListener("click", (event: MouseEvent) => {
  clicks.item.x = event.x;
  clicks.item.y = event.y;
});


// Event listener for when mouse button is pressed down insde editor area
canvas.addEventListener("mousedown", (event: MouseEvent) => {
  if (event.button === 0) {
    isMouseDown = true;
    clicks.canvas.add(event.x).add(event.y);
    console.log(event)
  }
});

// Event listener for when mouse moves
document.addEventListener("mousemove", (event: MouseEvent) => {
  if (isMouseDown) {
    clicks.canvas.add(event.x).add(event.y);
  }
});

// Event listener for when mouse button is released
document.addEventListener("mouseup", () => {
  if (isMouseDown) {
    isMouseDown = false;
  }
});

// Event listener for when right mouse button is pressed inside editor area
canvas.addEventListener("contextmenu", (event: MouseEvent) => {
  // Prevent the default context menu from appearing
  event.preventDefault();

  clicks.canvasRight.add(event.x).add(event.y);
});
