import { ofType } from 'vue-tsx-support';
import { VCombobox } from 'vuetify/lib';

import {
  Colorable,
  CommonEvents,
  Detachable,
  Inputable,
  Loadable,
  Maskable,
  Selectable,
  Themable,
  Validatable,
} from '../shared/types';

export default ofType<Props, Events, ScopedSlots>().convert(VCombobox as any);

type Props = Colorable &
  Detachable &
  Inputable &
  Loadable &
  Themable &
  Maskable &
  Selectable &
  Validatable & {
    allowOverflow?: boolean;
    autoSelectFirst?: boolean;
    cacheItems?: boolean;
    chips?: boolean;
    deletableChips?: boolean;
    dense?: boolean;
    filter?: (item: any, queryText: string, itemText: string) => boolean;
    flat?: boolean;
    hideNoData?: boolean;
    /** Do not display in the select menu items that are already selected */
    hideSelected?: boolean;
    /** Set property of items's avatar value - string | array | function */
    itemAvatar?: string | any[] | Function;
    /** Set property of items's disabled value - string | array | function */
    itemDisabled?: string | any[] | Function;
    itemText?: string | any[] | Function;
    itemValue?: string | any[] | Function;
    items?: any[];
    openOnClear?: boolean;
    returnObject?: boolean;
    smallChips?: boolean;
    valueComparator?: (a: any, b: any) => boolean;
  };

type Events = CommonEvents & {};

type ScopedSlots = {
  item?: any;
  selection?: any;
};
