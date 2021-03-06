import Vue from 'vue';
import enquireJs from 'enquire.js';

export enum DeviceType {
  Desktop = 'desktop',
  Tablet = 'tablet',
  Mobile = 'mobile',
}

// screen and (max-width: 1087.99px)
const queries = {
  [DeviceType.Desktop]: 'screen and (min-width: 1200px)',
  [DeviceType.Tablet]: 'screen and (min-width: 576px) and (max-width: 1199px)',
  [DeviceType.Mobile]: 'screen and (max-width: 576px)',
};

type Data = {
  device: string;
};

type Methods = {
  isMobile: () => boolean;
  isDesktop: () => boolean;
  isTablet: () => boolean;
};

export default Vue.extend<Data, Methods, {}>({
  provide() {
    return {
      isMobile: this.isMobile,
      isTablet: this.isTablet,
      isDesktop: this.isDesktop,
    };
  },
  data() {
    return {
      device: DeviceType.Desktop,
    };
  },
  methods: {
    isMobile() {
      return this.device === DeviceType.Mobile;
    },
    isDesktop() {
      return this.device === DeviceType.Desktop;
    },
    isTablet() {
      return this.device === DeviceType.Tablet;
    },
  },
  mounted() {
    enquireJs
      .register(queries[DeviceType.Mobile], () => (this.device = DeviceType.Mobile))
      .register(queries[DeviceType.Tablet], () => (this.device = DeviceType.Tablet))
      .register(queries[DeviceType.Desktop], () => (this.device = DeviceType.Desktop));
  },
  beforeDestroy() {
    enquireJs.unregister(queries[DeviceType.Mobile]);
    enquireJs.unregister(queries[DeviceType.Tablet]);
    enquireJs.unregister(queries[DeviceType.Desktop]);
  },
});
