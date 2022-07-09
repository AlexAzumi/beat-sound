import { FC, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProgressSlider from './components/ProgressSlider';
import SongData from './components/SongData';
import PlayerControls from './components/PlayerControls';
import VolumeSlider from './components/VolumeSlider';

import Song from '../../main/interfaces/song';

interface PanelProps {
  /**
   * Metadata of the current song (`undefined` is no song has been played)
   */
  currentSong: Song | undefined;
  /**
   * Set to `true` is there is a song that is playing
   */
  isPlaying: boolean;
  /**
   * Current volume of the player (scaled from 0 to 1)
   */
  volume: number;
  /**
   * Handles the playing/pausing event of a song
   * @param id - Unique ID of the song
   */
  handlePlaySong(id: string): void;
  /**
   * Handles the `onChange` event of the volume slider
   * @param value - Slider value (scaled from 0 to 1)
   */
  onChangeVolume(value: number): void;
}

const Panel: FC<PanelProps> = ({
  currentSong,
  isPlaying,
  onChangeVolume,
  handlePlaySong: playSong,
  volume,
}) => {
  const initialVolume = volume * 100;

  /**
   * Handles the volume change of the player
   */
  const handleChangeVolume = useCallback((element: HTMLInputElement) => {
    const value = parseInt(element.value);
    const calculatedValue = value / 100;

    onChangeVolume(calculatedValue);
  }, []);

  /**
   * Handles the click event of the play/pause button
   */
  const handleClickPlay = useCallback(() => {
    if (!currentSong) {
      return;
    }

    playSong(currentSong.id);
  }, [currentSong, isPlaying]);

  return (
    <Container
      className="px-0 bg-dark text-white d-flex flex-column"
      fluid={true}
    >
      {/* Progress slider */}
      <ProgressSlider />
      {/* Controls */}
      <Row>
        <Col xs={3} className="d-flex">
          <SongData
            artist={currentSong?.artist || ''}
            imageSrc={
              currentSong
                ? `file://${currentSong?.songPath}\\${currentSong?.coverFile}`
                : ''
            }
            name={currentSong?.name || ''}
          />
        </Col>
        <Col
          xs={6}
          className="d-flex justify-content-center align-items-center"
        >
          <PlayerControls
            isPlaying={isPlaying}
            handleClickPlay={handleClickPlay}
          />
        </Col>
        <Col
          className="d-flex px-4 justify-content-end align-items-center"
          xs={3}
        >
          <VolumeSlider
            initialVolume={initialVolume}
            handleChangeVolume={handleChangeVolume}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Panel;
