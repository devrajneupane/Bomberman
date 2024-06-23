import { Obj } from "../types/Obj";
import { MAP } from "../constants/map";
import { Items } from "../enums/items";
import Player from "../components/Player";
import { Direction } from "../enums/Direction";

/**
 * Collision between two rectangular object using AABB technique
 */
export function isCollidedAABB(obj1: Obj, obj2: Obj): boolean {
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
export function isCollided(
  player: Player,
  direction: Direction,
): boolean {
  let x = Math.floor(player.x / MAP.tile.size);
  let y = Math.floor(player.y / MAP.tile.size);

  let leftX = Math.floor(player.x / MAP.tile.size);
  let rightX = Math.floor((player.x + player.width) / MAP.tile.size);
  let topY = Math.floor(player.y / MAP.tile.size);
  let bottomY = Math.floor((player.y + player.width) / MAP.tile.size);

  switch (direction) {
    case Direction.Left:
      if (x * MAP.tile.size === player.x) {
        leftX--;
        return (
          player.mapData.tiles[leftX][topY] !== Items.Empty ||
          player.mapData.tiles[leftX][bottomY] !== Items.Empty
        );
      }
      break;

    case Direction.Up:
      if (y * MAP.tile.size === player.y) {
        topY--;
        return (
          player.mapData.tiles[leftX][topY] !== Items.Empty ||
          player.mapData.tiles[rightX][topY] !== Items.Empty
        );
      }
      break;

    case Direction.Right:
      if ((x + 1) * MAP.tile.size === player.x + player.width) {
        leftX++;
        return (
          player.mapData.tiles[leftX][topY] !== Items.Empty ||
          player.mapData.tiles[leftX][bottomY] !== Items.Empty
        );
      }
      break;

    case Direction.Down:
      if ((y + 1) * MAP.tile.size === player.y + player.height) {
        topY++;
        return (
          player.mapData.tiles[leftX][topY] !== Items.Empty ||
          player.mapData.tiles[rightX][topY] !== Items.Empty
        );
      }
      break;

    default:
      break;
  }
  return false;
}
