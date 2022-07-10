import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import renderConfig from '../../../render.config';

interface AboutProps {
  /**
   * If set to `true`, the modal will be shown
   */
  showModal: boolean;
  /**
   * Function called when the modal is closed
   */
  onHide(): void;
}

const About: FC<AboutProps> = ({ showModal, onHide }) => {
  return (
    <Modal
      centered={true}
      contentClassName="rounded-0 shadow border-0"
      onHide={onHide}
      show={showModal}
    >
      <Modal.Header className="align-middle" closeButton={true}>
        <FontAwesomeIcon className="me-1" icon={faCircleInfo} /> About{' '}
        {renderConfig.APP_NAME}
      </Modal.Header>
      <Modal.Body>Moar info</Modal.Body>
    </Modal>
  );
};

export default About;
