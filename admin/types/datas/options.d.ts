import { PagerQuery, PagerResponse } from './request';

export interface OptionsApi {
    getList(query?: any): Promise<any>;
    update(data: any): Promise<true>;
  }
  