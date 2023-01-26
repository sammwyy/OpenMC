import { extendTheme } from '@chakra-ui/react';
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
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
