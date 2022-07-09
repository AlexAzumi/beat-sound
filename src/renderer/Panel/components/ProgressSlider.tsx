import { FC } from 'react';

interface ProgressSliderProps {
  /**
   * Current time of the playback (in seconds)
   */
  currentTime: number;
  /**
   * Song's duration in seconds
   */
  duration: number;
}

const ProgressSlider: FC<ProgressSliderProps> = ({ duration, currentTime }) => {
  return (
    <input
      className="progress-slider w-100"
      maxLength={duration}
      step={1}
      type="range"
      value={currentTime}
    />
  );
};

export default ProgressSlider;
