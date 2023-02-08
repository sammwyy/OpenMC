import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { BiChevronDown } from 'react-icons/bi';

import styles from './TitleBarProfileDropdown.module.css';

import playerData from '../../../../common/player.json';

export default function TitleBarProfileDropdown() {
  return (
    <Menu>
      <MenuButton
        className={styles['menu-btn']}
        as={Button}
        variant="ghost"
        rightIcon={<BiChevronDown />}
      >
        <Flex alignItems="center">
          <Image
            borderRadius="50%"
            src={"https://mc-heads.net/avatar/" + playerData.nick + "/32"}
          />
          <Box textAlign="left" ml="10px">
            <Text fontSize="14px">{playerData.nick}</Text>
            <Badge colorScheme="red">{playerData.mode}</Badge>
          </Box>
        </Flex>
      </MenuButton>
      <MenuList className={styles['menu-list']} bg="#111">
        <MenuDivider />
        <MenuItem bg="transparent" isDisabled>
          Add account
        </MenuItem>
        <MenuItem bg="transparent" isDisabled color="red.400">
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}