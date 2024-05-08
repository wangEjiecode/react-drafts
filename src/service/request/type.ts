import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// 规定命名 和 类型
interface ServiceRequestInterceptors<T> {
  requestSuccessFn?: (config: AxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => void
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => void
}

// 继承 AxiosRequestConfig
export interface ServiceRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  // 添加 interceptor 属性
  interceptors?: ServiceRequestInterceptors<T>
}
