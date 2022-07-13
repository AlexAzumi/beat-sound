import { FC, useEffect } from 'react';
import { Badge, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

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
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('main-channel', [
      { action: 'get-version', payload: null },
    ]);

    window.electron.ipcRenderer.once('main-channel', (arg) => {
      console.log(arg);
    });
  }, []);

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
      <Modal.Body>
        <p>
          Beat Sound is an open source media player made for those who wants to
          listen their favorite songs from a modded Beat Saber experience.
        </p>
        <div className="d-flex align-items-center">
          <div className="fw-bold me-1">Version:</div>
          <Badge>Beta 1</Badge>
        </div>
        <div className="d-flex align-items-center">
          <div className="fw-bold me-1">Made by:</div>
          <div>AlexAzumi</div>
        </div>
        <div className="d-flex justify-content-center mt-4">
          <FontAwesomeIcon
            className="about-icon me-3"
            icon={faCircleUser}
            size="2x"
          />
          <FontAwesomeIcon
            className="about-icon me-3"
            icon={faGithub}
            size="2x"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default About;
