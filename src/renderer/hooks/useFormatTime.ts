/**
 * Formats the provided time in seconds into `mm:ss`
 */
const useFormatTime = () => {
  return (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);

    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
};

export default useFormatTime;
