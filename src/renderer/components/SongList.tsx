import { FC, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons';

import Song from '../../main/interfaces/song';

interface SongListProps {
  songs: Song[];
}

const SongList: FC<SongListProps> = ({ songs }) => {
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
      {songs.map((item) => {
        return (
          <Row key={item.id} className="song-container mb-2">
            <Col
              className="d-flex align-items-center justify-content-center"
              xs={1}
            >
              <FontAwesomeIcon icon={faPlayCircle} size="2x" />
            </Col>
            <Col className="px-0 text-center" xs={1}>
              <img
                src={`file://${item.songPath}\\${item.coverFile}`}
                width={80}
              />
            </Col>
            <Col className="d-flex align-items-center">{item.name}</Col>
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
