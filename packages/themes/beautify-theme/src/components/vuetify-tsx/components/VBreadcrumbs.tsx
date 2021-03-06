import { ofType } from 'vue-tsx-support';
import { VBreadcrumbs } from 'vuetify/lib';

import { Themable } from '../shared/types';

export default ofType<Props, Events, ScopedSlot>().convert(VBreadcrumbs as any);

type Props = Themable & {
  divider?: string;
  justifyCenter?: boolean;
  justifyEnd?: boolean;
  large?: boolean;
  items?: Item[];
};

type Events = {};

type ScopedSlot = {
  item: Item;
};

interface Item {
  text: string;
  disabled?: boolean;
  href?: string;
}
