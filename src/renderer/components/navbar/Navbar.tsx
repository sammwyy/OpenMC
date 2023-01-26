import { Flex } from '@chakra-ui/react';
import NavbarLink from './navbar-link/NavbarLink';

export default function Navbar() {
  return (
    <Flex width="100%" alignItems="center" justifyContent="center">
      <NavbarLink to="/">Instances</NavbarLink>
      <NavbarLink to="/servers">Servers</NavbarLink>
      <NavbarLink to="/modpacks">Modpacks</NavbarLink>
      <NavbarLink to="/resource-packs">ResourcePacks</NavbarLink>
      <NavbarLink to="/shader-packs">ShaderPacks</NavbarLink>
      <NavbarLink to="/settings">Settings</NavbarLink>
    </Flex>
  );
}
