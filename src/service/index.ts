import ServiceRequest from './request'
import { BASE_URL, TIME_OUT } from './config'

const serviceRequest = new ServiceRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})

export default serviceRequest
