import {
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

export default function TitleBarProfileDropdown() {
  return (
    <Menu>
      <MenuButton as={Button} variant="ghost" rightIcon={<BiChevronDown />}>
        <Flex alignItems="center">
          <Image
            borderRadius="50%"
            src="https://mc-heads.net/avatar/sammwy_/32"
          />
          <Text fontSize="14px" ml="10px">
            Sammwy_
          </Text>
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}
