import {
  Box,
  Flex,
  FormLabel,
  Image,
  Input,
  SimpleGrid,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Container from 'renderer/components/container';
import Steps from 'renderer/components/steps';
import useInstances from 'renderer/hooks/useInstances';
import { listIcons } from 'renderer/services/icons.service';

interface StateProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function Step1Username({ value, setValue }: StateProps) {
  return (
    <Box>
      <FormLabel>Instance Name</FormLabel>
      <Input
        placeholder="My instance 1.19.3"
        variant="flushed"
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
  return (
    <Box>
      <FormLabel>Version</FormLabel>
    </Box>
  );
}

export default function CreateInstance() {
  const { instances } = useInstances();

  const [icon, setIcon] = useState('');
  const [name, setName] = useState('');

  return (
    <Container>
      <Flex margin="auto" width="500px">
        <Steps
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
          ]}
        />
      </Flex>
    </Container>
  );
}
