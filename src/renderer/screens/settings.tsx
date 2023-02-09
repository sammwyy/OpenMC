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
    Select
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
    selects: number;
    setSelects: React.Dispatch<React.SetStateAction<number>>;
  }
  
  const VALID_NAME_CHARS = /^[a-zA-Z0-9-_]+$/;

  function isNameInvalid(nick: string) {
    for (let i = 0; i < nick.length; i += 1) {
      if (!nick.match(VALID_NAME_CHARS) || nick.length < 3 ||  nick.length > 16) {
        return true;
      }
      else {
        // Adjust nickname
        adjustNick(nick);
      }
    }
  }
  function checkRam(minimum: string, maximum: string, ramSize: number) {
    var minvalue = parseInt(minimum);
    var maxvalue = parseInt(maximum);

    if(ramSize === 1) {
      if(isNaN(minvalue) || isNaN(maxvalue)) {
       return;
      }
      if(minvalue > maxvalue) return true;
      else if(minvalue < 1) return true;
      else if(maxvalue > 32) return true;
      adjustRam(minimum, maximum, ramSize);
    }
    else if(ramSize === 0) {
      if(isNaN(minvalue) || isNaN(maxvalue)) {
        return;
      }
      if (minvalue < 1024) return true;
      else if (minvalue > maxvalue) return true;
      else if(maxvalue > 32768) return true;
      adjustRam(minimum, maximum, ramSize);
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

  function Ram({ minval, maxval, setRammn, setRammx, selects, setSelects }: StateRam) {
    const invalidRam = checkRam(minval, maxval, selects);
    
    return (
      <Flex display={"column"} width='60%'>
        {invalidRam}

        <FormLabel>Ram:</FormLabel>
        <Flex direction={"row"}>
          <Input
              placeholder={ramData.min}
              variant="flushed"
              value={minval}
              onChange={(e) => setRammn(e.target.value)}
              isInvalid={invalidRam}
          />
          <Select value={selects} onChange={e => setSelects( parseInt(e.target.value))} variant="flushed" width={"75px"} alignContent="left" id='ramType'>
            <option value={0}>MB</option>
            <option value={1}>GB</option>
          </Select>
        </Flex>
        <Flex direction={"row"}>
          <Input
            placeholder={ramData.max}
            variant="flushed"
            value={maxval}
            onChange={(e) => setRammx(e.target.value)}
            isInvalid={invalidRam}
          />
          <Select value={selects} onChange={e => setSelects( parseInt(e.target.value))} variant="flushed" width={"75px"} id='ramType2'>
            <option value={0}>MB</option>
            <option value={1}>GB</option>
          </Select>
        </Flex>
      </Flex>
    );
  }
  
  export default function CreateInstance() {
    const [name, setName] = useState('');
    const [minRam, setRammn] = useState('');
    const [maxRam, setRammx] = useState('');
    const [selects, setSelect] = useState(0);


    return (
      <Container>
        <Flex margin="auto" width="500px" alignItems={"center"}>
            <Flex width="500px" direction="row" gap="20%">
                <Nickname setValue={setName} value={name} />
                <Ram minval={minRam} maxval={maxRam} setRammn={setRammn} setRammx={setRammx} selects={selects} setSelects={setSelect}/>
            </Flex>
        </Flex>
      </Container>
    );
  }