import { ofType } from 'vue-tsx-support';
import { VAppBar as _VAppBar, VAppBarNavIcon as _VAppBarNavIcon } from 'vuetify/lib';

import { Colorable, Themable, Denseable, Roundable, Tagable, Measurable, CommonEvents } from '../shared/types';

const VAppBar = ofType<AppBarProps>().convert(_VAppBar);
const VAppBarNavIcon = ofType<{}, CommonEvents>().convert(_VAppBarNavIcon);

export { VAppBar, VAppBarNavIcon };
export default {
  // eslint-disable-next-line @typescript-eslint/camelcase
  $_vuetify_subcomponents: {
    VAppBar,
    VAppBarNavIcon,
  },
};

type AppBarProps = Measurable &
  Themable &
  Colorable &
  Denseable &
  Roundable &
  Tagable & {
    app?: boolean;
    absolute?: boolean;
    bottom?: boolean;
    clippedLeft?: boolean;
    clippedRight?: boolean;
    collapse?: boolean;
    collapseOnScroll?: boolean;
    elevateOnScroll?: boolean;
    elevation?: string | number;
    extended?: boolean;
    extensionHeight?: number | string;
    fadeImgOnScroll?: boolean;
    fixed?: boolean;
    flat?: boolean;
    floating?: boolean;
    hideOnScroll?: boolean;
    invertedScroll?: boolean;
    outlined?: boolean;
    prominent?: boolean;
    rounded?: boolean;
    scrollOffScreen?: boolean;
    scrollTarget?: string;
    scrollThreshold?: string | number;
    shaped?: boolean;
    short?: boolean;
    shrinkOnScroll?: boolean;
    src?: string | Record<string, any>;
  };
