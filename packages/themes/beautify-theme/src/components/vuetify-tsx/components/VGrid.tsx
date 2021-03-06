import { ofType } from 'vue-tsx-support';
import {
  VContainer as _VContainer,
  VRow as _VRow,
  VCol as _VCol,
  VSpacer as _VSpacer,
  VFlex as _VFlex,
} from 'vuetify/lib';

import { Denseable, Tagable } from '../shared/types';

const VContainer = ofType<ContainerProps>().convert(_VContainer);
const VRow = ofType<RowProps>().convert(_VRow);
const VCol = ofType<ColProps>().convert(_VCol);
const VSpacer = ofType().convert(_VSpacer);
const VFlex = ofType<FlexProps>().convert(_VFlex);

export { VContainer, VRow, VCol, VSpacer, VFlex };

export default {
  // eslint-disable-next-line @typescript-eslint/camelcase
  $_vuetify_subcomponents: {
    VContainer,
    VRow,
    VCol,
    VSpacer,
    VFlex,
  },
};

type ContainerProps = {
  fillHeight?: boolean;
  fluid?: boolean;
};
type Alignment = 'start' | 'end' | 'center';

type AlignItems = Alignment | 'baseline' | 'stretch';
type AlignContent = Alignment | 'space-between' | 'space-around' | 'stretch';
type Justify = Alignment | 'space-between' | 'space-around';

type AlignProps = {
  align?: AlignItems;
  'align-sm'?: AlignItems;
  'align-md'?: AlignItems;
  'align-lg'?: AlignItems;
  'align-xl'?: AlignItems;
};

type AlignContentProps = {
  'align-content'?: AlignContent;
  'align-content-sm'?: AlignContent;
  'align-content-md'?: AlignContent;
  'align-content-lg'?: AlignContent;
  'align-content-xl'?: AlignContent;
};

type JustifyProps = {
  justify?: Justify;
  'justify-sm'?: Justify;
  'justify-md'?: Justify;
  'justify-lg'?: Justify;
  'justify-xl'?: Justify;
};

type RowProps = Denseable &
  AlignProps &
  AlignContentProps &
  JustifyProps &
  Tagable & {
    noGutters?: boolean;
  };

type BreakpointsProps = {
  sm?: boolean | string | number;
  md?: boolean | string | number;
  lg?: boolean | string | number;
  xl?: boolean | string | number;
};

type OffsetProps = {
  offset?: string | number;
  'offset-sm'?: string | number;
  'offset-md'?: string | number;
  'offset-lg'?: string | number;
  'offset-xl'?: string | number;
};

type OrderProps = {
  order?: string | number;
  'order-sm'?: string | number;
  'order-md'?: string | number;
  'order-lg'?: string | number;
  'order-xl'?: string | number;
};

type ColProps = BreakpointsProps &
  OffsetProps &
  OrderProps &
  Tagable & {
    cols?: boolean | string | number;
    alignSelf?: 'auto' | AlignItems;
  };

interface FlexProps {
  xs1?: boolean;
  xs2?: boolean;
  xs3?: boolean;
  xs4?: boolean;
  xs5?: boolean;
  xs6?: boolean;
  xs7?: boolean;
  xs8?: boolean;
  xs9?: boolean;
  xs10?: boolean;
  xs11?: boolean;
  xs12?: boolean;

  sm1?: boolean;
  sm2?: boolean;
  sm3?: boolean;
  sm4?: boolean;
  sm5?: boolean;
  sm6?: boolean;
  sm7?: boolean;
  sm8?: boolean;
  sm9?: boolean;
  sm10?: boolean;
  sm11?: boolean;
  sm12?: boolean;

  md1?: boolean;
  md2?: boolean;
  md3?: boolean;
  md4?: boolean;
  md5?: boolean;
  md6?: boolean;
  md7?: boolean;
  md8?: boolean;
  md9?: boolean;
  md10?: boolean;
  md11?: boolean;
  md12?: boolean;

  lg1?: boolean;
  lg2?: boolean;
  lg3?: boolean;
  lg4?: boolean;
  lg5?: boolean;
  lg6?: boolean;
  lg7?: boolean;
  lg8?: boolean;
  lg9?: boolean;
  lg10?: boolean;
  lg11?: boolean;
  lg12?: boolean;
}
