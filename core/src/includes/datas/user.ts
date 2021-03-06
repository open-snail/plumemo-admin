import { http } from '../functions';

// Types
import { UserApi } from 'types/datas/user';

export const userApi: UserApi = {
  /**
   * @author Hubert
   * @since 2020-09-04
   * @version 0.0.1
   * 获取用户信息
   */
  getInfo() {
    return http.get('users/master').then(({ model = {} }) => model);
  },
};
