import Vue from 'vue';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { store } from '@/store';
import { ACCESS_TOKEN } from '@/config/proLayoutConfigs';
import settingsFuncs from './settings';
import hook from './hooks';

// Types
import { HttpInstance, Response } from 'types/functions/http';

/**
 * @author Hubert
 * @since 2020-09-04
 * @version 0.0.1
 * http factory（内部接口使用）
 * baseURL 从配置中得到
 * timeout 10s
 */
const instance = axios.create({
  baseURL: settingsFuncs.getApiPath(),
  timeout: 10000,
}) as HttpInstance;

/**
 * 用于区分返回类型
 */
instance.getList = instance.get;

/**
 * default interceptor
 */

// request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return hook('pre_request')
      .exec(config)
      .then(() => {
        const token = Vue.ls.get(ACCESS_TOKEN);
        if (token) {
          config.headers['Authorization'] = token; //`Bearer ${token}`; // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
        return config;
      });
  },
  (err: AxiosError) => {
    return hook('request_error')
      .exec(err)
      .then(() => {
        if (err.response) {
          const data = err.response.data;
          const token = Vue.ls.get(ACCESS_TOKEN);
          if (err.response.status === 403) {
            // notification.error({
            //   message: 'Forbidden',
            //   description: data.message,
            // });
          }
          if (err.response.status === 401 && !(data.result && data.result.isLogin)) {
            // notification.error({
            //   message: 'Unauthorized',
            //   description: 'Authorization verification failed',
            // });
            if (token) {
              store.dispatch('user/logout').then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              });
            }
          }
        }
        return Promise.reject(err);
      });
  },
);

// response interceptor
instance.interceptors.response.use(
  (resp: AxiosResponse<Response<any>>) => {
    return hook('pre_response')
      .exec(resp)
      .then(() => {
        const data = resp.data;
        if (!data.success) {
          // notification.error({
          //   message: res.message || 'Error',
          //   duration: 3,
          // });
          return Promise.reject(new Error(data.message || 'Error'));
        } else {
          return data;
        }
      });
  },
  (err: AxiosError) => {
    return hook('response_error')
      .exec(err)
      .then(() => {
        if (err.response) {
          const data = err.response.data;
          const token = Vue.ls.get(ACCESS_TOKEN);
          if (err.response.status === 403) {
            // notification.error({
            //   message: 'Forbidden',
            //   description: data.message,
            // });
          }
          if (err.response.status === 401 && !(data.result && data.result.isLogin)) {
            // notification.error({
            //   message: 'Unauthorized',
            //   description: 'Authorization verification failed',
            // });
            if (token) {
              store.dispatch('Logout').then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1500);
              });
            }
          }
        } else if (err.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          if (err.message === 'Network Error') {
            const config = err.config;
            if (config && config.retry) {
              // Set the variable for keeping track of the retry count
              config.__retryCount = config.__retryCount || 0;

              // Check if we've maxed out the total number of retries
              if (config.__retryCount < config.retry) {
                // Increase the retry count
                config.__retryCount += 1;

                // Create new promise to handle exponential backoff.
                // formula(2 ^ c - 1 / 2) * 1000(for mS to seconds)
                const backoff = new Promise((resolve) => {
                  const backOffDelay = config.retryDelay ? (1 / 2) * (Math.pow(2, config.__retryCount!) - 1) * 1000 : 1;
                  setTimeout(() => {
                    resolve();
                  }, backOffDelay);
                });

                // Return the promise in which recalls axios to retry the request
                return backoff.then(() => {
                  return instance(config);
                });
              }
            }
          }
        }
        // Compatible server-side custom error
        if (!err.isAxiosError) {
          const error = (err.response && err.response.data) || {};
          err.code = error.resultCode || 500;
          err.message = error.message || 'System error!';
        }
        return Promise.reject(err);
      });
  },
);

export default instance;
