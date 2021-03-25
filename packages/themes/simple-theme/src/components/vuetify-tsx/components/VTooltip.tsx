import { ofType } from 'vue-tsx-support';
import { VTooltip } from 'vuetify/lib';

import { Positionable } from '../shared/types';

export default ofType<Props>().convert(VTooltip as any);

type Props = Positionable & {};
