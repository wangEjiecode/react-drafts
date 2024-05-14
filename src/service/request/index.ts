import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { ServiceRequestConfig } from './type'

/**
 * 1. 拦截器精细控制
 *  全局拦截器
 *  实例拦截器
 *  单次请求拦截器
 *
 * 2. 响应结果的类型处理（泛型）
 */

class ServiceRequest {
  instance: AxiosInstance // 实例是 axios 配置类型

  constructor(config: ServiceRequestConfig) {
    this.instance = axios.create(config)
    // 为每一个 instance 添加一个拦截器
    // 请求时的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    // 响应时的拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
        return err
      }
    )

    // 判断 增加 特定的拦截器
    if (config.interceptors) {
      this.instance.interceptors.request.use(
        config.interceptors.requestSuccessFn,
        config.interceptors.requestFailureFn
      )
      this.instance.interceptors.response.use(
        config.interceptors.responseSuccessFn,
        config.interceptors.responseFailureFn
      )
    }
  }

  // 封装网络请求方法
  request<T = any>(config: ServiceRequestConfig<T>) {
    // 回调 拦截器
    if (config.interceptors?.requestSuccessFn) {
      config = config.interceptors.requestSuccessFn(config)
    }
    return new Promise<T>((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseSuccessFn) {
            res = config.interceptors.responseSuccessFn(res)
          }
          resolve(res)
        })
        .catch((err) => reject(err))
    })
  }

  get<T = AxiosResponse>(config: ServiceRequestConfig<T>) {
    return this.request({ ...config, method: 'GET' })
  }
  post<T = AxiosResponse>(config: ServiceRequestConfig<T>) {
    return this.request({ ...config, method: 'POST' })
  }
}

export default ServiceRequest
