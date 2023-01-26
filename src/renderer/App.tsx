import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import TitleBar from './components/titlebar';
import Navbar from './components/navbar/Navbar';

import Main from './screens/main';

import theme from './theme';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <TitleBar title="OpenMC" />
        <Navbar />

        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
