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
  import { adjustRam } from 'renderer/services/ram.service';
  import { adjustNick } from 'renderer/services/nickname.service';
  import playerData from '../../common/player.json';
  
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
  
  const VALID_NAME_CHARS = /^[a-zA-Z0-9-_]+$/;
  var INVALID_NAME_MESSAGE = '';
  var INVALID_RAM_MESSAGE = ''

  function isNameInvalid(nick: string) {
    for (let i = 0; i < nick.length; i += 1) {
      if (!nick.match(VALID_NAME_CHARS)) {
        INVALID_NAME_MESSAGE = 'Invalid characters!'
        return true;
      }
      else if (nick.length < 3) {
        INVALID_NAME_MESSAGE = 'Must be at least 3 characters long!'
        return true;
      }
      else {
        // Adjust nickname
        adjustNick(nick);
      }
    }
  }
  function isRamInvalid(minimum: string, maximum: string) {
    const minvalue = parseInt(minimum);
    const maxvalue = parseInt(maximum);

    if(isNaN(minvalue) || isNaN(maxvalue)) {
    }
    else if(minvalue > maxvalue) {
        INVALID_RAM_MESSAGE = 'Min value can´t be grater than max value!'
        return true;
    }

    else if(minvalue < 1024) {
        INVALID_RAM_MESSAGE = 'Minimum value can´t be less than 1024!'
        return true;
    }

    else {
      //Adjust RAM
      adjustRam(minimum, maximum);
    }
  };
  
  function Nickname({ value, setValue }: StateProps) {
    const invalidName = isNameInvalid(value);
  
    return (
      <Box>
        <FormLabel>Nickname:</FormLabel>
  
        {invalidName && (
          <Alert status="error" borderLeft="2px solid red">
            <AlertTitle>Invalid name:</AlertTitle>
            <AlertDescription>
              {INVALID_NAME_MESSAGE}
            </AlertDescription>
          </Alert>
        )}
  
        <Input
          placeholder={playerData.nick}
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
              {INVALID_RAM_MESSAGE}
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