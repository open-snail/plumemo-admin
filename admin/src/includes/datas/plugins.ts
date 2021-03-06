import { http } from '../functions';

import { PluginsApi, PluginsModel } from 'types/datas/plugin';

function formatPlugin(plugin: any): PluginsModel {
  const { description, title, pluginId, userName, updateTime, uid, avatar } = plugin;
  return Object.assign({
    description,
    title,
    pluginId,
    userName,
    updateTime,
    avatar,
    uid,
  });
}

export const pluginApi: PluginsApi = {
  /**
   * 获取插件列表 @todo 待优化
   *
   * @param param
   */
  getList({ page = 1, size = 10, ...rest } = {}) {
    return http
      .getList('/admin/modules/plumemo-plugins', { params: { page, size, ...rest } })
      .then(({ models, pageInfo }) => {
        return {
          rows: models.map((plugin) => formatPlugin(plugin)),
          pager: pageInfo!,
        };
      });
  },
  /**
   * 下载插件
   *
   * @param pluginId
   */
  downloadPlugin(pluginId) {
    return http.post(`admin/modules/download/plugin/${pluginId}`).then(() => true);
  },
  /**
   * 获取安装的插件id列表
   */
  getPluginIdList() {
    return http.getList(`admin/modules/plugin-ids`).then(({ models }) => {
      return models;
    });
  },
  /**
   * 获取已安装的插件列表
   */
  getInstalledPluginList({ page = 1, size = 10, ...rest } = {}) {
    return http.getList(`admin/modules/installed`, { params: { page, size, ...rest } }).then(({ models, pageInfo }) => {
      return {
        rows: models,
        pager: pageInfo!,
      };
    });
  },
  /**
   * 启动插件
   */
  startPlugin(pluginId) {
    return http.post(`admin/modules/start/${pluginId}`).then(() => true);
  },
  /**
   * 停用插件
   */
  stopPlugin(pluginId) {
    return http.post(`admin/modules/stop/${pluginId}`).then(() => true);
  },
  /**
   * 卸载插件
   */
  unload(pluginId) {
    return http.post(`admin/modules/unload/${pluginId}`).then(() => true);
  },
};
