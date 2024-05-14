// vite default env: import.meta.env

let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = ''
} else BASE_URL = 'https://api.sampleapis.com/'

export { BASE_URL }
export const TIME_OUT = 100000
