import { ofType } from 'vue-tsx-support';
import { VAvatar } from 'vuetify/lib';

import { Colorable, Measurable, Roundable } from '../shared/types';

export default ofType<Props>().convert(VAvatar as any);

type Props = Colorable &
  Roundable &
  Measurable & {
    left?: boolean;
    right?: boolean;
    size?: number | string;
  };
