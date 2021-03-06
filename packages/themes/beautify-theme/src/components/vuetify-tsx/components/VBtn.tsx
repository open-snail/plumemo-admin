import { ofType } from 'vue-tsx-support';
import { RouterLinkProps } from 'vue-tsx-support/options/enable-vue-router';
import { VBtn } from 'vuetify/lib';

import { Colorable, Themable } from '../shared/types';

export default ofType<Props, Events>().convert(VBtn as any);

type Props = Colorable &
  Themable &
  Partial<RouterLinkProps> & {
    absolute?: boolean;
    block?: boolean;
    bottom?: boolean;
    depressed?: boolean;
    disabled?: boolean;
    fab?: boolean;
    fixed?: boolean;
    flat?: boolean;
    href?: string | object;
    icon?: boolean;
    inputValue?: any;
    large?: boolean;
    left?: boolean;
    nuxt?: boolean;
    outline?: boolean;
    right?: boolean;
    ripple?: boolean;
    round?: boolean;
    target?: string;
    loading?: boolean;
    small?: boolean;
    top?: boolean;
    type?: 'button' | 'submit';
    value?: any;
  };

type Events = {
  onClick: any;
};
