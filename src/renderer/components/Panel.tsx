import { FC } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Panel: FC = () => {
  return (
    <Container className="px-0 bg-dark text-white" fluid={true}>
      {/* Progress slider */}
      <input className="progress-slider w-100" type="range" />
      {/* Controls */}
      <Row>
        <Col>a</Col>
        <Col>a</Col>
        <Col>a</Col>
      </Row>
    </Container>
  );
};

export default Panel;
