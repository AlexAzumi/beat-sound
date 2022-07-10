import { FC } from 'react';
import { Modal } from 'react-bootstrap';

import renderConfig from '../../render.config';

interface AboutProps {
  showModal: boolean;
}

const About: FC<AboutProps> = () => {
  return (
    <Modal>
      <Modal.Header>About {renderConfig.APP_NAME}</Modal.Header>
    </Modal>
  );
};

export default About;
