import { hasOwn } from '@vue-async/utils';
import POHook from '../classes/hook';

// Types
import { HookResult } from 'types/functions/hook';

const globalFilters = POHook.buildPreinitializedHook({});

function hook(tag: string): HookResult;
function hook(tag: string, functionToAdd: Function, priority?: number, acceptedArgs?: number): void;
function hook(tag: string, functionToAdd?: Function, priority?: number, acceptedArgs?: number): HookResult | void {
  if (functionToAdd) {
    if (!hasOwn(globalFilters, tag)) {
      globalFilters[tag] = new POHook();
    }

    globalFilters[tag].addFilter(functionToAdd, priority, acceptedArgs);
  } else {
    return {
      has(functionToCheck: Function | boolean) {
        if (!hasOwn(globalFilters, tag)) {
          return false;
        }

        return globalFilters[tag].hasFilter(functionToCheck);
      },
      remove(functionToRemove: Function, priority = 10) {
        let removed = false;
        if (hasOwn(globalFilters, tag)) {
          removed = globalFilters[tag].removeFilter(functionToRemove, priority);
        }
        return removed;
      },
      removeAll(priority: boolean | number) {
        if (hasOwn(globalFilters, tag)) {
          globalFilters[tag].removeAllFilters(priority);
        }
      },
      filter<T = unknown, R = T>(value: T, ...args: unknown[]) {
        if (hasOwn(globalFilters, 'all')) {
          // todo:apply tag "all" filter
        }

        if (hasOwn(globalFilters, tag)) {
          return globalFilters[tag].applyFilters<T, R>(value, ...args);
        }

        return Promise.resolve((value as unknown) as R);
      },
      exec(...args: unknown[]) {
        if (hasOwn(globalFilters, tag)) {
          return globalFilters[tag].doAction(...args);
        }
        return Promise.resolve();
      },
    } as HookResult;
  }
}

export default hook;
