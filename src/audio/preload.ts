// Player
import walkHorizontal from "/game/music/character/walk-2.mp3";
import walkVertical from "/game/music/character/walk.mp3";
import lose from "/game/music/character/lose.wav";

// Bomb
import putBomb from "/game/music/bomb/put-bomb.wav";
import bombExplosion from "/game/music/bomb/explosion.mp3";

// stage
import titleScreen from "/game/music/stage/title-screen.mp3";
import levelStart from "/game/music/stage/level-start.mp3";
import stageTheme from "/game/music/stage/stage-theme.mp3";

export const audio = {
  player: {
    walkHorizontal: createAudioElement(walkHorizontal),
    walkVertical: createAudioElement(walkVertical),
    lose: createAudioElement(lose),
  },
  bomb: {
    putBomb: createAudioElement(putBomb),
    explosion: createAudioElement(bombExplosion),
  },
  stage: {
    titleScreen: createAudioElement(titleScreen),
    levelStart: createAudioElement(levelStart),
    stageTheme: createAudioElement(stageTheme),
  },
};

/**
 * Create audio element
 *
 * @param  audioSrc - audio source
 * @returns audio element
 */
function createAudioElement(audioSrc: string): HTMLAudioElement {
  const audio = new Audio();
  audio.src = audioSrc;

  return audio;
}

export default audio;
