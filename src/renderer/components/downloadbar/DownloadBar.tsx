import { Box, Progress, Text } from '@chakra-ui/react';
import useDownload from 'renderer/hooks/useDownload';

function toMB(value: number) {
  return `${(value / (1024 * 1024)).toFixed()}MB`;
}

export default function DownloadBar() {
  const { download } = useDownload();

  if (!download) {
    return null;
  }

  const { files, name, percent, size, lastFile } = download;
  const downloadedSize = `${toMB(size.downloaded)}/${toMB(size.total)}`;

  return (
    <Box
      width="100%"
      padding="10px 20px"
      bg="#444"
      color="white"
      position="sticky"
      bottom="0"
      left="0"
    >
      <Text fontWeight="bold" mr="5px">
        Downloading {name} {files.downloaded} of {files.total} (
        {percent.toFixed()}%)
      </Text>
      <Text>
        {lastFile} ({downloadedSize})
      </Text>
      <Progress
        colorScheme="green"
        size="md"
        width="100%"
        mt="5px"
        value={percent}
      />
    </Box>
  );
}
