/**
 * 修改 axios response 的返回 为 response.data 的内容
 */
import { AxiosInterceptorManager, AxiosRequestConfig, AxiosResponse } from 'axios';
import { PagerInfo } from '../datas/request';

// response from server
export interface Response<T> {
  success: boolean;
  message: string;
  resultCode: string;
  model: T;
}

// response from server
export interface PagerResponse<T> extends Omit<Response<T>, 'model'> {
  models: Array<T>;
  pageInfo?: PagerInfo;
}

export interface HttpInterceptorManager<V> extends AxiosInterceptorManager<V> {
  use<R = V>(onFulfilled?: (value: V) => R | Promise<R>, onRejected?: (error: any) => any): number;
}

export interface HttpInstance {
  <T = any, R = Response<T> | PagerResponse<T>>(config: AxiosRequestConfig): Promise<R>;
  <T = any, R = Response<T> | PagerResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;

  defaults: AxiosRequestConfig;
  interceptors: {
    request: HttpInterceptorManager<AxiosRequestConfig>;
    response: HttpInterceptorManager<AxiosResponse>;
  };

  getUri(config?: AxiosRequestConfig): string;
  request<T = any, R = Response<T> | PagerResponse<T>>(config: AxiosRequestConfig): Promise<R>;
  get<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  getList<T = any, R = PagerResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>; // 区分 get 返回值，避免调用时的类型转换
  delete<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  head<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  options<T = any, R = Response<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
  post<T = any, R = Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  put<T = any, R = Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
  patch<T = any, R = Response<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}
