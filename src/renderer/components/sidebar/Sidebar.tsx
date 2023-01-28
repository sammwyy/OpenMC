import { useEffect, useState } from 'react';
import { Box, Button, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import Instance from 'common/instances/instance';
import InstanceMetadata from 'common/instances/instance-metadata';
import { FiCopy, FiEdit, FiFolder, FiTrash2 } from 'react-icons/fi';
import useInstances from 'renderer/hooks/useInstances';
import useVersions from 'renderer/hooks/useVersions';

interface SidebarProps {
  instance: Instance | undefined;
}

export default function Sidebar({ instance }: SidebarProps) {
  const { getInstanceMetadata } = useInstances();
  const { getByName } = useVersions();

  const [metadata, setMetadata] = useState<InstanceMetadata | null>(null);
  const version = getByName(instance?.settings.manifest || '');

  useEffect(() => {
    async function fetchMetadata() {
      if (instance) {
        const newMetadata = await getInstanceMetadata(instance.name);
        setMetadata(newMetadata);
      }
    }

    fetchMetadata();
  }, [getInstanceMetadata, instance]);

  if (instance == null || metadata == null) {
    return <div> </div>;
  }

  return (
    <Box height="100%" width="250px" bg="#1A1A1A" padding="25px">
      <Image margin="auto" width="75%" src={instance?.icon} />

      <Text fontSize="18px" fontWeight="bold" textAlign="center" mt="25px">
        {instance?.name}
      </Text>

      <Box mt="25px">
        <Button width="100%" colorScheme="green">
          Run instance
        </Button>
        <Flex mt="10px" justifyContent="space-between">
          <IconButton aria-label="Edit instance" icon={<FiEdit />} isDisabled />
          <IconButton
            aria-label="Clone instance"
            icon={<FiCopy />}
            isDisabled
          />
          <IconButton
            aria-label="Open .minecraft folder"
            icon={<FiFolder />}
            isDisabled
          />
          <IconButton
            aria-label="Delete instance"
            colorScheme="red"
            icon={<FiTrash2 />}
            isDisabled
          />
        </Flex>
      </Box>

      <Box mt="25px">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Version:</Text>
          <Text>{version?.name}</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Java:</Text>
          <Text>{version?.manifest?.javaVersion.majorVersion}</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Mods:</Text>
          <Text>{metadata.mods.length}</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Resource Packs:</Text>
          <Text>{metadata.resourcepacks.length}</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Shader Packs:</Text>
          <Text>{metadata.shaderpacks.length}</Text>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold">Worlds:</Text>
          <Text>{metadata.worlds.length}</Text>
        </Flex>
      </Box>
    </Box>
  );
}
