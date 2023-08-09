import { PropsWithChildren, useEffect, useState } from 'react';

import Settings from 'common/settings';
import { loadSettings, saveSettings } from 'renderer/services/settings.service';
import useLogs from 'renderer/hooks/useLogs';
import VersionsContext from './settings-context';

export default function SettingsProvider({ children }: PropsWithChildren) {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [firstLoad, setFirstLoad] = useState(true);
  const logger = useLogs();

  useEffect(() => {
    loadSettings()
      // eslint-disable-next-line promise/always-return
      .then((loadedSettings: Settings) => {
        setSettings(loadedSettings);
        setFirstLoad(true);
      })
      .catch(logger.crit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (settings && !firstLoad) {
      saveSettings(settings);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <VersionsContext.Provider
      value={{
        setSettings,
        settings,
      }}
    >
      {children}
    </VersionsContext.Provider>
  );
}
