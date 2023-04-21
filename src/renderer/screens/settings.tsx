import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Flex,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Container from 'renderer/components/container';
import { modifyRam, readRam } from 'renderer/services/ram.service';
import {
  modifyUsername,
  readUsername,
} from 'renderer/services/username.service';

interface UsernameProps {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}
interface RamProps {
  minValue: number;
  setMinValue: React.Dispatch<React.SetStateAction<number>>;
  maxValue: number;
  setMaxValue: React.Dispatch<React.SetStateAction<number>>;
}

async function getRamValues() {
  return await readRam();
}

async function getUsernameValue() {
  return await readUsername();
}

const REGEX = /^[a-zA-Z0-9-_]+$/;

function isNameInvalid(name: string) {
  if (!REGEX.test(name) || name.length < 3) {
    return true;
  }

  modifyUsername(name);
  return false;
}

// Check if the ram config is valid
function isRamInvalid(minValue: number, maxValue: number) {
  if (minValue < 1024 || maxValue > 16000) return true; // I want to set the max to the device ram but can't find a way
  if (minValue > maxValue) return true;

  modifyRam(minValue, maxValue);
  return false;
}

function PlayerName({ username, setUsername }: UsernameProps) {
  const invalidName = isNameInvalid(username);

  return (
    <Box>
      <FormLabel>Username</FormLabel>

      {invalidName && (
        <Alert status="error" borderLeft="2px solid red">
          <AlertTitle>Invalid name:</AlertTitle>
          <AlertDescription>Contains invalid characters</AlertDescription>
        </Alert>
      )}

      <Input
        placeholder="Username"
        variant="flushed"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        isInvalid={invalidName}
      />
    </Box>
  );
}

function RamSettings({
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}: RamProps) {
  const invalidConfig = isRamInvalid(minValue, maxValue);

  return (
    <Box w="30%">
      <FormLabel>Ram Settings</FormLabel>

      {invalidConfig && (
        <Alert status="error" borderLeft="2px solid red">
          <AlertTitle>Invalid config:</AlertTitle>
          <AlertDescription>Please check your configuration</AlertDescription>
        </Alert>
      )}

      <Input
        type="number"
        placeholder="Minimum RAM"
        variant="flushed"
        value={minValue}
        onChange={(e) => setMinValue(Number(e.target.value))}
      />

      <Input
        type="number"
        placeholder="Maximum RAM"
        variant="flushed"
        value={maxValue}
        onChange={(e) => setMaxValue(Number(e.target.value))}
      />
    </Box>
  );
}

export default function ConfigInput() {
  const [username, setUsername] = useState(String);
  const [minValueRam, setMinRam] = useState(Number);
  const [maxValueRam, setMaxRam] = useState(Number);

  useEffect(() => {
    async function fetchData() {
      const RamValues = await getRamValues();
      const usernameValue = await getUsernameValue();
      setMinRam(RamValues[0]);
      setMaxRam(RamValues[1]);
      setUsername(usernameValue);
    }

    fetchData();
  }, []);

  return (
    <Container>
      <Flex margin="auto" width="70%" gap="50px" justifyContent='center'>
        <PlayerName setUsername={setUsername} username={username} />
        <RamSettings
          setMinValue={setMinRam}
          setMaxValue={setMaxRam}
          minValue={minValueRam}
          maxValue={maxValueRam}
        />
      </Flex>
    </Container>
  );
}
