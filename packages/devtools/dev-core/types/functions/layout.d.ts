import { Component, AsyncComponent } from 'vue';
import { Widget } from './widget';

export interface LayoutFunctions {
  hasLayout(name: string): boolean;
  getLayouts(): Record<string, Component | AsyncComponent>;
  getLayouts(name: string): Component | AsyncComponent | null;
  addLayout(name: string, layout: Component | AsyncComponent, replace?: boolean): Component | AsyncComponent | false;
  addLayouts(layouts: Record<string, Component | AsyncComponent>, replace?: boolean): void;
  hasWidget(placement: string): boolean;
  getWidgets(): Record<string, Widget[]>;
  getWidgets(placement: string): Widget[];
  addWidgets(placement: string, widgets: Widget | Widget[]): Widget[];
  hasTemplate(name: string): boolean;
  getTemplates(): Record<string, Component | AsyncComponent>;
  getTemplates(name: string): Component | AsyncComponent | null;
  addTemplate(
    name: string,
    template: Component | AsyncComponent,
    replace?: boolean,
  ): Component | AsyncComponent | false;
  addTemplates(templates: Record<string, Component | AsyncComponent>, replace?: boolean): void;
  removeTemplates(names: string | string[]): void;
}
