import { ofType } from 'vue-tsx-support';
import { VToolbar } from 'vuetify/lib';

import { Colorable, Denseable, Themable } from '../shared/types';

export default ofType<Props>().convert(VToolbar as any);

type Props = Colorable &
  Denseable &
  Themable & {
    absolute?: boolean;
    app?: boolean;
    card?: boolean;
    tabs?: boolean;
    flat?: boolean;
    scrollOffScreen?: boolean;
    clippedLeft?: boolean;
    clippedRight?: boolean;
    extended?: boolean;
    extensionHeight?: number | string;
    fixed?: boolean;
    floating?: boolean;
    invertedScroll?: boolean;
    manualScroll?: boolean;
    prominent?: boolean;
    scrollTarget?: string;
    scrollThreshold?: number;
    scrollToolbarOffScreen?: boolean;
  };
