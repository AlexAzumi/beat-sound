import fs, { Dirent } from 'fs';
import path from 'path';
import util from 'util';
import mm from 'music-metadata';
import { dialog } from 'electron';

import Database from '../interfaces/database';

import AppConfig from '../../config/app.config';

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

class Recolector {
  /**
   * Asks the user to select the game folder
   * @returns The full path to the selected folder. `null` if no folder was selected
   */
  static selectGameFolder(): string | null {
    const folder = dialog.showOpenDialogSync({
      title: 'Select Beat Saber folder',
      properties: ['openDirectory'],
    });

    if (folder !== undefined) {
      return folder[0];
    }

    return null;
  }

  /**
   * Checks if there's an existing database
   * @returns Whether the database exists or not
   */
  static checkIfDatabaseExists(): boolean {
    // Create the folder if does not exist
    if (!fs.existsSync(AppConfig.MAIN_PATH)) {
      fs.mkdirSync(AppConfig.MAIN_PATH);

      return false;
    }

    return fs.existsSync(AppConfig.DATABASE_PATH);
  }

  /**
   * Gets all data from the existing database
   * @returns All database content
   */
  static async getDatabase(): Promise<Database> {
    const file = fs.readFileSync(AppConfig.DATABASE_PATH);
    const data = JSON.parse(file.toString()) as Database;

    const customSongsPath = path.join(
      data.gamePath,
      AppConfig.GAME_DATA_FOLDER,
      AppConfig.CUSTOM_LEVELS_FOLDER
    );

    const folderStats = fs.statSync(customSongsPath);

    // Check if the custom songs folder was updated recently
    if (folderStats.mtime.getTime() > new Date(data.lastUpdate).getTime()) {
      return await this.createDatabase(data.gamePath);
    }

    return data;
  }

  /**
   * Checks if the provided path matches with a game instalation folder
   * @param path - Path to check
   * @returns Whether the user selected the proper game instalation folder
   */
  static checkIfCorrectFolder(pathToCheck: string): boolean {
    return fs.existsSync(path.join(pathToCheck, AppConfig.GAME_DATA_FOLDER));
  }

  /**
   * Gets all the custom songs' data
   * @param gamePath - Path of the game
   */
  static async createDatabase(gamePath: string): Promise<Database> {
    const songPromises: Promise<void>[] = [];
    const database: Database = {
      gamePath,
      lastUpdate: new Date().toISOString(),
      songs: [],
    };

    const customSongsPath = path.join(
      database.gamePath,
      AppConfig.GAME_DATA_FOLDER,
      AppConfig.CUSTOM_LEVELS_FOLDER
    );

    // Check if the songs path exist
    if (!fs.existsSync(customSongsPath)) {
      throw new Error('CustomLevels folder not found');
    }

    const songFolders: Dirent[] = await (
      await readdir(customSongsPath, {
        withFileTypes: true,
      })
    ).filter((dir) => dir.isDirectory());

    // Check if songs where found
    if (!songFolders.length) {
      throw new Error('No levels where found');
    }

    // Analyze all found folders
    for (const folder of songFolders) {
      const folderPath = path.join(customSongsPath, folder.name);
      const filesInFolder = await readdir(folderPath, { withFileTypes: true });

      const hasInfoFile = filesInFolder.some(
        (files) => files.name.toLocaleLowerCase() === AppConfig.SONG_DATA_FILE
      );

      if (hasInfoFile) {
        const songDataPath = path.join(folderPath, AppConfig.SONG_DATA_FILE);

        try {
          const data = JSON.parse(
            await (await readFile(songDataPath)).toString()
          );

          const songPath = path.join(folderPath, data['_songFilename']);

          const songToProcess = mm
            .parseFile(songPath, { duration: true })
            .then((metadata) => {
              const songID = folder.name.split(' ', 1)[0];

              // Check if the processed song is not duplicated
              if (!database.songs.some((song) => song.id === songID)) {
                database.songs.push({
                  id: songID,
                  title: data._songName,
                  artist: data._songAuthorName,
                  audioFile: data._songFilename,
                  coverFile: data._coverImageFilename,
                  songPath: folderPath,
                  duration: metadata.format.duration || 0,
                });

                // Show processed song in console
                console.log(`Processed song: ${songID}`);
              }
            });

          songPromises.push(songToProcess);
        } catch (error) {
          console.warn('Error while processing song: ', error);
        }
      }
    }

    // Wait for all promises
    await Promise.all(songPromises);

    try {
      fs.writeFileSync(
        AppConfig.DATABASE_PATH,
        JSON.stringify(database, null, 2)
      );
    } catch (error) {
      throw new Error('Error while saving database');
    }

    return database;
  }
}

export default Recolector;
