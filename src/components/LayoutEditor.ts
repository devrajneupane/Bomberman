import { clicks, keys } from "../input/input";
import { images } from "../image/preload";
import { Layout, MapData } from "./Layout";
import { MAP } from "../constants/map";
import { CANVAS } from "../constants/canvas";
import { Items } from "../enums/items";

interface Values {
  x: number;
  y: number;
  width: number;
  height: number;
  multiple: boolean;
}

export class LayoutEditor extends Layout {
  items: Record<string, Values>;
  canvas: HTMLCanvasElement;
  itemCanvas: HTMLCanvasElement;
  itemCtx: CanvasRenderingContext2D;
  activeItem: number;
  filteredImages: { [key: string]: { [key: string]: HTMLImageElement } };
  itemOffset: number = 10;
  offsetX: number = 0;
  offsetY: number = 0;

  constructor(
    mapData: MapData,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
  ) {
    super(mapData, ctx);

    this.itemCanvas = document.querySelector<HTMLCanvasElement>("#itemCanvas")!;
    this.itemCtx = this.itemCanvas.getContext("2d")!;

    this.canvas = canvas;
    this.ctx = ctx;
    this.items = {};
    this.activeItem = Items.Empty;
    this.filteredImages = {
      wall: {
        hardWall: images.wall.concreteWall,
        wall: images.wall.brickWall,
      },
      player: {
        playerSprite: images.player.playerSprite,
      },
      enemies: images.enemies,
      powerUps: images.powerUps,
      door: {
        door: images.door,
      },
    };
  }

  /**
   * Draw grid on cavas
   */
  drawGrid(): void {
    // Draw vertical lines
    for (
      let y = MAP.tile.size;
      y < this.mapData.width * MAP.tile.size;
      y += MAP.tile.size
    ) {
      this.ctx.beginPath();
      this.ctx.moveTo(y, 0);
      this.ctx.lineTo(y, this.mapData.height * MAP.tile.size);
      this.ctx.strokeStyle = "#fff";
      this.ctx.stroke();
    }

    // Draw horizontal lines
    for (
      let x = MAP.tile.size;
      x < this.mapData.width * MAP.tile.size;
      x += MAP.tile.size
    ) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, x);
      this.ctx.lineTo(this.mapData.width * MAP.tile.size, x);
      this.ctx.strokeStyle = "#fff";
      this.ctx.stroke();
    }

    if (keys.left) {
      this.moveLeft();
      keys.left = false;
    } else if (keys.right) {
      this.moveRight();
      keys.right = false;
    }
  }

  /**
   * Draw items on item canvas
   */
  itemBar(): void {
    this.itemCanvas.width = CANVAS.width;
    this.itemCanvas.height = CANVAS.height / 10;
    this.itemCanvas.style.display = "block";

    this.itemCtx.clearRect(0, 0, CANVAS.width, CANVAS.height);

    let i = 0;

    Object.keys(this.filteredImages).forEach((key) => {
      Object.keys(this.filteredImages[key]).forEach((innerKey) => {
        this.items[innerKey] = {
          x: i * MAP.tile.size + this.itemOffset,
          y: 7,
          width: MAP.tile.size,
          height: MAP.tile.size,
          multiple: innerKey === "door" || innerKey === "player" ? false : true,
        };
        this.itemCtx.drawImage(
          this.filteredImages[key][innerKey],
          0,
          0,
          16,
          16,
          i * MAP.tile.size + this.itemOffset,
          7,
          MAP.tile.size,
          MAP.tile.size,
        );
        i++;
      });
    });

    this.handleItemsClick();
    this.handleCanvasClick();
  }

  handleItemsClick() {
    const itemCanvasRect = this.itemCanvas.getBoundingClientRect();

    const x = clicks.item.x - itemCanvasRect.left;
    const y = clicks.item.y - itemCanvasRect.top;

    // Bitwise operator trick to perform flooring operation
    this.activeItem = Math.abs(~~(x / MAP.tile.size)) + 1;

    // Check which item was clicked
    Object.keys(this.items).forEach((item) => {
      if (
        x >= this.items[item].x &&
        x <= this.items[item].x + this.items[item].width &&
        y >= this.items[item].y &&
        y <= this.items[item].y + this.items[item].height
      ) {
        this.itemCtx.strokeStyle = "green";
        this.itemCtx.lineWidth = 3;
        this.itemCtx.strokeRect(
          this.items[item].x,
          this.items[item].y,
          this.items[item].width,
          this.items[item].height,
        );
      }
    });
  }

  handleCanvasClick() {
    const canvasRect = this.canvas.getBoundingClientRect();

    // Check if left or right click was performed
    let tmp = clicks.canvasRight.size === 0 ? clicks.canvas : clicks.canvasRight;
    const [mouseX, mouseY] = [...tmp];

    // Calculate clicked position on canvas
    const x = Math.abs(~~((mouseX - this.offsetX - canvasRect.left) / MAP.tile.size));
    const y = Math.abs(~~((mouseY - canvasRect.top) / MAP.tile.size));

    // Add selected item at clicked position excluding border walls on canvas
    if (
      x > 0 &&
      x < this.mapData.width - 1 &&
      y > 0 &&
      y < this.mapData.height - 1
    ) {
      // Remove item if right click was performed
      this.mapData.tiles[x][y] =
        tmp === clicks.canvasRight ? Items.Empty : this.activeItem;
    }
    tmp.clear();
  }

  /**
   * Move Editor area left
   */
  moveLeft() {
    if (this.offsetX < 0) {
      this.ctx.translate(5, 0);
      this.offsetX += 5;
    }
    keys.left = false;
  }

  /**
   * Move Editor area right
   */
  moveRight() {
    if (
      this.offsetX > -(this.mapData.width * MAP.tile.size - CANVAS.width - 1)
    ) {
      this.ctx.translate(-5, 0);
      this.offsetX -= 5;
    }
    keys.right = false;
  }
}
