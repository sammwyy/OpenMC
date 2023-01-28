import { Box, Flex, Text } from '@chakra-ui/react';
import Container from 'renderer/components/container';
import useLogs from 'renderer/hooks/useLogs';
import { LogLevel } from 'renderer/contexts/logging/log-entry';

export default function Logs() {
  const { entries } = useLogs();

  function levelToFirstColor(level: LogLevel) {
    switch (level) {
      case 'crit':
        return 'red';
      case 'dbug':
        return 'pink';
      case 'info':
        return 'cyan';
      case 'warn':
        return 'yellow';
      default:
        return 'gray';
    }
  }

  return (
    <Container>
      <Box>
        {entries.map((entry, index) => (
          <Flex key={index}>
            <Text color="gray.300" mr="3">
              {entry.date}
            </Text>
            <Text
              color={`${levelToFirstColor(entry.level)}.400`}
              fontWeight="bold"
              mr="3"
            >
              {entry.level.toUpperCase()}
            </Text>
            <Text
              color={`${levelToFirstColor(entry.level)}.200`}
              mr="3"
              maxW="80%"
            >
              {entry.message}
            </Text>
          </Flex>
        ))}
      </Box>
    </Container>
  );
}
