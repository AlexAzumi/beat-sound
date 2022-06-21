import Song from './song';

export default interface Database {
  /**
   * Full path to the game folder
   */
  gamePath: string;

  /**
   * Array of available songs in the game folder
   */
  songs: Song[];
}
