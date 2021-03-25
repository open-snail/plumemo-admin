import { ofType } from 'vue-tsx-support';
import { VAlert as _VAlert } from 'vuetify/lib';

import { Colorable, Transitionable } from '../shared/types';

const VAlert = ofType<Props, Events>().convert(_VAlert);

export { VAlert };
export default VAlert;

type Props = Colorable &
  Transitionable & {
    dismissible?: boolean;
    icon?: string;
    mode?: string;
    origin?: string;
    outline?: boolean;
    type?: 'success' | 'info' | 'warning' | 'error';
    value?: any;
  };

type Events = {
  onInput?: any;
};
