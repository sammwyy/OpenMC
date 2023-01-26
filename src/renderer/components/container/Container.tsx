import { Flex } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return (
    <Flex
      height="calc(100vh - 100px)"
      width="100%"
      padding="20px"
      overflowY="scroll"
    >
      {children}
    </Flex>
  );
}
