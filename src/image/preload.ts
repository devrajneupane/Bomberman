// Walls
import wall from "/game/sprites/wall/wall.png";
import hardWall from "/game/map/hard-wall.png";
import wallExplosionSprite from "/game/sprites/wall/wall-explosion.png";

// Player
import playerSprite from "/game/sprites/player/walking.png";
import playerDyingSprite from "/game/sprites/player/killing.png";

// Bomb
import bombSprite from "/game/sprites/bomb/bomb.png";
import bombExplosionCenterSprite from "/game/sprites/bomb/explosion/explosion-center.png";
import bombExplosionHorizontalSprite from "/game/sprites/bomb/explosion/explosion-extension-horizontal.png";
import bombExplosionVerticalSprite from "/game/sprites/bomb/explosion/explosion-extension-vertical.png";
import bombExplosionLeftSprite from "/game/sprites/bomb/explosion/explosion-left-lenght.png";
import bombExplosionBottomSprite from "/game/sprites/bomb/explosion/explosion-lower-lenght.png";
import bombExplosionRightSprite from "/game/sprites/bomb/explosion/explosion-right-lenght.png";
import bombExplosionTopSprite from "/game/sprites/bomb/explosion/explosion-upper-lenght.png";

// Power ups
import bombUp from "/game/images/power-up/bomb-up.png";
import fireUp from "/game/images/power-up/fire-up.png";
import flamePass from "/game/images/power-up/flame-pass.png";
import remoteControl from "/game/images/power-up/remote-control.png";
import speedUp from "/game/images/power-up/speed-up.png";
import wallPass from "/game/images/power-up/wall-pass.png";

// Door
import door from "/game/images/door.png";

// enemies
import ballomSprite from "/game/sprites/enemies/ballom.png";
import dahlSprite from "/game/sprites/enemies/dahl.png";
import minvoSprite from "/game/sprites/enemies/minvo.png";
import onilSprite from "/game/sprites/enemies/onil.png";
import ovapeSprite from "/game/sprites/enemies/ovape.png";
import passSprite from "/game/sprites/enemies/pass.png";
import pontanSprite from "/game/sprites/enemies/pontan.png";

export const images = {
  wall: {
    brickWall: createImageElement(wall),
    concreteWall: createImageElement(hardWall),
    brickWallExplosionSprite: createImageElement(wallExplosionSprite),
  },
  player: {
    playerSprite: createImageElement(playerSprite),
    playerDyingSprite: createImageElement(playerDyingSprite),
  },
  bomb: {
    bombSprite: createImageElement(bombSprite),
    bombExplosionCenterSprite: createImageElement(bombExplosionCenterSprite),
    bombExplosionExtensionHorizontalSprite: createImageElement(bombExplosionHorizontalSprite),
    bombExplosionExtensionVerticalSprite: createImageElement(bombExplosionVerticalSprite),
    bombExplosionLeftSprite: createImageElement(bombExplosionLeftSprite),
    bombExplosionBottomSprite: createImageElement(bombExplosionBottomSprite),
    bombExplosionRightSprite: createImageElement(bombExplosionRightSprite),
    bombExplosionTopSprite: createImageElement(bombExplosionTopSprite),
  },
  powerUps: {
    bombUp: createImageElement(bombUp),
    fireUp: createImageElement(fireUp),
    flamePass: createImageElement(flamePass),
    remoteControl: createImageElement(remoteControl),
    speedUp: createImageElement(speedUp),
    wallPass: createImageElement(wallPass),
  },
  enemies: {
    ballomSprite: createImageElement(ballomSprite),
    dahlSprite: createImageElement(dahlSprite),
    minvoSprite: createImageElement(minvoSprite),
    onilSprite: createImageElement(onilSprite),
    ovapeSprite: createImageElement(ovapeSprite),
    passSprite: createImageElement(passSprite),
    pontanSprite: createImageElement(pontanSprite),
  },
  door: createImageElement(door),
};

/**
 * Creates new image element add image source and return it
 * @param imgSrc path of the image source
 * @returns HTML image Element
 */
function createImageElement(imgSrc: string): HTMLImageElement {
  const img = new Image();
  img.src = imgSrc;

  return img;
}
