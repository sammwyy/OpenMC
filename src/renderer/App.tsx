import { createLocalStorageManager } from '@chakra-ui/color-mode';
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
import Settings from './screens/settings';

// Theming
import Logs from './screens/logs';
import theme from './theme';
import './styles/scroll.css';

export default function App() {
  const manager = createLocalStorageManager('color-mode');
  return (
    <LogsProvider>
      <InstancesProvider>
        <VersionsProvider>
          <ChakraProvider theme={theme} colorModeManager={manager}>
            <Router>
              <TitleBar title="OpenMC" />
              <Navbar />
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/logs" element={<Logs />} />

                <Route path="/instances" element={<Instances />} />
                <Route path="/instances/create" element={<CreateInstance />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>

              <DownloadBar />
            </Router>
          </ChakraProvider>
        </VersionsProvider>
      </InstancesProvider>
    </LogsProvider>
  );
}
