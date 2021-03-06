import { ofType } from 'vue-tsx-support';
import { VProgressCircular } from 'vuetify/lib';

import { Colorable, Themable } from '../shared/types';

export default ofType<Props>().convert(VProgressCircular as any);

type Props = Colorable &
  Themable & {
    indeterminate?: boolean;
    rotate?: number;
    size?: number | string;
    value?: any;
    width?: number;
  };
