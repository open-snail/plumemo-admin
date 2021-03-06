import { http } from '../functions';

// Types
import { DashboardApi } from 'types/datas/dashboard';

export const dashboardApi: DashboardApi = {
  getPostsQuantityTotal(query?: any) {
    return http.get('admin/dashboard/posts/quantity', { params: query });
  },
  getSystem(query?: any) {
    return http.get('admin/dashboard/system/info', { params: query });
  },
  getUsersQuantityTotal(query?: any) {
    return http.get('admin/dashboard/user/quantity', { params: query });
  }
};
