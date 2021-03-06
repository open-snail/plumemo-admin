import { ofType } from 'vue-tsx-support';
import { VFooter } from 'vuetify/lib';

import { CommonEvents } from '../shared/types';

export default ofType<Props, CommonEvents>().convert(VFooter as any);

type Props = {
  app?: boolean;
  height?: string | number;
  inset?: boolean;
  padless?: boolean;
  tag?: string;
};
