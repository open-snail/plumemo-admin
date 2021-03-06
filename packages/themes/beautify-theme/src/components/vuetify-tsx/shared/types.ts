import { RouterLinkProps } from 'vue-tsx-support/options/enable-vue-router';

export type Colorable = {
  color?: string;
};

export type Denseable = {
  dense?: boolean;
};

export type Tagable = {
  tag?: string;
};

export type Roundable = {
  rounded?: boolean;
  tile?: boolean;
};

export type Draggable = {
  draggable?: boolean;
};

export type Detachable = {
  attach?: any;
  contentClass?: string;
  menuProps?: any;
};

export type Disableable = {
  disabled?: boolean;
};

export type CommonEvents = {
  onBlur: any;
  onChange: any;
  onClick: any;
  onInput: any;
  onKeyup: any;
  onKeydown: any;
};

export type Inputable = {
  appendIcon?: string;
  /** @deprecated */
  appendIconCb?: Function;
  autofocus?: boolean;
  backgroundColor?: string;
  box?: boolean;
  browserAutocomplete?: string;
  clearable?: boolean;
  clearIcon?: string;
  clearIconCb?: Function;
  counter?: boolean | string | number;
  disabled?: boolean;
  fullWidth?: boolean;
  height?: number | string;
  hideDetails?: boolean;
  hint?: string;
  label?: string;
  outline?: boolean;
  persistentHint?: boolean;
  placeholder?: string;
  prefix?: string;
  prependIcon?: string;
  prependInnerIcon?: string;
  prependInnerIconCb?: Function;
  /** @deprecated */
  prependIconCb?: Function;
  readonly?: boolean;
  /** Reverses the input orientation. */
  reverse?: boolean;
  singleLine?: boolean;
  /** Bound when using the autocomplete prop. Use the .sync modifier to catch user input from the autocomplete search input */
  searchInput?: any;
  solo?: boolean;
  soloInverted?: boolean;
  suffix?: string;
  type?: any;
  value?: any;
};

export type Imageable = {
  alt?: string;
  contain?: boolean;
  cover?: boolean;
  gradient?: string;
  lazySrc?: string;
  position?: string;
  sizes?: string;
  src?: string | SrcObject;
  srcset?: string;
};

export interface SrcObject {
  src: string;
  srcset?: string;
  lazySrc: string;
  aspect: number;
}

export type Loadable = {
  loading?: boolean | string;
};

export type Maskable = {
  dontFillMaskBlanks?: boolean;
  mask?: string | object;
  returnMaskedValue?: boolean;
};

export type Measurable = {
  aspectRatio?: string;
  height?: string | number;
  width?: string | number;
  maxHeight?: string | number;
  maxWidth?: string | number;
};

export type Positionable = {
  absolute?: boolean;
  fixed?: boolean;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
};

export type Rippleable = {
  ripple?: boolean | object;
};

export type Routable = Rippleable &
  Partial<RouterLinkProps> & {
    href?: string | object;
    tag?: string;
    target?: string;
    nuxt?: boolean;
  };

export type Selectable = {
  id?: string;
  inputValue?: any;
  falseValue?: any;
  trueValue?: any;
  multiple?: boolean;
  label?: string;
};

export type Sizeable = {
  size?: string | number;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  xLarge?: boolean;
};

export type Themable = {
  dark?: boolean;
  light?: boolean;
};

export type Transitionable = {
  mode?: string;
  origin?: string;
  transition?: boolean | string;
};

export type Validatable = {
  error?: boolean;
  errorCount?: number | string;
  errorMessages?: string | string[];
  messages?: string | string[];
  rules?: ((...args: any[]) => boolean | string)[];
  success?: boolean;
  successMessages?: string | string[];
  validateOnBlur?: boolean;
};
