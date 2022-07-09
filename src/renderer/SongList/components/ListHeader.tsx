import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

const ListHeader: FC = () => {
  return (
    <Row className="sticky-top py-3 mb-1 bg-white border-bottom">
      <Col
        className="d-flex align-items-center justify-content-center"
        xs={1}
      ></Col>
      <Col className="d-flex align-items-center fw-bold">Title</Col>
      <Col className="d-flex align-items-center fw-bold">Artist</Col>
      <Col className="d-flex align-items-center fw-bold">Duration</Col>
    </Row>
  );
};

export default ListHeader;
