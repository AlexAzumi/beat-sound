import { FC, useCallback, useMemo, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import ProgressSlider from './components/ProgressSlider';
import SongData from './components/SongData';
import PlayerControls from './components/PlayerControls';
import VolumeSlider from './components/VolumeSlider';

import useFormatTime from '../../hooks/useFormatTime';

import Song from '../../../main/interfaces/song';

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
   * Current time of the playback (in seconds)
   */
  currentTime: number;
  /**
   * Current volume of the player (scaled from 0 to 1)
   */
  volume: number;
  /**
   * Set to `true` if the shuffle option is active
   */
  isShuffleActive: boolean;
  /**
   * Set to `true` if the repeat option is active
   */
  isRepeatActive: boolean;
  /**
   * Handles the playing/pausing event of a song
   * @param id - Unique id of the song
   */
  handlePlaySong(id: string): void;
  /**
   * Handles the `onChange` event of the volume slider
   * @param value - Slider value (scaled from 0 to 1)
   */
  onChangeVolume(value: number): void;
  /**
   * Handles the end of the seeking event of the progress bar
   * @param time - New time
   */
  onEndSeeking(time: number): void;
  /**
   * Handles the click event of the shuffle button
   */
  handleClickShuffle(): void;
  /**
   * Handles the click event of the repeat button
   */
  handleClickRepeat(): void;
  /**
   * Handles the click event of the forward step button
   */
  handleClickForwardStep(): void;
}

const Panel: FC<PanelProps> = ({
  currentSong,
  currentTime,
  handleClickForwardStep,
  handleClickRepeat,
  handleClickShuffle,
  handlePlaySong,
  isPlaying,
  isRepeatActive,
  isShuffleActive,
  onChangeVolume,
  onEndSeeking,
  volume,
}) => {
  const [seekPosition, setSeekPosition] = useState(0);

  const formatTime = useFormatTime();

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

    handlePlaySong(currentSong.id);
  }, [currentSong, isPlaying]);

  /**
   * Handles a seek event of the slider bar
   * @param position - Position on the progress bar
   */
  const handleSeek = useCallback((position: number) => {
    setSeekPosition(position);
  }, []);

  /**
   * Handles the end of the seek event of the slider bar
   */
  const handleEndSeek = useCallback(() => {
    // Set time on the player
    onEndSeeking(seekPosition);
    // Reset seek position
    setSeekPosition(0);
  }, [seekPosition]);

  /**
   * Gets the sond duration in seconds
   */
  const getSongDuration = useCallback(() => {
    if (!currentSong) {
      return 0;
    }

    return Math.round(currentSong.duration);
  }, [currentSong]);

  return useMemo(
    () => (
      <Container
        className="px-0 bg-dark text-white d-flex flex-column"
        fluid={true}
      >
        {/* Progress slider */}
        <ProgressSlider
          currentTime={seekPosition || currentTime}
          duration={getSongDuration()}
          handleEndSeek={handleEndSeek}
          handleSeek={handleSeek}
        />
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
              name={currentSong?.title || ''}
            />
          </Col>
          <Col
            xs={6}
            className="d-flex justify-content-center align-items-center"
          >
            <PlayerControls
              currentTime={formatTime(seekPosition || currentTime)}
              handleClickForwardStep={handleClickForwardStep}
              handleClickPlay={handleClickPlay}
              handleClickRepeat={handleClickRepeat}
              handleClickShuffle={handleClickShuffle}
              isPlaying={isPlaying}
              isRepeatActive={isRepeatActive}
              isShuffleActive={isShuffleActive}
              songDuration={formatTime(getSongDuration())}
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
    ),
    [
      currentSong,
      currentTime,
      isPlaying,
      isRepeatActive,
      isShuffleActive,
      seekPosition,
      volume,
    ]
  );
};

export default Panel;
