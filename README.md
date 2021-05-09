# Chart

本仓库参考 [前端都是手写ECharts](https://juejin.cn/post/6950684708443258894) 一文学习、使用 canvas 进行绘制图表。

当前封装绘制`折线图`、`曲线图`、`面积图`、`雷达图`。相应 API 使用如下:

| 属性         | 说明             | 类型                       | 默认值 |
| :----------- | :--------------- | :------------------------- | :----- |
| id           | 元素节点位置     | string                     |        |
| width        | 宽度             | number                     |        |
| height       | 高度             | number                     |        |
| marginLeft   | 左间距           | number                     | 0      |
| marginBottom | 下间距           | number                     | 0      |
| marginTop    | 上间距           | number                     | 0      |
| xArr         | 水平方向节点坐标 | number[]                   |        |
| yArr         | 垂直方向节点坐标 | number[]                   |        |
| valueArr     | 值坐标           | number[]                   |        |
| shape        | 线条类型         | 'normal' \| 'smooth(光滑)' | normal |
| mode         | 模式             | 'normal' \| 'fill(填充)'   | normal |
| geom         | 几何类型         | 'line' \| 'interval'       | line   |
| coord        | 坐标系类型       | 'normal' \| 'polar'        | normal |

### todoList

- [x] 支持折线图
- [x] 支持面积图
- [x] 支持柱状图
- [x] 支持雷达图
- [ ] 处理巨形数据
