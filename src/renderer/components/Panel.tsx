import { FC, useCallback } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faVolumeOff,
  faVolumeHigh,
  faBackwardStep,
  faForwardStep,
  faCirclePlay,
  faCirclePause,
} from '@fortawesome/free-solid-svg-icons';

import Song from '../../main/interfaces/song';

interface PanelProps {
  currentSong: Song | undefined;
  isPlaying: boolean;
  onChangeVolume(value: number): void;
}

const Panel: FC<PanelProps> = ({ currentSong, isPlaying, onChangeVolume }) => {
  const handleChangeVolume = useCallback((element: HTMLInputElement) => {
    const value = parseInt(element.value);
    const calculatedValue = (1 * value) / 100;

    onChangeVolume(calculatedValue);
  }, []);

  return (
    <Container
      className="px-0 bg-dark text-white d-flex flex-column"
      fluid={true}
    >
      {/* Progress slider */}
      <input className="progress-slider w-100" type="range" />
      {/* Controls */}
      <Row>
        <Col xs={3} className="d-flex">
          <Image
            height={70}
            src={`file://${currentSong?.songPath}\\${currentSong?.coverFile}`}
            width={70}
          />
          <div className="d-flex flex-column px-2 py-1 justify-content-center text-truncate">
            <p className="m-0 fw-bold">{currentSong?.name}</p>
            <p className="m-0">{currentSong?.artist}</p>
          </div>
        </Col>
        <Col
          xs={6}
          className="d-flex justify-content-center align-items-center"
        >
          <FontAwesomeIcon
            className="player-control"
            icon={faBackwardStep}
            size="3x"
          />
          <FontAwesomeIcon
            className="player-control mx-4"
            icon={isPlaying ? faCirclePause : faCirclePlay}
            size="3x"
          />
          <FontAwesomeIcon
            className="player-control"
            icon={faForwardStep}
            size="3x"
          />
        </Col>
        <Col
          className="d-flex px-4 justify-content-end align-items-center"
          xs={3}
        >
          <FontAwesomeIcon icon={faVolumeOff} />
          <input
            className="mx-2"
            onChange={(input) => handleChangeVolume(input.currentTarget)}
            type="range"
          />
          <FontAwesomeIcon icon={faVolumeHigh} />
        </Col>
      </Row>
    </Container>
  );
};

export default Panel;
