import { PagerResponse } from './request';

export interface DashboardApi {
  getPostsQuantityTotal(query?: any): Promise<any>;
  getSystem(query?: any): Promise<any>;
  getUsersQuantityTotal(query?: any): Promise<any>;
}
