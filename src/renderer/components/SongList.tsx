import { FC, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faPauseCircle,
} from '@fortawesome/free-regular-svg-icons';

import Song from '../../main/interfaces/song';

interface SongListProps {
  currentSongId: string;
  songs: Song[];
  onPlaySong(id: string): void;
}

const SongList: FC<SongListProps> = ({ songs, currentSongId, onPlaySong }) => {
  /**
   * Formats the duration in seconds to `mm:ss`
   */
  const getFormatedDuration = useCallback((duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);

    return `${minutes}:${seconds}`;
  }, []);

  return (
    <Container className="overflow-auto" fluid={true}>
      <Row className="sticky-top py-3 mb-1 bg-white border-bottom">
        <Col
          className="d-flex align-items-center justify-content-center"
          xs={1}
        ></Col>
        <Col className="d-flex align-items-center fw-bold">Title</Col>
        <Col className="d-flex align-items-center fw-bold">Artist</Col>
        <Col className="d-flex align-items-center fw-bold">Duration</Col>
      </Row>

      {songs.map((item) => {
        const isPlaying = currentSongId === item.id;

        return (
          <Row
            className="song-container py-1"
            key={item.id}
            onClick={() => onPlaySong(item.id)}
          >
            <Col
              className="d-flex align-items-center justify-content-center"
              xs={1}
            >
              <FontAwesomeIcon
                icon={isPlaying ? faPauseCircle : faPlayCircle}
                size="2x"
              />
            </Col>
            <Col className="d-flex align-items-center">
              <img
                className="me-3"
                src={`file://${item.songPath}\\${item.coverFile}`}
                width={60}
              />
              {item.name}
            </Col>
            <Col className="d-flex align-items-center">{item.artist}</Col>
            <Col className="d-flex align-items-center">
              {getFormatedDuration(item.duration)}
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default SongList;
