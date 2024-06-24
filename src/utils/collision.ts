import { MAP } from "../constants/map";
import { Items } from "../enums/items";
import Player from "../components/Player";
import { Direction } from "../enums/Direction";
import Enemy from "../components/Enemy";
// import BombExplosion from "../components/BombExplosion";
import { Obj } from "../types/Obj";

/**
 * Collision between two rectangular object using AABB technique
 */
export function isCollidedAABB(obj1: Obj, obj2: Obj): boolean {
  return (
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.x + obj2.width > obj2.position.x &&
    obj1.position.y < obj2.position.y + obj2.height &&
    obj1.position.y + obj1.height > obj2.position.y
  );
}

/**
 * Check collision between two object using neighbouring object type approach
 */
export function isCollided(
  player: Player,
  direction: Direction,
): boolean {
  let x = Math.floor(player.position.x / MAP.tile.size);
  let y = Math.floor(player.position.y / MAP.tile.size);

  let leftX = Math.floor(player.position.x / MAP.tile.size);
  let rightX = Math.floor((player.position.x + player.width) / MAP.tile.size);
  let topY = Math.floor(player.position.y / MAP.tile.size);
  let bottomY = Math.floor((player.position.y + player.width) / MAP.tile.size);

  switch (direction) {
    case Direction.Left:
      if (x * MAP.tile.size === player.position.x) {
        leftX--;
        return (
          player.mapData.tiles[leftX][topY] !== Items.Empty ||
          player.mapData.tiles[leftX][bottomY] !== Items.Empty
        );
      }
      break;

    case Direction.Up:
      if (y * MAP.tile.size === player.position.y) {
        topY--;
        return (
          player.mapData.tiles[leftX][topY] !== Items.Empty ||
          player.mapData.tiles[rightX][topY] !== Items.Empty
        );
      }
      break;

    case Direction.Right:
      if ((x + 1) * MAP.tile.size === player.position.x + player.width) {
        leftX++;
        return (
          player.mapData.tiles[leftX][topY] !== Items.Empty ||
          player.mapData.tiles[leftX][bottomY] !== Items.Empty
        );
      }
      break;

    case Direction.Down:
      if ((y + 1) * MAP.tile.size === player.position.y + player.height) {
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

export function isEnemyCollided(enemy: Enemy, direction: Direction): boolean {
  let x;
  let y;

  switch (direction) {
    case Direction.Left:
      x = Math.floor(enemy.position.x / MAP.tile.size);
      y = Math.floor((enemy.position.y + enemy.height / 2) / MAP.tile.size);

      return enemy.mapData.tiles[x][y] !== Items.Empty;
      break;

    case Direction.Up:
      x = Math.floor((enemy.position.x + enemy.width / 2) / MAP.tile.size);
      y = Math.floor(enemy.position.y / MAP.tile.size);

      return enemy.mapData.tiles[x][y] !== Items.Empty;
      break;

    case Direction.Right:
      x = Math.floor((enemy.position.x + enemy.width) / MAP.tile.size);
      y = Math.floor((enemy.position.y + enemy.height / 2) / MAP.tile.size);

      return enemy.mapData.tiles[x][y] !== Items.Empty;
      break;

    case Direction.Down:
      x = Math.floor((enemy.position.x + enemy.width / 2) / MAP.tile.size);
      y = Math.floor((enemy.position.y + enemy.height) / MAP.tile.size);

      return enemy.mapData.tiles[x][y] !== Items.Empty;
      break;

    default:
      break;
  }
  return false;
}
