import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import InstancesProvider from './contexts/instances/instance-provider';

// Components
import TitleBar from './components/titlebar';
import Navbar from './components/navbar';

// Pages
import Main from './screens/main';

import Instances from './screens/instances/instances';
import CreateInstance from './screens/instances/create_instance';

// Theming
import theme from './theme';

export default function App() {
  return (
    <InstancesProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <TitleBar title="OpenMC" />
          <Navbar />

          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/instances" element={<Instances />} />
            <Route path="/instances/create" element={<CreateInstance />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </InstancesProvider>
  );
}
