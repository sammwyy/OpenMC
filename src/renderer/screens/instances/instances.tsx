import { Box, Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Container from 'renderer/components/container';
import Sidebar from 'renderer/components/sidebar';
import useInstances from 'renderer/hooks/useInstances';

interface InstanceItemProps {
  name?: string;
  icon: string;
}

function InstanceItem({ name, icon }: InstanceItemProps) {
  return (
    <Box textAlign="center" width="80px" height="80px">
      <Image src={icon} height="75%" width="75%" margin="auto" />
      <Text bg="#1F1F1F" fontSize="14px" mt="5px">
        {name}
      </Text>
    </Box>
  );
}

export default function Instances() {
  const { instances } = useInstances();

  return (
    <Container>
      <Box width="calc(100% - 250px)" padding="0 30px">
        <Flex
          mb="25px"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text fontWeight="bold" fontSize="22px">
            Instances ({instances.length})
          </Text>

          <Button as={Link} to="/instances/create">
            Create
          </Button>
        </Flex>

        <SimpleGrid minChildWidth="80px" spacingX="15px" spacingY="65px">
          {instances.map((instance, index) => (
            <InstanceItem
              key={index}
              name={instance.name}
              icon={instance.icon}
            />
          ))}
        </SimpleGrid>
      </Box>
      <Sidebar />
    </Container>
  );
}

/*
<InstanceItem
            name="Fabric 1.19.3"
            icon="https://avatars.githubusercontent.com/u/21025855?s=280&v=4"
          />

          <InstanceItem
            name="Forge 1.19.2"
            icon="data:image/jpeg;base64,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"
          />

          <InstanceItem
            name="LabyMod 3 1.8.9"
            icon="https://www.labymod.net/page/tpl/assets/images/logo_main.png"
          />

          <InstanceItem
            name="OptiFine 1.8.8 HD U I7"
            icon="https://pbs.twimg.com/profile_images/1336182241613938689/MabYhp8e_400x400.jpg"
          />

          <InstanceItem
            name="Pixelmon Modpack 1.16.5"
            icon="https://media.forgecdn.net/avatars/thumbnails/279/234/64/64/637276853291457748.png"
          />

          <InstanceItem
            name="Quillt 1.19.3"
            icon="https://external-preview.redd.it/2bbdfwDGw30FSGW53ubRnPjzxbIvH0HNJddXvOmky-w.jpg?width=640&crop=smart&auto=webp&s=972d987d03d773c7c8d3259f9c20b3601f7ac810"
          />

          <InstanceItem
            name="SkyFactory 4 1.12.2"
            icon="
            https://media.forgecdn.net/avatars/thumbnails/199/573/64/64/636907930795697123.png"
          />

          <InstanceItem
            name="Speedrun 1.16.1"
            icon="https://cdn.modrinth.com/data/9F1CjeiE/icon.png"
          />

          <InstanceItem
            name="Vanilla 1.19.3"
            icon="https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png"
          />

          <InstanceItem
            name="Snapshot 23w04a"
            icon="https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/25/Warped_Nylium_JE1_BE1.png"
          />
*/
