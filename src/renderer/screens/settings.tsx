import {
    Alert,
    AlertDescription,
    AlertTitle,
    Box,
    Center,
    Flex,
    flexbox,
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
  import ramData from '../../common/ram.json';
  
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

  function isNameInvalid(nick: string) {
    for (let i = 0; i < nick.length; i += 1) {
      if (!nick.match(VALID_NAME_CHARS) || nick.length < 3) {
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
    else if(minvalue > maxvalue || minvalue < 1024) {
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
      <Flex display={"column"} width="60%" alignContent={"center"}>
        <Box width={"100%"}>
          {invalidName}
        </Box>

        <FormLabel>Nickname:</FormLabel>
        <Input
          placeholder={playerData.nick}
          variant="flushed"
          value={value}
          onChange={(nick) => setValue(nick.target.value)}
          isInvalid={invalidName}
        />
      </Flex>
    );
  }

  function Ram({ minval, maxval, setRammn, setRammx }: StateRam) {
    const invalidRam = isRamInvalid(minval, maxval);
    
    return (
      <Flex display={"column"} width='60%'>
        {invalidRam}

        <FormLabel>RAM:</FormLabel>
        <Input
          placeholder={ramData.min}
          variant="flushed"
          value={minval}
          onChange={(e) => setRammn(e.target.value)}
          isInvalid={invalidRam}
        />
        <Input
          placeholder={ramData.max}
          variant="flushed"
          value={maxval}
          onChange={(e) => setRammx(e.target.value)}
          isInvalid={invalidRam}
        />
      </Flex>
    );
  }
  
  export default function CreateInstance() {
    const [name, setName] = useState('');
    const [minRam, setRammn] = useState('');
    const [maxRam, setRammx] = useState('');


    return (
      <Container>
        <Flex margin="auto" width="500px" alignItems={"center"}>
            <Flex width="500px" direction="row" gap="20%">
                <Nickname setValue={setName} value={name} />
                <Ram minval={minRam} maxval={maxRam} setRammn={setRammn} setRammx={setRammx}/>
            </Flex>
        </Flex>
      </Container>
    );
  }