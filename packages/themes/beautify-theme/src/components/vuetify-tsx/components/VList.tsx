import { ofType } from 'vue-tsx-support';
import {
  VList as _VList,
  VListItem as _VListItem,
  VListGroup as _VListGroup,
  VListItemAction as _VListItemAction,
  VListItemActionText as _VListItemActionText,
  VListItemAvatar as _VListItemAvatar,
  VListItemContent as _VListItemContent,
  VListItemGroup as _VListItemGroup,
  VListItemIcon as _VListItemIcon,
  VListItemSubtitle as _VListItemSubtitle,
  VListItemTitle as _VListItemTitle,
} from 'vuetify/lib';

import {
  Measurable,
  Colorable,
  Denseable,
  Tagable,
  Roundable,
  Themable,
  Routable,
  Disableable,
  Rippleable,
} from '../shared/types';

const VList = ofType<ListProps>().convert(_VList);
const VListItem = ofType<ListItemProps, ListItemEvents>().convert(_VListItem);
const VListGroup = ofType<ListGroupProps>().convert(_VListGroup);
const VListItemAction = ofType().convert(_VListItemAction);
const VListItemActionText = ofType().convert(_VListItemActionText);
const VListItemAvatar = ofType<ListItemAvatarProps>().convert(_VListItemAvatar);
const VListItemContent = ofType().convert(_VListItemContent);
const VListItemGroup = ofType<Colorable>().convert(_VListItemGroup);
const VListItemIcon = ofType().convert(_VListItemIcon);
const VListItemSubtitle = ofType().convert(_VListItemSubtitle);
const VListItemTitle = ofType().convert(_VListItemTitle);

export {
  VList,
  VListItem,
  VListGroup,
  VListItemAction,
  VListItemActionText,
  VListItemAvatar,
  VListItemContent,
  VListItemGroup,
  VListItemIcon,
  VListItemSubtitle,
  VListItemTitle,
};
export default {
  // eslint-disable-next-line @typescript-eslint/camelcase
  $_vuetify_subcomponents: {
    VList,
    VListItem,
    VListGroup,
    VListItemAction,
    VListItemActionText,
    VListItemAvatar,
    VListItemContent,
    VListItemGroup,
    VListItemIcon,
    VListItemSubtitle,
    VListItemTitle,
  },
};

type ListProps = Measurable &
  Colorable &
  Denseable &
  Themable &
  Tagable &
  Roundable &
  Disableable & {
    elevation?: string | number;
    expand?: boolean;
    flat?: boolean;
    nav?: boolean;
    outlined?: boolean;
    rounded?: boolean;
    shaped?: boolean;
    subheader?: boolean;
    twoLine?: boolean;
    threeLine?: boolean;
  };

type ListItemProps = Colorable &
  Denseable &
  Themable &
  Tagable &
  Routable &
  Rippleable &
  Disableable & {
    inactive?: boolean;
    inputValue?: any;
    link?: boolean;
    selectable?: boolean;
    twoLine?: boolean;
    threeLine?: boolean;
    value?: any;
  };

type ListItemEvents = {
  onClick?: any;
  onKeydown?: any;
};

type ListGroupProps = Rippleable &
  Disableable & {
    activeClass?: string;
    appendIcon?: string;
    color?: string;
    eager?: boolean;
    group?: string;
    lazy?: boolean;
    noAction?: boolean;
    prependIcon?: string;
    subGroup?: boolean;
    value?: any;
  };

type ListItemAvatarProps = Measurable &
  Colorable &
  Roundable & {
    horizontal?: boolean;
    left?: boolean;
    right?: boolean;
    rounded?: boolean;
    size: string | number;
  };
