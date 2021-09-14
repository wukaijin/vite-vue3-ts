import { watchEffect } from 'vue';
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler
} from 'axios'
import { toRefs, reactive, ToRefs } from 'vue'
import axiosIns from '../utils/request'

type standardResponce = {
  code: number
  msg: string
  data: unknown
}

interface requestState {
  loading: boolean
  result: any
  cancel: Canceler | null
  error: AxiosError | null
}

// TODO 节流，防抖

// type customOptionsKey = 'manual'
type CustomOptions<T> = {
  manual?: boolean
  defaultResult?: T | null
} & AxiosRequestConfig

type RequestReturn = ToRefs<requestState> &
  Record<'request', () => Promise<AxiosResponse<standardResponce>>>

export const useRequest = <T>(
  url: string,
  options: CustomOptions<T> = {}
): RequestReturn => {
  const state = reactive<requestState>({
    loading: false,
    result: options.defaultResult || null,
    cancel: null,
    error: null
  })
  const request = () => {
    state.loading = true
    return axiosIns(url, {
      ...options,
      cancelToken: new axios.CancelToken(c => {
        state.cancel = c
      })
    })
      .then(res => {
        state.result = res
        return res
      })
      .catch(err => {
        state.error = err
        return Promise.reject(err)
      })
      .finally(() => {
        state.loading = false
      })
  }
  if (!options.manual) request()

  watchEffect(() => {
    if (!options.manual) request()
  })

  return {
    ...toRefs(state),
    request
  }
}

// export default useRequest
