import { ofType } from 'vue-tsx-support';
import { VIcon } from 'vuetify/lib';

import { Colorable, Disableable, Positionable, Sizeable, Themable } from '../shared/types';

export default ofType<Props>().convert(VIcon as any);

type Props = Colorable & Disableable & Themable & Positionable & Sizeable & {};
