import { ofType } from 'vue-tsx-support';
import { VChip as _VChip } from 'vuetify/lib';

import {
  Colorable,
  CommonEvents,
  Disableable,
  Draggable,
  Routable,
  Sizeable,
  Tagable,
  Themable,
} from '../shared/types';

const VChip = ofType<Props, Events>().convert(_VChip as any);

export { VChip };
export default VChip;

type Props = Colorable &
  Routable &
  Draggable &
  Disableable &
  Themable &
  Sizeable &
  Tagable & {
    active?: boolean;
    activeClass?: string;
    close?: boolean;
    closeIcon?: string;
    filter?: boolean;
    filterIcon?: string;
    label?: boolean;
    outline?: boolean;
    pill?: boolean;
    selected?: boolean;
    textColor?: string;
    value?: any;
  };

type Events = CommonEvents & {};
