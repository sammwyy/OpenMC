import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Flex,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Instance from 'common/instances/instance';
import Version from 'common/versions/version';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'renderer/components/container';
import Steps from 'renderer/components/steps';
import useInstances from 'renderer/hooks/useInstances';
import useVersions from 'renderer/hooks/useVersions';
import { listIcons } from 'renderer/services/icons.service';
import { downloadManifestWithUrl } from 'renderer/services/versions.service';

interface StateProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const INVALID_NAME_CHARS = ['<', '>', ':', '"', '/', '\\', '|', '?', '*'];

function isNameInvalid(name: string) {
  for (let i = 0; i < INVALID_NAME_CHARS.length; i += 1) {
    const char = INVALID_NAME_CHARS[i];
    if (name.includes(char)) {
      return true;
    }
  }

  return false;
}

function Step1Username({ value, setValue }: StateProps) {
  const { getInstanceByName } = useInstances();
  const inUse = getInstanceByName(value) != null;
  const invalidName = isNameInvalid(value);

  return (
    <Box>
      <FormLabel>Instance Name</FormLabel>

      {inUse && (
        <Alert status="error" borderLeft="2px solid red">
          <AlertTitle>In use:</AlertTitle>
          <AlertDescription>Instance name already in use.</AlertDescription>
        </Alert>
      )}

      {invalidName && (
        <Alert status="error" borderLeft="2px solid red">
          <AlertTitle>Invalid name:</AlertTitle>
          <AlertDescription>
            Cannot use {INVALID_NAME_CHARS.join(' ')}
          </AlertDescription>
        </Alert>
      )}

      <Input
        placeholder="My instance 1.19.3"
        variant="flushed"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        isInvalid={inUse || invalidName}
      />
    </Box>
  );
}

function Step2Icon({ value, setValue }: StateProps) {
  const [icons, setIcons] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    listIcons().then(setIcons).catch(console.error);
  }, []);

  return (
    <Box margin="auto">
      <SimpleGrid minChildWidth="50px" spacingX="15px" spacingY="15px">
        {icons.map((icon, index) => (
          <Box
            key={index}
            onClick={() => setValue(icon)}
            cursor="pointer"
            border={`1px solid ${icon === value ? 'white' : 'transparent'}`}
          >
            <Image src={icon} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}

function Step3Version({ value, setValue }: StateProps) {
  const { getByType } = useVersions();

  const releases = getByType('release');
  const snapshots = getByType('snapshot');
  const olds = getByType('old');
  const modded = getByType('modded');
  const customs = getByType('custom');

  interface VersionTabProps {
    versions: Version[];
  }

  function VersionsTab({ versions }: VersionTabProps) {
    return (
      <TabPanel>
        {versions.map((version, index) => {
          const selected = value === version.name;

          return (
            <Box
              key={index}
              color={selected ? 'green.300' : 'gray.400'}
              fontSize={selected ? '19px' : '16px'}
              fontWeight={selected ? 'bold' : 'normal'}
              cursor="pointer"
              _hover={{
                color: selected ? 'green.300' : 'white',
                fontWeight: 'bold',
              }}
              onClick={() => setValue(version.name)}
            >
              {version.name}
            </Box>
          );
        })}
      </TabPanel>
    );
  }

  return (
    <Box>
      <FormLabel>Version</FormLabel>
      <Tabs>
        <TabList>
          <Tab>Releases</Tab>
          <Tab>Snapshots</Tab>
          <Tab>Olds</Tab>
          <Tab>Modded</Tab>
          <Tab>Customs</Tab>
        </TabList>

        <TabPanels maxH="300px" overflowY="scroll">
          <VersionsTab versions={releases} />
          <VersionsTab versions={snapshots} />
          <VersionsTab versions={olds} />
          <VersionsTab versions={modded} />
          <VersionsTab versions={customs} />
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default function CreateInstance() {
  const { addInstance } = useInstances();
  const { getByName } = useVersions();
  const navigate = useNavigate();

  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');
  const [version, setVersion] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveInstance() {
    setSaving(true);

    const mcVersion = getByName(version) as Version;
    if (!mcVersion.manifest) {
      const manifest = await downloadManifestWithUrl(
        mcVersion.manifestUrl || ''
      );
      mcVersion.manifest = manifest;
    }

    const instance: Instance = {
      icon,
      name,
      settings: {
        manifest: mcVersion.name,
      },
      launching: false,
    };

    await addInstance(instance);
    setSaving(false);
  }

  return (
    <Container>
      <Flex margin="auto" width="500px">
        <Steps
          disabled={saving}
          onFinish={async () => {
            await saveInstance();
            navigate('/instances');
          }}
          steps={[
            {
              label: 'Name',
              component: <Step1Username setValue={setName} value={name} />,
              requiredValue: name,
            },

            {
              label: 'Icon',
              component: <Step2Icon setValue={setIcon} value={icon} />,
              requiredValue: icon,
            },

            {
              label: 'Version',
              component: <Step3Version setValue={setVersion} value={version} />,
              requiredValue: version,
            },
          ]}
        />
      </Flex>
    </Container>
  );
}
