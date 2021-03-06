export type ComponentConfig = Record<string, string | { entry: string; args: Record<string, any> }>;

export type Widget = {
  title?: string;
  config: ComponentConfig;
  order: number;
};
