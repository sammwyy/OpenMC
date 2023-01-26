import { Flex, IconButton, Image, Text } from '@chakra-ui/react';
import {
  VscChromeClose,
  VscChromeMaximize,
  VscChromeMinimize,
} from 'react-icons/vsc';

import TitleBarSection from './titlebar-section/TitleBarSection';

import Icon from '../../../../assets/icon.png';
import TitleBarProfileDropdown from './titlebar-profile-dropdown/TitleBarProfileDropdown';

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
      </TitleBarSection>
    </Flex>
  );
}
