import {
    Box,
    Flex,
    FormLabel,
    Input,
    Select
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import Container from 'renderer/components/container';
  import { adjustRam } from 'renderer/services/ram.service';
  import { adjustNick } from 'renderer/services/nickname.service';

  import playerData from '../../common/player.json';
  import ramData from '../../common/ram.json';
  // Placeholder values for RAM adjustment
  var plRamMin = '';
  var plRamMax = '';
  
  interface StateNick {
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
  
  // Valid chars in nickname
  const VALID_NAME_CHARS = /^[a-zA-Z0-9-_]+$/;

  // Check if nickname is valid and apply the changes
  function checkNick(nick: string) {
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

  // Check if RAM value is valid and apply the changes
  function checkRam(minimum: string, maximum: string, ramSize: number) {
    var minvalue = parseInt(minimum);
    var maxvalue = parseInt(maximum);

    // If RAM type is GB
    if(ramSize === 1) {
      plRamMin = (parseInt(ramData.min) / 1024).toString();
      plRamMax = (parseInt(ramData.max) / 1024).toString();

      if(minimum == '' && maximum == '') return;
      if(isNaN(minvalue) || isNaN(maxvalue)) return true;
      if(minvalue > maxvalue) return true;
      else if(minvalue < 1) return true;
      else if(maxvalue > 32) return true;
      adjustRam(minimum, maximum, ramSize);
    }
    
    // If RAM type is MB
    if(ramSize === 0) {
      plRamMin = ramData.min;
      plRamMax = ramData.max;

      if(minimum == '' && maximum == '') return;
      if(isNaN(minvalue) || isNaN(maxvalue)) return true;
      if (minvalue < 1024) return true;
      else if (minvalue > maxvalue) return true;
      else if(maxvalue > 32768) return true;
      adjustRam(minimum, maximum, ramSize);
    }
  };
  
  // Nickname input
  function Nickname({ value, setValue }: StateNick) {
    const invalidName = checkNick(value);
  
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

  // RAM input
  function Ram({ minval, maxval, setRammn, setRammx, selects, setSelects }: StateRam) {
    const invalidRam = checkRam(minval, maxval, selects);

    return (
      <Flex display={"column"} width='60%'>
        {invalidRam}

        <FormLabel>Ram:</FormLabel>
        <Flex direction={"row"}>
          <Input
              placeholder={plRamMin}
              variant="flushed"
              value={minval}
              onChange={(e) => setRammn(e.target.value)}
              isInvalid={invalidRam}
          />
          <Select value={selects} onChange={e => setSelects(parseInt(e.target.value))} variant="flushed" width={"75px"} alignContent="left" id='ramType'>
            <option value={0}>MB</option>
            <option value={1}>GB</option>
          </Select>
        </Flex>
        <Flex direction={"row"}>
          <Input
            placeholder={plRamMax}
            variant="flushed"
            value={maxval}
            onChange={(e) => setRammx(e.target.value)}
            isInvalid={invalidRam}
          />
          <Select value={selects} onChange={e => setSelects(parseInt(e.target.value))} variant="flushed" width={"75px"} id='ramType2'>
            <option value={0}>MB</option>
            <option value={1}>GB</option>
          </Select>
        </Flex>
      </Flex>
    );
  }
  
  export default function CreateSettings() {
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