import { Flex } from '@chakra-ui/react';
import NavbarLink from './navbar-link/NavbarLink';

export default function Navbar() {
  return (
    <Flex width="100%" alignItems="center" justifyContent="center">
      <NavbarLink to="/instances">Instances</NavbarLink>
      <NavbarLink to="/logs">Logs</NavbarLink>
      <NavbarLink to="/settings">Settings</NavbarLink>
    </Flex>
  );
}
