import React from 'react'

// 错误边界
// https://react.docschina.org/docs/error-boundaries.html

type FallbackRender = (props: {error: Error | null}) => React.ReactElement

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{
  fallbackRender: FallbackRender
}>, {error: Error | null}> {

  state = {
    error: null
  }
  
  // 子组件抛出异常 会接收到异常error
  // 事件处理中抛出的异常，ErrorBoundary是不会捕获到的
  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  render() {
    const { error } = this.state
    const { fallbackRender, children } = this.props
    if (error) {
      return fallbackRender({error})
    }
    return children
  }
}
