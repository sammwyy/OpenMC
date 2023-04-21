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
import { useState, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';

import styles from './TitleBarProfileDropdown.module.css';
import { readUsername } from '../../../services/username.service';

export default function TitleBarProfileDropdown() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    async function getUsername() {
      const value = await readUsername();
      setUsername(value);
    }

    getUsername();

    // Listen for username:modify event and update the username state variable
    window.electron.ipcRenderer.on('username:modify', () => {
      getUsername();
    });
  }, []);

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
            src={'https://mc-heads.net/avatar/' + username + '/32'}
          />
          <Box textAlign="left" ml="10px">
            <Text fontSize="14px">{username}</Text>
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
