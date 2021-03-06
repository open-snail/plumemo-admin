import { ofType } from 'vue-tsx-support';
import { VDataTable } from 'vuetify/lib';

import { Themable } from '../shared/types';

export default ofType<Props, Events, ScopedSlots>().convert(VDataTable as any);

type Props = Themable & {
  customFilter?: (items: object[], search: string, filter: any) => any[];
  customSort?: (items: object[], index: number, isDescending: boolean) => any[];
  disableInitialSort?: boolean;
  expand?: boolean;
  filter?: (val: object, search: string) => boolean;
  headerKey?: string;
  headerText?: string;
  headers?: Header[];
  headersLength?: number;
  hideActions?: boolean;
  hideHeaders?: boolean;
  itemKey?: string;
  items?: any[];
  loading?: boolean | string;
  mustSort?: boolean;
  nextIcon?: string;
  noDataText?: string;
  noResultsText?: string;
  pagination?: Pagination;
  pagination_sync?: Pagination;
  prevIcon?: string;
  rowsPerPageItems?: any[];
  rowsPerPageText?: string;
  search?: any;
  selectAll?: boolean | string;
  sortIcon?: string;
  totalItems?: number;
  value?: any[];
  on?: {
    'update:pagination'?: (pagination: Pagination) => void;
    [key: string]: any;
  };
};

type Events = {
  onInput: any;
};

type ScopedSlots = {
  headerCell?: {
    header: Header;
  };
  headers?: {
    all: boolean;
    headers: Header[];
    indeterminate: boolean;
  };
  items: {
    item: any;
    index: number;
  };
  pageText?: {
    itemsLength: number;
    pageStart: number;
    pageStop: number;
  };
};

type Pagination = {
  descending?: boolean;
  page?: number;
  rowsPerPage?: number;
  sortBy?: string;
  totalItems?: number;
};

type Header = {
  text: string;
  value: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  class?: string[] | string;
  width?: string;
};
