# Rules

> QT(question tree)是标准答案的 Render Tree，AT（answer tree）用户提交的 Render Tree

+ z-index 不比较数值，只比较大小
+ AT/QT attr 的不一致
  + AT 允许多余的 attr
  + 只检查宽关键的 attr？如：alt，placeholder，checked，type，target，name...
+ min/max-width 先不考虑
+ flex 暂且相等好了
+ grid 暂不考虑
+ list-style 样式也要特殊处理
+ 暂不考虑伪元素了伪类

需要配置指定值

+ box-size
+ display

**rect 应该比较相对位置**

# TODO

只考察叶子节点位置即可？叶子节点位置信息的权重最高？对于可见的元素才需要判断位置？
