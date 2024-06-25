/**
 * Enum for the game state
 *
 * @readonly
 * @enum {number}
 * @property  HomeScreen - Home screen
 * @property  Playing - Game is playing
 * @property  GameOver - Game is over
 * @property  Paused - Game is paused
 * @property  LevelEditor - Level editor
 */
enum GameState {
  HomeScreen,
  Playing,
  GameOver,
  Paused,
  LevelEditor,
}

export default GameState;
