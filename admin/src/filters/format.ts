import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export const numberFormat = function (value: number) {
  if (!value) {
    return '0';
  }
  return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
};

export const dateFormat = function (value: moment.MomentInput, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return value ? moment(value).format(pattern) : '';
};

export const timeFromNow = function (value: moment.MomentInput, pattern = 'YYYY-MM-DD HH:mm:ss') {
  moment.locale('zh-cn')
  return value ? moment(value).fromNow() : '';
};