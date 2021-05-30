import { useCallback, useState } from "react"
import { useMountedRef } from "utils"

interface State<D> {
  error: Error | null,
  data: D | null,
  stat: 'idle' | 'loading' | 'error' | 'success' 
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

const defaultConfig = {
  throwOnError: false
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [ state, setState ] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const mountedRef = useMountedRef()
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback((data: D) => {
    setState({
      data,
      error: null,
      stat: 'success'
    })
  }, [])

  const setError = useCallback((error: Error) => {
    setState({
      data: null,
      error,
      stat: 'error'
    })
  }, [])

  const run = useCallback((promise: Promise<D>, runConfig?: {retry: () => Promise<D>}) => {
    if (!promise || !promise.then) {
      throw new Error('请传入promise类型数据')
    }
    // 保存上一次的 run(promise)
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })

    // setState({...state, stat: 'loading' })
    // state作为依赖是  用函数修改state
    setState(prevState => ({...prevState, stat: "loading"}))

    return promise
    .then(data => {
      // 组件卸载 不设置状态
      if (mountedRef.current) setData(data)
      return data
    }).catch(err => {
      setError(err)
      if (config.throwOnError) return Promise.reject(err)
      return err
    })
  }, [setData, mountedRef, config.throwOnError, setError ]) // state
  
  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    run,
    setData,
    setError,
    retry,
    ...state
  }
}