import InstanceSettings from './instance-settings';

export default interface Instance {
  name: string;
  settings: InstanceSettings;
  icon: string;
  launching: boolean;
}
