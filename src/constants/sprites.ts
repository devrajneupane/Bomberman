import { IEnemy } from "../interfaces/IEnemy";
import { images } from "../image/preload";

export const DIRECTION_MAP: { [key: string]: number[] } = {
  left: [0, 1, 2],
  right: [3, 4, 5],
  down: [6, 7, 8],
  up: [9, 10, 11],
  dying: [0, 1, 2, 3, 4, 5, 6],
};

export const ENEMIES: IEnemy = {
  directions: {
    left: [0, 1, 2],
    right: [4, 5, 6],
    up: [0, 1, 2],
    down: [4, 5, 6],
  },
  sprites: {
    ballomSprite: {
      img: images.enemies.ballomSprite,
      speed: 0.4,
      // sWidth: 15.5,
      sWidth: 16,
      sHeight: 16,
    },

    dahlSprite: {
      img: images.enemies.dahlSprite,
      speed: 0.4,
      sWidth: 18,
      sHeight: 16,
    },

    minvoSprite: {
      img: images.enemies.minvoSprite,
      speed: 0.4,
      // sWidth: 17.142857142857,
      sWidth: 17,
      sHeight: 16,
    },

    onilSprite: {
      img: images.enemies.onilSprite,
      speed: 0.8,
      sWidth: 16,
      sHeight: 16,
    },

    ovapeSprite: {
      img: images.enemies.ovapeSprite,
      speed: 0.4,
      // sWidth: 16.142857142857,
      sWidth: 16,
      sHeight: 16,
    },

    passSprite: {
      img: images.enemies.passSprite,
      speed: 0.4,
      sWidth: 16,
      sHeight: 16,
    },

    pontanSprite: {
      img: images.enemies.pontanSprite,
      speed: 2,
      sWidth: 16,
      sHeight: 16,
    },
  },
};

export const POWER_UP = {
  size: {
    sWidth: 16,
    sHeight: 16,
  },
  sprites: {
    bombUp: {
      img: images.powerUps.bombUp,
    },

    fireUp: {
      img: images.powerUps.fireUp,
    },

    flamePass: {
      img: images.powerUps.flamePass,
    },

    remoteControl: {
      img: images.powerUps.remoteControl,
    },

    speedUp: {
      img: images.powerUps.remoteControl,
    },

    wallPass: {
      img: images.powerUps.wallPass,
    },
  },
};
