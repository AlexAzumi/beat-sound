import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeOff, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

interface VolumeSliderProps {
  /**
   * Initial volume of the player
   */
  initialVolume: number;
  /**
   * Handles the `onChange` event of the slider input
   */
  handleChangeVolume(element: HTMLInputElement): void;
}

const VolumeSlider: FC<VolumeSliderProps> = ({
  initialVolume,
  handleChangeVolume,
}) => {
  return (
    <>
      <FontAwesomeIcon icon={faVolumeOff} />
      <input
        className="mx-2"
        defaultValue={initialVolume}
        onChange={(input) => handleChangeVolume(input.currentTarget)}
        type="range"
      />
      <FontAwesomeIcon icon={faVolumeHigh} />
    </>
  );
};

export default VolumeSlider;
