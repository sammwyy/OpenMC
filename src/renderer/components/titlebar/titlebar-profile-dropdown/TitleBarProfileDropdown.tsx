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

import { getConfig } from 'renderer/services/config.service';
var usernameValue: string;
var accountMode: string;
const config = getConfig().then(function(result) {
  usernameValue = (result.account.username);
  accountMode = (result.account.mode);
});

export default function TitleBarProfileDropdown() {
  {config}
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
            src={"https://mc-heads.net/avatar/" + usernameValue + "/32"}
          />
          <Box textAlign="left" ml="10px">
            <Text fontSize="14px">{usernameValue}</Text>
            <Badge colorScheme="red">{accountMode}</Badge>
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