import { ofType } from 'vue-tsx-support';
import { VMenu } from 'vuetify/lib';

import { Detachable, Disableable, Positionable, Themable, Transitionable } from '../shared/types';

export default ofType<Props>().convert(VMenu as any);

type Props = Detachable &
  Disableable &
  Positionable &
  Themable &
  Transitionable & {
    allowOverflow?: boolean;
    auto?: boolean;
    closeDelay?: number | string;
    closeOnClick?: boolean;
    closeOnContentClick?: boolean;
    fullWidth?: boolean;
    inputActivator?: boolean;
    lazy?: boolean;
    maxHeight?: number | string;
    maxWidth?: number | string;
    minWidth?: number | string;
    nudgeBottom?: number | string;
    nudgeLeft?: number | string;
    nudgeRight?: number | string;
    nudgeTop?: number | string;
    offsetOverflow?: boolean;
    offsetX?: boolean;
    offsetY?: boolean;
    openDelay?: number | string;
    openOnClick?: boolean;
    openOnHover?: boolean;
    origin?: string;
    positionX?: number;
    positionY?: number;
    returnValue?: any;
    value?: any;
    zIndex?: number | string;
  };
