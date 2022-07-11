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
      <FontAwesomeIcon className="player-control me-4" icon={faShuffle} />
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
