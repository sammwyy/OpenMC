import { Flex, Text } from '@chakra-ui/react';
import useVersions from 'renderer/hooks/useVersions';

export default function DownloadBar() {
  const { lastFile } = useVersions();

  if (!lastFile) {
    return null;
  }

  return (
    <Flex
      width="100%"
      padding="10px 20px"
      bg="#444"
      color="white"
      position="absolute"
      bottom="0"
      left="0"
    >
      <Text fontWeight="bold" mr="5px">
        Downloading
      </Text>
      <Text>{lastFile}</Text>
    </Flex>
  );
}
