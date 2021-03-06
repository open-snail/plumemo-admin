import { ofType } from 'vue-tsx-support';
import { VForm } from 'vuetify/lib';

import { CommonEvents } from '../shared/types';

export default ofType<Props, CommonEvents>().convert(VForm as any);

type Props = {
  'lazy-validation'?: boolean;
  value?: boolean;
};
