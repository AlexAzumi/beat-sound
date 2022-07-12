import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
  faCirclePause,
  faCirclePlay,
  faShuffle,
  faRepeat,
} from '@fortawesome/free-solid-svg-icons';

interface PlayerControlsProps {
  /**
   * Current time of the playback (formated `mm:ss`)
   */
  currentTime: string;
  /**
   * Song's duration (formated `mm:ss`)
   */
  songDuration: string;
  /**
   * Set to `true` if there is a song currently playing
   */
  isPlaying: boolean;
  /**
   * Set to `true` if the shuffle option is active
   */
  isShuffleActive: boolean;
  /**
   * Handles the click event of the play/pause button
   */
  handleClickPlay(): void;
  /**
   * Handles the click event of the shuffle button
   */
  handleClickShuffle(): void;
}

const PlayerControls: FC<PlayerControlsProps> = ({
  currentTime,
  handleClickPlay,
  handleClickShuffle,
  isPlaying,
  isShuffleActive,
  songDuration,
}) => {
  return (
    <>
      <p className="mb-0 me-5">{currentTime}</p>
      <FontAwesomeIcon
        className={`player-control me-4 ${isShuffleActive ? 'active' : ''}`}
        icon={faShuffle}
        onClick={handleClickShuffle}
      />
      <FontAwesomeIcon
        className="player-control mx-2"
        icon={faBackwardStep}
        size="2x"
      />
      <FontAwesomeIcon
        className="player-control mx-2"
        icon={isPlaying ? faCirclePause : faCirclePlay}
        onClick={handleClickPlay}
        size="2x"
      />
      <FontAwesomeIcon
        className="player-control mx-2"
        icon={faForwardStep}
        size="2x"
      />
      <FontAwesomeIcon className="player-control ms-4" icon={faRepeat} />
      <p className="mb-0 ms-5">{songDuration}</p>
    </>
  );
};

export default PlayerControls;
