import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
// import { ref, reactive, watch } from 'vue'

// create an axios request
const request: AxiosInstance = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10 * 1000 // request timeout，10秒
  // transformResponse: [
  //   (data) => {
  //     // Do whatever you want to transform the data
  //     return JSONbig.parse(data)
  //   }
  // ]
})

// request interceptor
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.url === undefined) {
      config.url = ''
    }
    // do something before request is sen

    const path = config.url.split('?')[0]
    let search = config.url.split('?')[1] || ''

    // 添加时间戳
    search = '?_v=' + Date.now() + (search ? '&' + search : '')
    config.url = path + search
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    if (!res || res.code !== 200) {
      return Promise.reject(res)
    }
    return res
  },
  (error) => {
    console.dir(error)
    return Promise.reject(error)
  }
)

export default request
