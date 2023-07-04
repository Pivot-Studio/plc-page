import { Ref, ref } from 'vue';
import DeviceDetector from 'device-detector-js';

type osType = 'linux' | 'windows' | 'apple' | 'other';

const deviceDetector = new DeviceDetector();

export const useDetectDeviceType = () => {
  const deviceType = ref<osType>('other');
  const useAgent = navigator.userAgent;
  const name = deviceDetector.parse(useAgent).os?.name;
  if (name === 'Mac') {
    deviceType.value = 'apple';
  } else if (name?.includes('Windows')) {
    deviceType.value = 'windows';
  } else if (name?.includes('Linux') || name?.includes('Debian') || name?.includes('Ubuntu')) {
    deviceType.value = 'linux';
  }
  return deviceType;
};
