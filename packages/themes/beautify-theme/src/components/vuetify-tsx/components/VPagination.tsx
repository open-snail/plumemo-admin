import { ofType } from 'vue-tsx-support';
import { VPagination as _VPagination } from 'vuetify/lib';

import { Themable, Colorable } from '../shared/types';

const VPagination = ofType<Props, Events>().convert(_VPagination);

export { VPagination };
export default VPagination;

type Props = Themable &
  Colorable & {
    circle?: boolean;
    disabled?: boolean;
    length?: number;
    nextIcon?: string;
    prevIcon?: string;
    totalVisible?: string | number;
    value?: number;
    pageAriaLabel?: string;
    currentPageAriaLabel?: string;
    previousAriaLabel?: string;
    nextAriaLabel?: string;
    wrapperAriaLabel?: string;
  };

type Events = {
  onInput: any;
  onPrevious: any;
  onNext: any;
};
