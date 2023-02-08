import {
    Alert,
    AlertDescription,
    AlertTitle,
    Box,
    Center,
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
  import { SetStateAction, useEffect, useState } from 'react';
  import Container from 'renderer/components/container';
  
  interface StateProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }
  interface StateRam {
    minval: string;
    maxval: string;
    setRammn: React.Dispatch<React.SetStateAction<string>>;
    setRammx: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const INVALID_NAME_CHARS = ['<', '>', ':', '"', '/', '\\', '|', '?', '*'];
  var INVALID_RAM = ''

  import dataRam from '../../common/ram.json';
  import playerData from '../../common/player.json';
  
  function isNameInvalid(nick: string) {
    for (let i = 0; i < INVALID_NAME_CHARS.length; i += 1) {
      const char = INVALID_NAME_CHARS[i];
      if (nick.includes(char) || nick.length < 3) {
        return true;
      }
    }
    }
  function isRamInvalid(minimum: string, maximum: string) {
    const minvalue = parseInt(minimum);
    const maxvalue = parseInt(maximum);
    console.log(minvalue)
    if(isNaN(minvalue) || isNaN(maxvalue)) {
        INVALID_RAM = 'Please input a number!'
        return true;
    }
    else if(minvalue > maxvalue) {
        INVALID_RAM = 'Min value can´t be grater than max value!'
        return true;
    }

    else if(minvalue < 1024) {
        INVALID_RAM = 'Minimum value can´t be less than 1024!'
        return true
    };

  }
  
  function Nickname({ value, setValue }: StateProps) {
    const invalidName = isNameInvalid(value);
    var value = playerData.nick
  
    return (
      <Box>
        <FormLabel>Nickname:</FormLabel>
  
        {invalidName && (
          <Alert status="error" borderLeft="2px solid red">
            <AlertTitle>Invalid name:</AlertTitle>
            <AlertDescription>
              Invalid Nickname
            </AlertDescription>
          </Alert>
        )}
  
        <Input
          placeholder='Player'
          variant="flushed"
          value={value}
          onChange={(nick) => setValue(nick.target.value)}
          isInvalid={invalidName}
        />
      </Box>
    );
  }

  function Ram({ minval, maxval, setRammn, setRammx }: StateRam) {
    const invalidRam = isRamInvalid(minval, maxval);
    return (
      <Box>
        {invalidRam && (
          <Alert status="error" borderLeft="2px solid red">
            <AlertTitle>Invalid RAM configuraton:</AlertTitle>
            <AlertDescription>
              {INVALID_RAM}
            </AlertDescription>
          </Alert>
        )}

        <FormLabel>RAM:</FormLabel>
        <Input
          placeholder="Minimum"
          variant="flushed"
          value={minval}
          onChange={(e) => setRammn(e.target.value)}
          isInvalid={invalidRam}
        />
        <Input
          placeholder="Maximum"
          variant="flushed"
          value={maxval}
          onChange={(e) => setRammx(e.target.value)}
          isInvalid={invalidRam}
        />
      </Box>
    );
  }
  
  export default function CreateInstance() {
    const [name, setName] = useState('');
    const [minRam, setRammn] = useState('');
    const [maxRam, setRammx] = useState('');
    dataRam.max = setRammx;


    return (
      <Container>
        <Flex margin="auto" width="500px" justifyContent={'center'}>
            <Nickname setValue={setName} value={name} />
        </Flex>
        <Flex margin="auto" width="500px" justifyContent={'center'}>
            <Ram minval={minRam} maxval={maxRam} setRammn={setRammn} setRammx={setRammx}/>
        </Flex>
      </Container>
    );
  }