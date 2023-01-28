import { extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';
import { StepsTheme as Steps } from 'chakra-ui-steps';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  components: {
    Steps,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('#FFF', '#121212')(props),
      },
    }),
  },
});

export default theme;
