import type {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

interface ServiceRequestInterceptors<T> {
  requestSuccessFn?: (config: AxiosRequestConfig) => InternalAxiosRequestConfig
  requestFailureFn?: (err: any) => void
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => void
}

export interface ServiceRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: ServiceRequestInterceptors<T>
}
