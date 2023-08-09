import Settings from 'common/settings';

export default interface SettingsHook {
  settings: Settings | null;
  setSettings: (settings: Settings) => void;
}
