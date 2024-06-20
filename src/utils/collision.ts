import { MAP } from "../constants/map";
import { Items } from "../enums/items";
import Player from "../components/Player";

type Obj = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Collision between two rectangular object using AABB technique
 */
export function isCollided(obj1: Obj, obj2: Obj): boolean {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj2.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

/**
 * Check collision between two object using neighbouring object type approach
 */
export function coordinateCollision(
  player: Player,
  direction: string,
): boolean {
  let x = Math.floor(player.x / MAP.tile.size);
  let y = Math.floor(player.y / MAP.tile.size);

  if (x * MAP.tile.size === player.x || y * MAP.tile.size === player.y) {
    switch (direction) {
      case "left":
        x--;
        // return (
        //   player.mapData.tiles[x][y] !== Items.Empty ||
        //   player.mapData.tiles[x][y + 1] !== Items.Empty
        // );
        break;

      case "top":
        y--;
        // return (
        //   player.mapData.tiles[x][y] !== Items.Empty ||
        //   player.mapData.tiles[x + 1][y] !== Items.Empty
        // );
        break;
    }
  }
  if (
    x * MAP.tile.size + player.width + player.playerOffset ===
      player.x + player.width ||
    y * MAP.tile.size + player.height + player.playerOffset ===
      player.y + player.height
  ) {
    switch (direction) {
      case "right":
        x++;
        // return (
        //   player.mapData.tiles[x + 1][y] !== Items.Empty ||
        //   player.mapData.tiles[x + 1][y + 1] !== Items.Empty
        // );
        break;

      case "bottom":
        y++;
        // return (
        //   player.mapData.tiles[x + 1][y + 1] !== Items.Empty ||
        //   player.mapData.tiles[x][y + 1] !== Items.Empty
        // );
        break;

      default:
        break;
    }
  }
  return player.mapData.tiles[x][y] === Items.Empty ? false : true;

  // if (player.mapData.tiles[x][y] !== Items.Empty) {
  //   let obj1: Obj = {
  //     x: player.x,
  //     y: player.y,
  //     width: MAP.tile.size,
  //     height: MAP.tile.size,
  //   };
  //   let obj2: Obj = {
  //     x: x * MAP.tile.size,
  //     y: y * MAP.tile.size,
  //     width: MAP.tile.size,
  //     height: MAP.tile.size,
  //   };
  //   return isCollided(obj1, obj2);
  // }
}
