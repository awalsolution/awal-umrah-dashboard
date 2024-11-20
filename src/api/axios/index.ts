import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import { router } from '@src/router';
import { axiosConfig } from '@src/api/axios/config';
import { ResponseStatusCode } from '@src/api/axios/statusCode';
import { ACCESS_TOKEN, TENANT_API_KEY } from '@src/utils/storage/variables';
import { storage } from '@src/utils/storage';
import { useEnv } from '@src/hooks/useEnv';
const { centralDomain } = useEnv();

class Request {
  instance: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (req: InternalAxiosRequestConfig) => {
        const { url } = req;
        if (storage.isAuthenticated(ACCESS_TOKEN) && url) {
          req.headers.Authorization = storage.getAuthorization(ACCESS_TOKEN);
        }

        if (window.location.hostname !== centralDomain) {
          req.headers['X-Tenant-Api-Key'] = storage.getTenantApiKey(TENANT_API_KEY);
        }
        return req;
      },
      (err: AxiosError) => Promise.reject(err)
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data;
      },
      (err: AxiosError) => {
        const { response } = err;
        const { data, status } = response || {};
        if (response) {
          Request.handleCode(status as number, data as string);
        }
        // if (!window.navigator.onLine) {
        //   router.replace('/404');
        //   window.toast('error', 'Error Message', 'Network Error');
        // }
        return Promise.reject(data);
      }
    );
  }

  static handleCode(code: number, msg: any): void {
    // const errorMessage = errorMessageMap.get(code) || 'Unknown Error!';
    switch (code) {
      case ResponseStatusCode.UNAUTHORIZED:
        storage.remove(ACCESS_TOKEN);
        window.toast('error', 'Error Message', msg.message);
        if (router.currentRoute.value.path !== '/login') {
          if (router.currentRoute.value.path !== '/') {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.value.fullPath
              }
            });
          } else {
            router.replace('/login');
          }
        }
        break;
      case ResponseStatusCode.FORBIDDEN:
        window.toast('error', 'Error Message', msg.message);
        break;
      case ResponseStatusCode.INTERNAL_SERVER_ERROR:
        window.toast('error', 'Error Message', msg.message);
        break;
      case ResponseStatusCode.BAD_GATEWAY:
        window.toast('error', 'Error Message', msg.message);
        break;
      case ResponseStatusCode.GATEWAY_TIMEOUT:
        window.toast('error', 'Error Message', msg.message);
        if (router.currentRoute.value.path !== '/login') {
          router.replace('/error/500');
        }
        break;
      case ResponseStatusCode.BAD_REQUEST:
        window.toast('error', 'Error Message', msg.message);
        break;
      case ResponseStatusCode.NOT_FOUND:
        window.toast('error', 'Error Message', msg.message);
        break;
      case ResponseStatusCode.METHOD_NOT_ALLOWED:
        window.toast('error', 'Error Message', msg.message);
        break;
      case ResponseStatusCode.CONFLICT:
        window.toast('error', 'Error Message', msg.message);
        break;
      case ResponseStatusCode.TOO_MANY_REQUESTS:
        window.toast('error', 'Error Message', msg.message);
        break;
      default:
        window.toast('error', 'Error Message', msg.message);
    }
  }

  request(config: AxiosRequestConfig) {
    return this.instance.request(config);
  }

  get<T>(url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, { params, ...config });
  }

  post<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  put<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  delete<T>(
    url: string,
    params?: Record<string, unknown>,
    config?: AxiosRequestConfig
  ): Promise<T> {
    return this.instance.delete(url, { params, ...config });
  }

  patch<T>(url: string, data?: Record<string, unknown>, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}

export default new Request(axiosConfig);
