import os from 'os';
import path from 'path';

class AppConfig {
  /**
   * Full path to the user's directory
   */
  static HOME_DIRECTORY = os.homedir();

  /**
   * Name of the folder where the database will be stored
   */
  static FOLDER_NAME = 'beat-sound';

  /**
   * Name of the file that will store all the necessary data
   */
  static DATABASE_NAME = 'db.json';

  /**
   * Name of the app (usually used in `render`)
   */
  static APP_TITLE = 'Beat Sound';

  /**
   * Name of the folder that contains the game data
   */
  static GAME_DATA_FOLDER = 'Beat Saber_Data';

  /**
   * Name of the folder that contains all the custom songs of the game
   */
  static CUSTOM_LEVELS_FOLDER = 'CustomLevels';

  /**
   * Name of the file that contanins all the custom song data
   */
  static SONG_DATA_FILE = 'info.dat';

  /**
   * Full path of the folder that contains the database
   */
  static MAIN_PATH = path.join(this.HOME_DIRECTORY, this.FOLDER_NAME);

  /**
   * Full path of the app database
   */
  static DATABASE_PATH = path.join(this.MAIN_PATH, this.DATABASE_NAME);
}

export default AppConfig;
