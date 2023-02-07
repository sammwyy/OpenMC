import { useEffect, useState } from 'react';
import { Box, Button, Flex, IconButton, Image, Text } from '@chakra-ui/react';
import Instance from 'common/instances/instance';
import InstanceMetadata from 'common/instances/instance-metadata';
import { FiCopy, FiEdit, FiFolder, FiTrash2 } from 'react-icons/fi';
import useInstances from 'renderer/hooks/useInstances';
import useVersions from 'renderer/hooks/useVersions';
import { launchInstance } from 'renderer/services/launcher.service';
import useDownload from 'renderer/hooks/useDownload';
import Version from 'common/versions/version';

interface SidebarProps {
  instance: Instance | undefined;
}

export default function Sidebar({ instance }: SidebarProps) {
  const { getInstanceMetadata, updateInstance } = useInstances();
  const { getByName } = useVersions();
  const { downloadVersion, versionDownloading } = useDownload();

  const [metadata, setMetadata] = useState<InstanceMetadata | null>(null);
  const [version, setVersion] = useState<Version | null>(null);

  useEffect(() => {
    async function fetchMetadata() {
      if (instance) {
        const newMetadata = await getInstanceMetadata(instance.name);
        setMetadata(newMetadata);
      }
    }

    fetchMetadata();
  }, [getInstanceMetadata, instance]);

  useEffect(() => {
    setVersion(getByName(instance?.settings.manifest || ''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [instance, versionDownloading]);

  if (instance == null || metadata == null) {
    return <div> </div>;
  }

  function statusToColor() {
    if (instance?.launching) {
      return 'red';
    }

    if (versionDownloading && versionDownloading.name === version?.name) {
      return 'yellow';
    }

    switch (version?.status) {
      case 'downloading':
        return 'yellow';
      case 'missing':
        return 'cyan';
      case 'ready':
        return 'green';
      default:
        return 'gray';
    }
  }

  function statusToText() {
    if (instance?.launching) {
      return 'Launching...';
    }

    if (versionDownloading && versionDownloading.name === version?.name) {
      return 'Downloading...';
    }

    switch (version?.status) {
      case 'downloading':
        return 'Downloading...';
      case 'missing':
        return 'Download';
      case 'ready':
        return 'Launch';
      default:
        return 'Loading';
    }
  }

  function canRunAction() {
    if (versionDownloading) return false;

    if (instance?.launching) return false;
    return version?.status === 'missing' || version?.status === 'ready';
  }

  async function runAction() {
    if (version?.status === 'missing') {
      downloadVersion(version);
    } else if (version?.status === 'ready' && instance?.launching === false) {
      instance.launching = true;
      updateInstance(instance);
      await launchInstance(instance, version);
      instance.launching = false;
      updateInstance(instance);
    }
  }

  return (
    <Box height="100%" width="250px" bg="#1A1A1A" padding="25px">
      <Image margin="auto" width="75%" src={instance?.icon} />

      <Text fontSize="18px" fontWeight="bold" textAlign="center" mt="25px">
        {instance?.name}
      </Text>

      <Box mt="25px">
        <Button
          width="100%"
          colorScheme={statusToColor()}
          isDisabled={!canRunAction()}
          onClick={() => runAction()}
        >
          {statusToText()}
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
          <Text>{version?.manifest?.javaVersion?.majorVersion || 8}</Text>
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
