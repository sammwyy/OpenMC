import { Button } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarLinkProps extends PropsWithChildren {
  to: string;
}

export default function NavbarLink({ children, to }: NavbarLinkProps) {
  const location = useLocation();
  const selected = location.pathname === to;

  return (
    <Button
      as={Link}
      to={to}
      color={selected ? '#FFF' : '#777'}
      borderBottom={`2px solid ${selected ? 'white' : 'transparent'}`}
      borderRadius="none"
      fontSize="16px"
      margin="0 15px"
      userSelect="none"
      variant="unstyled"
    >
      {children}
    </Button>
  );
}
