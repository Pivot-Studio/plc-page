import { Ref, ref } from 'vue';

type osType = 'linux' | 'windows' | 'apple' | 'other';



function getOS(): osType {
  const userAgent = window.navigator.userAgent,

    platform = (window.navigator as any)?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os:osType = 'other';

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'apple';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'other';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'windows';
  } else if (/Android/.test(userAgent)) {
    os = 'other';
  } else if (/Linux/.test(platform)) {
    os = 'linux';
  }

  return os;
}

export const useDetectDeviceType = () => {
  const deviceType = ref<osType>(getOS());
  return deviceType;
};
