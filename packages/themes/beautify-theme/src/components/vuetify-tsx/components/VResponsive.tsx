import { ofType } from 'vue-tsx-support';
import { VResponsive } from 'vuetify/lib';

import { Measurable } from '../shared/types';

export default ofType<Props>().convert(VResponsive as any);

type Props = Measurable;
