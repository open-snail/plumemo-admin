import { ofType } from 'vue-tsx-support';
import { VTabs } from 'vuetify/lib';

import { Colorable, Routable, Themable } from '../shared/types';

export default ofType<Props, Events>().convert(VTabs as any);

type Props = Colorable &
  Routable &
  Themable & {
    alignWithTitle?: boolean;
    centered?: boolean;
    fixedTabs?: boolean;
    grow?: boolean;
    height?: number | string;
    hideSlider?: boolean;
    iconsAndText?: boolean;
    mandatory?: boolean;
    max?: number | string;
    showArrows?: boolean;
    value?: string | number;
    sliderColor?: string;
  };

interface Events {
  onInput: string | number;
}
