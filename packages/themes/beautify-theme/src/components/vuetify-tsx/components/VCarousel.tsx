import { ofType } from 'vue-tsx-support';
import { VCarousel } from 'vuetify/lib';

import { Themable } from '../shared/types';

export default ofType<Props, Events>().convert(VCarousel as any);

type Props = Themable & {
  cycle?: boolean;
  delimiterIcon?: string;
  hideControls?: boolean;
  hideDelimiters?: boolean;
  interval?: string | number;
  nextIcon?: string | boolean;
  prevIcon?: string | boolean;
  value?: number;
};

type Events = {
  onInput: any;
};
