import { hasOwn, warn, isObject } from '@vue-async/utils';

// Types
import { Callback } from 'types/functions/hook';

// function sortBy(name: string, order: 'ASC' | 'DESC' = 'ASC') {
//   return function(o: Dictionary<any>, p: Dictionary<any>) {
//     let a, b;
//     if (typeof o === 'object' && typeof p === 'object' && o && p) {
//       a = o[name];
//       b = p[name];
//       if (a === b) {
//         return 0;
//       }
//       if (typeof a === typeof b) {
//         const result = a < b ? -1 : 1;
//         return order === 'DESC' ? ~result + 1 : result;
//       }
//       const result = typeof a < typeof b ? -1 : 1;
//       return order === 'DESC' ? ~result + 1 : result;
//     } else {
//       throw 'error';
//     }
//   };
// }

export default class POHook {
  static buildPreinitializedHook(filters: Dictionary<InstanceType<typeof POHook> | Record<number, Callback[]>>) {
    const normalized: Dictionary<InstanceType<typeof POHook>> = {};

    for (const tag in filters) {
      const filter = filters[tag];
      if (isObject(filter) && filter instanceof POHook) {
        normalized[tag] = filter;
        continue;
      }

      const hook = new POHook();
      for (const priority in filter) {
        const cbs = filter[priority] as Callback[];
        cbs.forEach((cb: Callback) => {
          hook.addFilter(cb.func, (priority as unknown) as number, cb.acceptedArgs);
        });
      }

      normalized[tag] = hook;
    }

    return normalized;
  }

  private callbacks: { [priority: number]: Callback[] } = {};
  private doingAction = false;

  get filters() {
    return this.callbacks;
  }

  /**
   * Check if any filter has been registered
   * @since
   *
   */
  public hasFilter(functionToCheck: Function | boolean = false): Function | boolean {
    const funcs = Object.entries(this.callbacks).reduce((prev, [_priority, callbacks]) => {
      return prev.concat(callbacks);
    }, [] as Callback[]);

    if (typeof functionToCheck === 'boolean') {
      return funcs.length > 0;
    } else {
      const cb = funcs.find(({ func }) => func === functionToCheck);
      return cb ? cb.func : false;
    }
  }

  /**
   * Add filter
   * @since
   *
   */
  public addFilter(callback: Function, priority = 10, acceptedArgs = 1): void {
    if (!hasOwn(this.callbacks, priority as any)) {
      this.callbacks[priority] = [];
    }

    this.callbacks[priority].push({
      func: callback,
      acceptedArgs,
    });
  }

  /**
   * Remove filter
   * @since
   *
   */
  public removeFilter(functionToRemove: Function, priority = 10): boolean {
    if (hasOwn(this.callbacks, priority as any)) {
      const index = this.callbacks[priority].findIndex(({ func }) => func === functionToRemove);
      index >= 0 && this.callbacks[priority].splice(index, 1);
      return index >= 0;
    } else {
      return false;
    }
  }

  /**
   * Remove filter
   * @since
   *
   */
  public removeAllFilters(priority: boolean | number = false) {
    if (typeof priority === 'boolean') {
      this.callbacks = {};
    } else if (hasOwn(this.callbacks, priority as any)) {
      this.callbacks[priority] = [];
    } else {
      warn(process.env.NDE_ENV === 'production', `priority "${priority}" is not exists , no filiters will be removed.`);
    }
  }

  public applyFilters<T = unknown, R = T>(value: T, ...args: unknown[]): Promise<R> {
    const sortFuncs = Object.entries(this.callbacks)
      .sort(([a], [b]) => (a === b ? 0 : a < b ? -1 : 1))
      .reduce((prev, [_priority, callbacks]) => prev.concat(callbacks), [] as Callback[]);

    if (sortFuncs.length) {
      const _doingAction = this.doingAction;

      return new Promise((resolve) => exec(0, value, resolve));

      // eslint-disable-next-line no-inner-declarations
      function exec(index: number, value: unknown, resolve: (result: any) => void) {
        const cb = sortFuncs[index];
        if (!_doingAction) {
          args.unshift(value);
        }
        const result = cb.func.apply(null, args.slice(0, cb.acceptedArgs));
        if (index === sortFuncs.length - 1) {
          result instanceof Promise ? result.then(resolve) : resolve(result);
        } else if (result instanceof Promise) {
          result.then((val) => exec(index + 1, val, resolve));
        } else {
          exec(index + 1, result, resolve);
        }
      }
    }

    return Promise.resolve((value as unknown) as R);
  }

  public doAction(...args: unknown[]) {
    this.doingAction = true;
    return new Promise<void>((resolve, reject) => {
      this.applyFilters('', ...args).then(() => {
        //
        this.doingAction = false;
        resolve();
      }, reject);
    });
  }
}
