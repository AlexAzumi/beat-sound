import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBackwardStep,
  faForwardStep,
  faCirclePause,
  faCirclePlay,
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
   * Set to `true` is there is a song that is playing
   */
  isPlaying: boolean;
  /**
   * Handles the click of the play/pause button
   */
  handleClickPlay(): void;
}

const PlayerControls: FC<PlayerControlsProps> = ({
  currentTime,
  handleClickPlay,
  isPlaying,
  songDuration,
}) => {
  return (
    <>
      <p className="mb-0 me-5">{currentTime}</p>
      <FontAwesomeIcon
        className="player-control"
        icon={faBackwardStep}
        size="2x"
      />
      <FontAwesomeIcon
        className="player-control mx-4"
        icon={isPlaying ? faCirclePause : faCirclePlay}
        onClick={handleClickPlay}
        size="2x"
      />
      <FontAwesomeIcon
        className="player-control"
        icon={faForwardStep}
        size="2x"
      />
      <p className="mb-0 ms-5">{songDuration}</p>
    </>
  );
};

export default PlayerControls;
