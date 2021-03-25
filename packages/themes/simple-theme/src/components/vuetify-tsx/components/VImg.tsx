import { ofType } from 'vue-tsx-support';
import { VImg as _VImg } from 'vuetify/lib';

import { Measurable, Themable } from '../shared/types';

const VImg = ofType<Props>().convert(_VImg);

export { VImg };
export default VImg;

type Props = Measurable &
  Themable & {
    alt?: string;
    aspectRatio?: string;
    contain?: boolean;
    src?: string;
    lazySrc?: string;
    gradient?: string;
    eager?: boolean;
    options?: Record<string, any>;
    position?: string;
    srcset?: string;
    sizes?: string;
  };
