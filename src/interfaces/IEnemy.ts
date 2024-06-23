import { Direction } from "../enums/Direction";
import { EnemySprite } from "../types/EnemySprite";
import { SpriteAttributes } from "../types/SpriteAttributes";

export interface IEnemy {
  directions: Record<Direction, number[]>;
  sprites: Record<
    EnemySprite,
    // FIX: don't use mixed type
    Record<SpriteAttributes, HTMLImageElement | number>
  >;
}
