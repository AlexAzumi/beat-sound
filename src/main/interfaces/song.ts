export default interface Song {
  /**
   * BSaber unique ID
   */
  id: string;

  /**
   * Complete name of the song
   */
  name: string;

  /**
   * Name of the song's artist
   */
  artist: string;

  /**
   * File name of the audio (probably has `.egg` extension)
   */
  audioFile: string;

  /**
   * File name of the song's cover art (usually called `cover`)
   */
  coverFile: string;

  /**
   * Folder path of the song
   */
  songPath: string;

  /**
   * Duration of the song in seconds
   */
  duration: number;
}
