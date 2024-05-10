import ServiceRequest from '@/service'

export function getCountryList() {
  return ServiceRequest.get({
    url: '/countries/countries',
  })
}
