// vite 默认提供的环境变量 import.meta.env

let BASE_URL = ''
// 判断环境
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.prod.com:8000'
} else BASE_URL = 'http://codercba.com:9002'

// 也可以在 .env 文件中配置
// console.log(import.meta.env.VITE_NAME)

export { BASE_URL }
export const TIME_OUT = 100000
