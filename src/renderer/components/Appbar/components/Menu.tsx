import { FC } from 'react';

import renderConfig from '../../../render.config';

interface MenuProps {
  /**
   * Shows the about modal
   */
  showAboutModal(): void;
}

const Menu: FC<MenuProps> = ({ showAboutModal }) => {
  return (
    <ul className="menu d-flex">
      <li className="menu-item px-3 py-2">
        Language
        <ul className="submenu">
          <li className="submenu-item px-3 py-2">English</li>
          <li className="submenu-item px-3 py-2">Spanish</li>
        </ul>
      </li>
      <li className="menu-item px-3 py-2">
        Help
        <ul className="submenu">
          <li className="submenu-item px-3 py-2" onClick={showAboutModal}>
            About {renderConfig.APP_NAME}
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Menu;
