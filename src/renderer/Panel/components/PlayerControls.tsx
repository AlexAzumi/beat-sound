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
   * Set to `true` is there is a song that is playing
   */
  isPlaying: boolean;
  /**
   * Handles the click of the play/pause button
   */
  handleClickPlay(): void;
}

const PlayerControls: FC<PlayerControlsProps> = ({
  isPlaying,
  handleClickPlay,
}) => {
  return (
    <>
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
    </>
  );
};

export default PlayerControls;
