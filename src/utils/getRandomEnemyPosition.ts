import { MAP } from "../constants/map";
import { Items } from "../enums/items";
import { MapData } from "../components/Layout";
import { Point } from "../types/point";

/**
 * Get random initial position for enemy
 */
export function getRandomEnemyPosition(mapData: MapData): Point {
    let x, y;
    do {
        x = Math.floor(Math.random() * (mapData.width - 2)) + 1;
        y = Math.floor(Math.random() * (mapData.height - 2)) + 1;
    } while (mapData.tiles[x][y] !== Items.Empty);
    return { x: x * MAP.tile.size, y: y * MAP.tile.size };
}

