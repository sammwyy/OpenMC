import { Flex, IconButton } from '@chakra-ui/react';
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from 'react-icons/vsc';
import {
  closeWindow,
  maximizeWindow,
  minimizeWindow,
} from 'renderer/services/window.service';

import styles from './TitleBarButtons.module.css';

export default function TitleBarButtons() {
  return (
    <Flex alignItems="center" className={styles.buttons}>
      <IconButton
        aria-label="Minimize"
        mr="5px"
        icon={<VscChromeMinimize />}
        size="xs"
        onClick={minimizeWindow}
      />
      <IconButton
        aria-label="Maximize"
        mr="5px"
        icon={<VscChromeMaximize />}
        size="xs"
        onClick={maximizeWindow}
      />
      <IconButton
        aria-label="Close"
        icon={<VscChromeClose />}
        size="xs"
        onClick={closeWindow}
      />
    </Flex>
  );
}
