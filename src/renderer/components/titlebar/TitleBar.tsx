import { Flex, Image, Text } from '@chakra-ui/react';
import TitleBarSection from './titlebar-section/TitleBarSection';
import TitleBarProfileDropdown from './titlebar-profile-dropdown/TitleBarProfileDropdown';

import Icon from '../../../../assets/icon.png';
import styles from './TitleBar.module.css';
import TitleBarButtons from './titlebar-buttons/TitleBarButtons';

export interface TitleBarProps {
  title: string;
}

export default function TitleBar({ title }: TitleBarProps) {
  return (
    <Flex
      width="100%"
      padding="10px 20px"
      alignItems="center"
      justifyContent="space-between"
      className={styles.titlebar}
    >
      <TitleBarSection align="left">
        <TitleBarProfileDropdown />
      </TitleBarSection>

      <TitleBarSection align="center">
        <Image width="32px" src={Icon} />
        <Text
          marginLeft="5px"
          fontSize="14px"
          fontWeight="bold"
          color="cyan.500"
        >
          {title}
        </Text>
      </TitleBarSection>
      <TitleBarSection align="right">
        <TitleBarButtons />
      </TitleBarSection>
    </Flex>
  );
}
