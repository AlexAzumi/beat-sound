import { FC } from 'react';
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

interface SongDataProps {
  /**
   * Song's name
   */
  name: string;
  /**
   * Song's artist
   */
  artist: string;
  /**
   * Song's album cover uri
   */
  imageSrc: string;
}

const SongData: FC<SongDataProps> = ({ artist, name, imageSrc }) => {
  return (
    <>
      {!imageSrc ? (
        <div className="no-cover d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faCompactDisc} size="3x" />
        </div>
      ) : (
        <Image height={70} src={imageSrc} width={70} />
      )}
      <div className="d-flex flex-column px-2 py-1 justify-content-center text-truncate">
        <p className="m-0 fw-bold">{name}</p>
        <p className="m-0">{artist}</p>
      </div>
    </>
  );
};

export default SongData;
