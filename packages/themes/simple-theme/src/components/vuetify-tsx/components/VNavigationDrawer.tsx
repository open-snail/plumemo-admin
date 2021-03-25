import { ofType } from 'vue-tsx-support';
import { VNavigationDrawer as _VNavigationDrawer } from 'vuetify/lib';

import { Themable, Colorable, Tagable } from '../shared/types';

const VNavigationDrawer = ofType<Props, Events>().convert(_VNavigationDrawer);

export { VNavigationDrawer };
export default VNavigationDrawer;

type Props = Themable &
  Colorable &
  Tagable & {
    absolute?: boolean;
    app?: boolean;
    clipped?: boolean;
    disableResizeWatcher?: boolean;
    disableRouteWatcher?: boolean;
    fixed?: boolean;
    floating?: boolean;
    height?: number | string;
    hideOverlay?: boolean;
    miniVariant?: boolean;
    miniVariantWidth?: number | string;
    mobileBreakPoint?: number | string;
    permanent?: boolean;
    right?: boolean;
    src?: string;
    stateless?: boolean;
    temporary?: boolean;
    touchless?: boolean;
    value?: any;
    width?: number | string;
  };

type Events = {
  onInput: any;
};
