import '@nuxt/types';

declare global {
  export interface Menu {
    label: string;
    icon?: string;
    to: RawLocation;
    order: number;
    children?: Array<Menu>;
  }

  export type ComponentConfig = Record<string, string | { entry: string; args: Record<string, any> }>;

  export type Widget = {
    title?: string;
    config: ComponentConfig;
    order: number;
  };

  export type Dictionary<T> = Record<string, T>;
}

export {};
