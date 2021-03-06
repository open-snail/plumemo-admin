import { ofType } from 'vue-tsx-support';
import { VSpeedDial } from 'vuetify/lib';

import { Positionable, Routable, Transitionable } from '../shared/types';

export default ofType<Props, Events>().convert(VSpeedDial as any);

type Props = Positionable &
  Routable &
  Transitionable & {
    direction?: 'top' | 'right' | 'bottom' | 'left';
    mode?: string;
    openOnHover?: boolean;
    value?: any;
  };

type Events = {
  onInput: any;
};
