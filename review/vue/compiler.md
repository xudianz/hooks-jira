## compiler
1. 将template解析为ast语法树
2. 标记是否为静态节点static (模版中是否有用到了数据) 递归标记 (diff时直接跳过不用比对)
   组件 插槽不是静态节点 static -> false
3. 生成代码
  code = ast ? genElement(ast, state) : '_c("div")'
  <!-- _c('div', [_c('span', [_v("hello world")])]) -->
  render = `width(this){ return ${code} }`