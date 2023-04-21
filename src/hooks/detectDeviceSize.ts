import { reactive } from 'vue';
interface deviceInfo {
  isMobile: Boolean;
  isPc: Boolean;
  size: String;
  // 权重
  deviceCnt: Number;
}
export const useDetectDeviceSize = (): deviceInfo => {
  let device = reactive({
    isMobile: false,
    isPc: false,
    size: '',
    // 权重
    deviceCnt: 0,
  });
  function formatDevice() {
    const width = window.innerWidth;
    if (width <= 600) {
      device.size = 'xs';
      device.isMobile = true;
      device.isPc = false;
      device.deviceCnt = 0;
    } else if (width <= 960) {
      device.size = 'sm';
      device.isMobile = false;
      device.isPc = false;
      device.deviceCnt = 1;
    } else if (width <= 1264) {
      device.size = 'md';
      device.isMobile = false;
      device.isPc = true;
      device.deviceCnt = 2;
    } else if (width <= 1904) {
      device.size = 'lg';
      device.isMobile = false;
      device.isPc = true;
      device.deviceCnt = 3;
    } else {
      device.size = 'xl';
      device.isMobile = false;
      device.isPc = true;
      device.deviceCnt = 4;
    }
  }
  formatDevice()
  window.addEventListener('resize', formatDevice);
  return device;
};
