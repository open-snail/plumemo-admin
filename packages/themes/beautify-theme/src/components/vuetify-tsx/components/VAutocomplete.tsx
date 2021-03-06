import { Component as VueComponent } from 'vue';
import { ofType } from 'vue-tsx-support';
import { VAutocomplete } from 'vuetify/lib';

import { Colorable, Inputable } from '../shared/types';

export default ofType<Props, Events, ScopedSlot>().convert(VAutocomplete);

type Props = Colorable &
  Inputable & {
    items: any[];
    itemText: string | ((value: any) => string);
    multiple?: boolean;
    chips?: boolean;
    required?: boolean;
  };

type Events = {};

type ScopedSlot = {
  selection: Selection;
  item: any;
};

type Selection = {
  parent: VueComponent;
  item: any;
  index: number;
  selected: boolean;
  disabled: boolean;
};
