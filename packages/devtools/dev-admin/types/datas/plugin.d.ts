import { PagerResponse } from './request';

export type PluginsModel = {
  description: string;
  pluginId: string;
  title: string;
  userName: string;
  updateTime: string;
  uid: string;
};

export type PluginsPagerResponse = PagerResponse<PluginsModel>;

export type PluginsPagerQuery = {
  page?: number;
  size?: number;
};

export interface PluginsApi {
  getList(query?: PluginsPagerQuery): Promise<PluginsPagerResponse>;
  downloadPlugin(pluginId?: string): Promise<true>;
  getPluginIdList(): Promise<string[]>;
}
