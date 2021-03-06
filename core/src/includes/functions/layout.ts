import { Component, AsyncComponent } from 'vue';
import { hasOwn } from '@vue-async/utils';

// Types
import { LayoutFunctions } from 'types/functions/layout';
import { Widget } from 'types/functions/widget';

export const globalLayoutArgs: {
  layouts: Dictionary<Component | AsyncComponent>;
  widgets: Dictionary<Widget[]>;
  templates: Dictionary<Component | AsyncComponent>;
} = {
  layouts: {},
  widgets: {},
  templates: {},
};

const layoutFunctions: LayoutFunctions = {
  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 是否在在布局
   */
  hasLayout(name) {
    return hasOwn(globalLayoutArgs.layouts, name);
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 获取布局
   */

  getLayouts: function (this: LayoutFunctions, name?: string) {
    if (name) {
      return this.hasLayout(name) ? globalLayoutArgs.layouts[name] : null;
    } else {
      return globalLayoutArgs.layouts;
    }
  } as LayoutFunctions['getLayouts'], // 方法重载问题

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 添加布局
   * replace 为 false 时，如而已已在在，则返回 false。否则 undefined
   */
  addLayout(name: string, layout: Component | AsyncComponent, replace = true) {
    if (this.hasLayout(name) && !replace) return false;
    return (globalLayoutArgs.layouts[name] = layout);
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 添加多个布局
   */
  addLayouts(layouts: Record<string, Component | AsyncComponent>, replace = true) {
    Object.keys(layouts).forEach((name: string) => this.addLayout(name, layouts[name], replace));
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 是否在在小部件
   */
  hasWidget(placement: string) {
    return hasOwn(globalLayoutArgs.widgets, placement) && !!globalLayoutArgs.widgets[placement].length;
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 获取小部件
   */
  getWidgets: function (this: LayoutFunctions, placement?: string) {
    if (placement) {
      return this.hasWidget(placement) ? globalLayoutArgs.widgets[placement] : [];
    } else {
      return globalLayoutArgs.widgets;
    }
  } as LayoutFunctions['getWidgets'], // 方法重载问题

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 添加小部件
   */
  addWidgets(placement: string, widgets: Widget | Widget[]) {
    return (globalLayoutArgs.widgets[placement] = (globalLayoutArgs.widgets[placement] || []).concat(widgets));
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 是否在在模版
   */
  hasTemplate(name: string) {
    return hasOwn(globalLayoutArgs.templates, name);
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 获取模版
   */

  getTemplates: function (this: LayoutFunctions, name?: string) {
    if (name) {
      return this.hasTemplate(name) ? globalLayoutArgs.templates[name] : null;
    } else {
      return globalLayoutArgs.templates;
    }
  } as LayoutFunctions['getTemplates'], // 方法重载问题

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 添加模版
   * replace 为 false 时，如而已已在在，则返回 false。否则 undefined
   */
  addTemplate(name: string, template: Component | AsyncComponent, replace = true) {
    if (this.hasLayout(name) && !replace) return false;
    return (globalLayoutArgs.templates[name] = template);
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 添加多个模版
   */
  addTemplates(templates: Record<string, Component | AsyncComponent>, replace = true) {
    Object.keys(templates).forEach((name: string) => this.addTemplate(name, templates[name], replace));
  },

  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 移除模版
   */
  removeTemplates(names: string | string[]) {
    if (typeof names === 'string') {
      names = [names];
    }
    names.forEach((name: string) => {
      if (this.hasTemplate(name)) {
        delete globalLayoutArgs.templates[name];
      }
    });
  },
};

export default layoutFunctions;
