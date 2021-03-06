import { http } from '../functions';

// Types
import { OptionsApi } from 'types/datas/options';
import qs from 'qs';

export const optionsApi: OptionsApi = {
  getList(optionsNameList) {
    let keys =  qs.stringify({ keys: optionsNameList }, { arrayFormat: 'repeat' })
    return http.getList(`admin/configs?${keys}`).then(({ models }) => {
      return {
        rows: models,
      };
    });
  },
  update(data) {
    return http.put('admin/configs', data).then(() => true);
  },
};
