import axios, { AxiosError, AxiosRequestConfig, Canceler, AxiosPromise } from 'axios'
import { toRefs, reactive, ToRefs } from 'vue'
import axiosIns from '../utils/request'

type requestState = {
  loading: boolean
  result: null | unknown
  cancel: Canceler | null
  error: AxiosError | null
}

// TODO 节流，防抖
// type customOptionsKey = 'manual'

type CustomOptions = {
  manual?: boolean
} & AxiosRequestConfig

export const useRequest = (
  url: string,
  options: CustomOptions
): ToRefs<requestState> & Record<'request', () => Promise<void>> => {

  const state = reactive<requestState>({
    loading: false,
    result: null,
    cancel: null,
    error: null
  })
  const request= ()  => {
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
        return err
      })
      .finally(() => {
        state.loading = false
      })
  }
  if (!options.manual) request()
  return {
    ...toRefs(state),
    request
  }
}

// export default useRequest
