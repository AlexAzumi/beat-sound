import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPauseCircle,
  faPlayCircle,
} from '@fortawesome/free-regular-svg-icons';

interface SongElementProps {
  /**
   * Unique id of the song
   */
  songId: string;
  /**
   * Song's name
   */
  name: string;
  /**
   * Song's artist name
   */
  artist: string;
  /**
   * Set to `true` if this song is currently playing
   */
  isPlayingThisSong: boolean;
  /**
   * Path to the song's album cover
   */
  imageSrc: string;
  /**
   * Duration of the song (formated `mm:ss`)
   */
  duration: string;
  /**
   * Handles the click event of the song element in order to play/pause the song
   * @param songId - Unique id of the song
   */
  handlePlaySong(songId: string): void;
}

const SongElement: FC<SongElementProps> = ({
  artist,
  duration,
  handlePlaySong,
  imageSrc,
  isPlayingThisSong,
  name,
  songId,
}) => {
  return (
    <Row
      className="song-container py-1"
      key={songId}
      onClick={() => handlePlaySong(songId)}
    >
      <Col className="d-flex align-items-center justify-content-center" xs={1}>
        <FontAwesomeIcon
          icon={isPlayingThisSong ? faPauseCircle : faPlayCircle}
          size="2x"
        />
      </Col>
      <Col className="d-flex align-items-center">
        <img className="me-3" src={imageSrc} width={60} />
        {name}
      </Col>
      <Col className="d-flex align-items-center">{artist}</Col>
      <Col className="d-flex align-items-center">{duration}</Col>
    </Row>
  );
};

export default SongElement;
