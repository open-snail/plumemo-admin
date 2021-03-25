import { ofType } from 'vue-tsx-support';
import {
  VCard as _VCard,
  VCardTitle as _VCardTitle,
  VCardSubtitle as _VCardSubtitle,
  VCardText as _VCardText,
  VCardActions as _VCardActions,
} from 'vuetify/lib';

import { Colorable, Disableable, Measurable, Rippleable, Roundable, Routable, Tagable } from '../shared/types';

const VCard = ofType<CardProps>().convert(_VCard as any);
const VCardTitle = ofType().convert(_VCardTitle as any);
const VCardSubtitle = ofType().convert(_VCardSubtitle as any);
const VCardText = ofType().convert(_VCardText as any);
const VCardActions = ofType().convert(_VCardActions as any);

export { VCard, VCardTitle, VCardSubtitle, VCardText, VCardActions };
export default {
  // eslint-disable-next-line @typescript-eslint/camelcase
  $_vuetify_subcomponents: {
    VCard,
    VCardTitle,
    VCardSubtitle,
    VCardText,
    VCardActions,
  },
};

type CardProps = Colorable &
  Disableable &
  Measurable &
  Rippleable &
  Roundable &
  Tagable &
  Routable & {
    hover?: boolean;
    img?: string;
    loaderHeight?: string | number;
    loading?: boolean;
    outlined?: boolean;
    raised?: boolean;
    shaped?: boolean;
  };
