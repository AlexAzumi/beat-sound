import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

interface ListHeaderProps {
  /**
   * Handles the click on a column title
   * @param columnName - Name of the column
   */
  handleSortByColumn(columnName: string): void;
}

const ListHeader: FC<ListHeaderProps> = ({ handleSortByColumn }) => {
  return (
    <Row className="sticky-top py-3 mb-1 bg-white border-bottom">
      <Col
        className="d-flex align-items-center justify-content-center"
        xs={1}
      ></Col>
      <Col
        className="d-flex align-items-center fw-bold"
        onClick={() => handleSortByColumn('title')}
      >
        Title
      </Col>
      <Col
        className="d-flex align-items-center fw-bold"
        onClick={() => handleSortByColumn('artist')}
      >
        Artist
      </Col>
      <Col className="d-flex align-items-center fw-bold" xs={1}>
        Duration
      </Col>
    </Row>
  );
};

export default ListHeader;
