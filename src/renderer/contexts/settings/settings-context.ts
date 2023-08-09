import React from 'react';
import Settings from 'common/settings';
import SettingsHook from './settings-hook';

const SettingsContext = React.createContext<SettingsHook>({
  settings: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSettings: (settings: Settings): void => {},
});

export default SettingsContext;
