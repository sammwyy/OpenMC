import { Box, Button, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import { FiCopy, FiEdit, FiFolder, FiTrash2 } from 'react-icons/fi';

export default function Sidebar() {
  return (
    <Box height="100%" width="250px" bg="#1A1A1A" padding="25px">
      <Image
        margin="auto"
        width="75%"
        src="https://avatars.githubusercontent.com/u/21025855?s=280&v=4"
      />

      <Text fontSize="18px" fontWeight="bold" textAlign="center" mt="25px">
        Fabric 1.19.3
      </Text>

      <Box mt="25px">
        <Button width="100%" colorScheme="green">
          Run instance
        </Button>
        <Flex mt="10px" justifyContent="space-between">
          <IconButton aria-label="Edit instance" icon={<FiEdit />} />
          <IconButton aria-label="Clone instance" icon={<FiCopy />} />
          <IconButton aria-label="Open .minecraft folder" icon={<FiFolder />} />
          <IconButton
            aria-label="Delete instance"
            colorScheme="red"
            icon={<FiTrash2 />}
          />
        </Flex>
      </Box>

      <Box mt="25px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Version base:</Text>
          <Text>1.19.3</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Loader:</Text>
          <Text>Fabric</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Java:</Text>
          <Text>17</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Mods:</Text>
          <Text>29 (32)</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Resource Packs:</Text>
          <Text>7</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Shader Packs:</Text>
          <Text>3</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Servers:</Text>
          <Text>0</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">World:</Text>
          <Text>4</Text>
        </Flex>
      </Box>
    </Box>
  );
}
