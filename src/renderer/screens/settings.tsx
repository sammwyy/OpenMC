import Container from 'renderer/components/container';
import { Box, Flex, Select, Text, useColorMode } from '@chakra-ui/react';

export default function Settings(): JSX.Element {
  const { setColorMode } = useColorMode();
  return (
    <>
      <Container>
        <Box width="calc(100% - 250px)" padding="0 30px">
          <Flex
            mb="25px"
            width="100%"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text fontSize="20px">Theme</Text>
          </Flex>
          <Select
            width="50%"
            mb="25px"
            onChange={(e) => setColorMode(e.target.value)}
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System</option>
          </Select>
        </Box>
      </Container>
    </>
  );
}
