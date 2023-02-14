import {
    Alert,
    AlertDescription,
    AlertTitle,
    Box,
    Select,
    Flex,
    FormLabel,
    Input,
  } from '@chakra-ui/react';
  import Container from 'renderer/components/container';
  import { saveConfig, getConfig } from 'renderer/services/config.service';
  import { useState } from 'react';

  var minRamValue: number;
  var maxRamValue: number;
  var usernameValue: string;

  function loadConfig() {
    getConfig().then(function(result) {
      minRamValue = (result.memory.min);
      maxRamValue = (result.memory.max);
      usernameValue = (result.account.username);
    })
  }
  loadConfig()
  // Placeholder values for RAM adjustment
  var plRamMin: number;
  var plRamMax: number;
  
  interface StateConfig {
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    minRamValue: number;
    maxRamValue: number;
    setRammn: React.Dispatch<React.SetStateAction<number>>;
    setRammx: React.Dispatch<React.SetStateAction<number>>;
    selects: number;
    setSelects: React.Dispatch<React.SetStateAction<number>>;
  }
  
  // Valid chars in username
  const VALID_NAME_CHARS = /^[a-zA-Z0-9-_]+$/;

  // Check if username is valid and apply the changes
  function checkConfig(minRamValue: number, maxRamValue: number, ramSize: number, username: string) {
        // Checking RAM values
        plRamMin = /*ramData.min*/ 1024;
        plRamMax = /*ramData.max*/ 2048;

        if(ramSize === 1) {
          minRamValue *= 1024;
          maxRamValue *= 1024;
          plRamMin = (/*ramData.min*/1024 / 1024);
          plRamMax = (/*ramData.max*/2048 / 1024);
        } 
          if(isNaN(minRamValue) || isNaN(maxRamValue)) return true;
          if (minRamValue < 1024) return true;
          else if (minRamValue > maxRamValue) return true;
          else if(maxRamValue > 32768) return true;

          //Checking nickname
          for (let i = 0; i < username.length; i += 1) {
            if (!username.match(VALID_NAME_CHARS) || username.length < 3 ||  username.length > 16) return true;
            else {
              // Save config
              saveConfig(minRamValue, maxRamValue, username);
            }
          }
  }


  // RAM input
  function ConfigInput({ username, setUsername ,minRamValue, maxRamValue, setRammn, setRammx, selects, setSelects }: StateConfig) {
    const validConfig = checkConfig(minRamValue, maxRamValue, selects, username);

    return (
      <Flex justifyContent="space-between" width='500px'>
          <Flex display="row" alignContent="center">
            <FormLabel>Username:</FormLabel>
            <Input
              placeholder={/*playerData.nick*/'Player'}
              variant="flushed"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isInvalid={validConfig == true}
            />
          </Flex>
          <Flex display="row" alignContent="center">
          <FormLabel>Ram:</FormLabel>
            <Flex direction="row">
                <Input
                  placeholder={plRamMin.toString()}
                  variant="flushed"
                  value={minRamValue}
                  onChange={(e) => setRammn(parseInt(e.target.value))}
                  isInvalid={validConfig}
                />
                <Select value={selects} onChange={e => setSelects(parseInt(e.target.value))} variant="flushed" width="75px" alignContent="left">
                  <option value={0}>MB</option>
                  <option value={1}>GB</option>
                </Select>
            </Flex>
            <Flex direction={"row"}>
              <Input
                placeholder={plRamMax.toString()}
                variant="flushed"
                value={maxRamValue}
                onChange={(e) => setRammx(parseInt(e.target.value))}
                isInvalid={validConfig}
              />
              <Select value={selects} onChange={e => setSelects(parseInt(e.target.value))} variant="flushed" width="75px">
                <option value={0}>MB</option>
                <option value={1}>GB</option>
              </Select>
            </Flex>
          </Flex>
        </Flex>
    );
  }
  
  export default function CreateSettings() {
    const [name, setName] = useState(usernameValue);
    const [minRam, setRammn] = useState(minRamValue);
    const [maxRam, setRammx] = useState(maxRamValue);
    const [selects, setSelect] = useState(0);

    return (
      <Container>
        <Flex margin="auto" alignItems="center">
          <ConfigInput
            setUsername={setName}
            username={name}
            minRamValue={minRam}
            maxRamValue={maxRam}
            setRammn={setRammn}
            setRammx={setRammx}
            selects={selects}
            setSelects={setSelect}
          />
        </Flex>
      </Container>
    );
  }