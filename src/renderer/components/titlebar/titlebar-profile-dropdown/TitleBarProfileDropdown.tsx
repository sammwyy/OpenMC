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
            src="https://mc-heads.net/avatar/steve/32"
          />
          <Box textAlign="left" ml="10px">
            <Text fontSize="14px">Player</Text>
            <Badge colorScheme="red">Offline</Badge>
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
