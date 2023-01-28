import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const styles = {
  global: (props) => ({
    body: {
      bg: mode('#FFFFFF', '#121212')(props),
    },
  }),
};

const components = {
  Drawer: {
    baseStyle: (props) => ({
      dialog: {
        bg: mode('#FFFFFF', '#121212')(props),
      },
    }),
  },
};

const theme = extendTheme({
  components,
  styles,
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export default theme;
