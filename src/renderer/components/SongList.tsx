import { FC, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

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
          <Row key={item.id} className="mb-2">
            <Col className="px-0">
              <img
                src={`file://${item.songPath}\\${item.coverFile}`}
                height={60}
              />
            </Col>
            <Col>{item.name}</Col>
            <Col>{item.artist}</Col>
            <Col>{getFormatedDuration(item.duration)}</Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default SongList;
