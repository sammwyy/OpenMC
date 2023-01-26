import { Flex, IconButton } from '@chakra-ui/react';
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from 'react-icons/vsc';

import styles from './TitleBarButtons.module.css';

export default function TitleBarButtons() {
  return (
    <Flex alignItems="center" className={styles.buttons}>
      <IconButton
        aria-label="Minimize"
        mr="5px"
        icon={<VscChromeMinimize />}
        size="xs"
      />
      <IconButton
        aria-label="Maximize"
        mr="5px"
        icon={<VscChromeMaximize />}
        size="xs"
      />
      <IconButton aria-label="Close" icon={<VscChromeClose />} size="xs" />
    </Flex>
  );
}
