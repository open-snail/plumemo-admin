import { Context } from '@nuxt/types';
import { Component } from 'vue';

export type Callback = {
  func: Function;
  acceptedArgs: number;
};

export type HookResult = {
  has(functionToCheck?: Function | boolean): Function | boolean;
  remove(functionToRemove: Function, priority?: number): boolean;
  removeAll(priority: boolean | number): void;
  filter<T = unknown, R = T>(value: T, ...args: unknown[]): Promise<R>;
  exec(...args: unknown[]): Promise<void>;
};

export interface HookFunction {
  (tag: string): HookResult;
  (tag: string, functionToAdd: Function, priority?: number, acceptedArgs?: number): void;
}

/** hooks params */

// init hook
export interface InitContext extends Context {
  // no-empty-interface
  __hookInitContext: '';
}

// layout hook
export type DefaultLayouts = {
  rootWarp: string | Component;
  mainWarp: string | Component;
  header: string | Component;
  footer: string | Component;
};

export type FullScreenLayouts = Pick<DefaultLayouts, 'rootWarp' | 'mainWarp'>;
