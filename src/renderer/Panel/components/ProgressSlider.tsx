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
  /**
   * Handles a seek event of the slider bar
   * @param position - Position on the progress bar
   */
  handleSeek(position: number): void;
  /**
   * Handles the end of the seek event of the slider bar
   */
  handleEndSeek(): void;
}

const ProgressSlider: FC<ProgressSliderProps> = ({
  duration,
  currentTime,
  handleSeek,
  handleEndSeek,
}) => {
  return (
    <input
      className="progress-slider w-100"
      max={duration}
      min={0}
      onChange={(event) => handleSeek(parseInt(event.currentTarget.value))}
      onMouseUp={handleEndSeek}
      step={1}
      type="range"
      value={currentTime}
    />
  );
};

export default ProgressSlider;
