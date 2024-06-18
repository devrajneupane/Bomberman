import { mouse } from "../input/input";
import { images } from "../image/preload";
import { Layout, MapData } from "./Layout";
import { MAP } from "../constants/map";
import { CANVAS } from "../constants/canvas";

interface Values {
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
}

export class LayoutEditor extends Layout {
  items: Record<string, Values>;
  canvas: HTMLCanvasElement;
  itemCanvas: HTMLCanvasElement;
  itemCtx: CanvasRenderingContext2D;

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
  }

  itemBar(): void {
    this.itemCanvas.width = CANVAS.width;
    this.itemCanvas.height = CANVAS.height / 10;
    this.itemCanvas.style.display = "block";

    this.itemCtx.clearRect(0, 0, CANVAS.width, CANVAS.height);

    let i = 0;
    const temp: { [key: string]: HTMLImageElement } = images.powerUps;
    Object.keys(temp).forEach((imageName) => {
      this.items[imageName] = {
        x: i * MAP.tile.size,
        y: 7,
        width: MAP.tile.size,
        height: MAP.tile.size,
        active: false,
      };
      this.itemCtx.drawImage(
        temp[imageName],
        i * MAP.tile.size,
        7,
        MAP.tile.size,
        MAP.tile.size,
      );
      i++;
    });
    this.handleItemsClick();
    this.handleCanvasClick();
  }

  handleItemsClick() {
    const itemCanvasRect = this.itemCanvas.getBoundingClientRect();
    const mouseX = mouse.itemX - itemCanvasRect.left;
    const mouseY = mouse.itemY - itemCanvasRect.top;

    // Check which item was clicked
    Object.keys(this.items).forEach((item) => {
      if (
        mouseX >= this.items[item].x &&
        mouseX <= this.items[item].x + this.items[item].width &&
        mouseY >= this.items[item].y &&
        mouseY <= this.items[item].y + this.items[item].height
      ) {
        this.itemCtx.strokeStyle = "green";
        this.itemCtx.lineWidth = 3;
        this.itemCtx.strokeRect(
          this.items[item].x,
          this.items[item].y,
          this.items[item].width,
          this.items[item].height,
        );
        this.items[item].active = true;
      }
    });
  }

  handleCanvasClick() {
    const canvasRect = this.canvas.getBoundingClientRect();

    // Bitwise operator trick to perform flooring operation
    const x = Math.abs(~~((mouse.canvasX - canvasRect.left) / MAP.tile.size));
    const y = Math.abs(~~((mouse.canvasY - canvasRect.top) / MAP.tile.size));

    // TODO:  change value based on currently selected item from itembar
    this.mapData.tiles[x][y] = 2;
  }
}
