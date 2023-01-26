import { Flex } from '@chakra-ui/react';
import NavbarLink from './navbar-link/NavbarLink';

export default function Navbar() {
  return (
    <Flex
      width="100%"
      alignItems="center"
      justifyContent="center"
      margin="10px 0"
    >
      <NavbarLink to="/">Instances</NavbarLink>
      <NavbarLink to="/servers">Servers</NavbarLink>
      <NavbarLink to="/settings">Settings</NavbarLink>
    </Flex>
  );
}
