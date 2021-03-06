import { ofType } from 'vue-tsx-support';
import { VSheet as _VSheet } from 'vuetify/lib';

import { Colorable, Themable, Roundable, Measurable, Tagable } from '../shared/types';

const VSheet = ofType<Props>().convert(_VSheet as any);
export { VSheet };
export default VSheet;

type Props = Colorable &
  Themable &
  Roundable &
  Measurable &
  Tagable & {
    outlined?: boolean;
    shaped?: boolean;
  };
