import { ofType } from 'vue-tsx-support';
import { VTextField } from 'vuetify/lib';

import {
  Colorable,
  CommonEvents,
  Denseable,
  Disableable,
  Inputable,
  Maskable,
  Measurable,
  Themable,
  Validatable,
} from '../shared/types';

export default ofType<Props, Events>().convert(VTextField as any);

type Props = Colorable &
  Denseable &
  Disableable &
  Inputable &
  Maskable &
  Measurable &
  Themable &
  Validatable & {
    appendOuterIcon?: Function;
    /** @deprecated */
    appendOuterIconCb?: Function;
    autofocus?: boolean;
    box?: boolean;
    browserAutocomplete?: string;
    clearIcon?: string;
    clearIconCb?: Function;
    clearable?: boolean;
    counter?: boolean | number | string;
    flat?: boolean;
    fullWidth?: boolean;
    loading?: boolean | string;
    outline?: boolean;
    name?: string;
    placeholder?: string;
    prefix?: string;
    prependInnerIcon?: string;
    /** @deprecated */
    prependInnerIconCb?: Function;
    required?: boolean;
    reverse?: boolean;
    singleLine?: boolean;
    solo?: boolean;
    soloInverted?: boolean;
    suffix?: string;
    /** @deprecated */
    textarea?: boolean;
    type?: string;
  };

type Events = CommonEvents;
