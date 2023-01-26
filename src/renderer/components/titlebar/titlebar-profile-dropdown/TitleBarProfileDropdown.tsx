import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
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
            src="https://mc-heads.net/avatar/sammwy_/32"
          />
          <Box textAlign="left" ml="10px">
            <Text fontSize="14px">Sammwy_</Text>
            <Badge colorScheme="green">Microsoft</Badge>
          </Box>
        </Flex>
      </MenuButton>
      <MenuList className={styles['menu-list']}>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}
