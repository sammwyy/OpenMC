import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LogsProvider from './contexts/logging/logs-provider';
import InstancesProvider from './contexts/instances/instance-provider';
import VersionsProvider from './contexts/versions/versions-provider';

// Components
import TitleBar from './components/titlebar';
import Navbar from './components/navbar';
import DownloadBar from './components/downloadbar';

// Pages
import Main from './screens/main';

import Instances from './screens/instances/instances';
import CreateInstance from './screens/instances/create_instance';

// Theming
import theme from './theme';
import './styles/scroll.css';
import Logs from './screens/logs';

export default function App() {
  return (
    <LogsProvider>
      <InstancesProvider>
        <VersionsProvider>
          <ChakraProvider theme={theme}>
            <Router>
              <TitleBar title="OpenMC" />
              <Navbar />

              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/logs" element={<Logs />} />

                <Route path="/instances" element={<Instances />} />
                <Route path="/instances/create" element={<CreateInstance />} />
              </Routes>

              <DownloadBar />
            </Router>
          </ChakraProvider>
        </VersionsProvider>
      </InstancesProvider>
    </LogsProvider>
  );
}
