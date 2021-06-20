## react-fiber

1. 对react原理的了解
2. 对新技术的敏感程度 求知欲

为了使react渲染的过程可以中断，可以将控制权交还给浏览器, 可以让位给高优先级的任务，浏览器空闲后再恢复渲染

2.如何判断当前是否有高优任务
  给一个合理的执行时间，当超过这个执行时间 如果任务仍然没有完成 中断当前任务 将控制权交还给浏览器

  requestIdleCallback()

  浏览器**有空的时候**执行这个回调

  * 浏览器在一帧内要做的事情 (剩下的时间就是空闲时间)
  处理用户输入事件
  js执行
  requestAnimation调用
  布局 layout
  绘制 paint


## 高阶组件 HOC
 1. 属性代理
      操作props
      操作实例
 2. 继承/劫持 (劫持点击事件)
    handleClick() {
      super.onClick()
      console.log("劫持方法")
    }
    render() {
      parent = super.render()

      return React.cloneElement(parent, {
        onClick: () => this.handleClick()
      })
    }

## hooks
1. 不能在条件语句中使用 【防止取值时 游标偏移 state错位】




