import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './screens/main';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}
