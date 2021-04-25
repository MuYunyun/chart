const width = 350
const height = 200
const marginLeft = 20
const marginBottom = 20

const xArr = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun']
const yArr = [0, 50, 100, 150, 200, 250, 300]
const valueArr = [30, 60, 180, 100, 120, 40, 80]

window.onload = () => {
  const chart = new Chart()
  const effectWidth = width - marginLeft
  const effectHeight = height - marginBottom
  const perXLength = effectWidth / xArr.length
  const perYLength = effectHeight / yArr.length

  const drawCoordinateSystem = () => {
    ctx.scale(1, -1)
    ctx.translate(marginLeft, -height + marginBottom)

    chart.drawLine({ ctx: ctx, x0: 0, y0: 0, x1: effectWidth, y1: 0 })
    chart.drawLine({ ctx: ctx, x0: 0, y0: 0, x1: 0, y1: height })
  }
  const canvas = document.getElementById("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  drawCoordinateSystem()

  // 绘制横向坐标轴
  ctx.save()
  for (let i = 0; i < 6; i++) {
    ctx.translate(0, perYLength)
    ctx.lineWidth = 0.08
    chart.drawLine({ ctx: ctx, x0: 0, y0: 0, x1: width, y1:0 })
  }
  ctx.restore()

  // 绘制刻度
  ctx.save()
  for (let i = 0; i < xArr.length + 1; i++) {
    chart.drawLine({ ctx: ctx, x0: 0, x1: 0, y0: 0, y1: -5 })
    ctx.lineWidth = 0.2
    ctx.translate(perXLength, 0)
  }
  ctx.restore()

  // 绘制 x 轴下方文字
  ctx.save()
  ctx.scale(1, -1)
  for (let i = 0; i < xArr.length; i++) {
    ctx.fillStyle = '#000'
    if (i === 0) {
      const textWidth = ctx.measureText(xArr[i])
      ctx.translate(perXLength / 2 - textWidth.width / 2, 15)
    } else {
      ctx.translate(perXLength, 0)
    }
    ctx.fillText(xArr[i], 0, 0)
  }
  ctx.restore()

  // 绘制 y 轴左侧文字
  ctx.save()
  ctx.scale(1, -1)
  ctx.translate(-20, 0)
  for (let i = 0; i < xArr.length; i++) {
    ctx.fillStyle = '#000'
    ctx.fillText(yArr[i], 0, 0)
    ctx.translate(0, -perYLength)
  }
  ctx.restore()

  // 绘制折线
  ctx.save()
  for (let i = 0; i < xArr.length - 1; i++) {
    ctx.fillStyle = '#000'
    const curPointX = (1 / 2 + i) * perXLength
    const curPointY = valueArr[i]
    const nextPointX = (1 / 2 + i + 1) * perXLength
    const nextPointY = valueArr[i + 1]

    chart.drawLine({ ctx: ctx, x0: curPointX, y0: curPointY, x1: nextPointX, y1: nextPointY })
  }
  ctx.restore()

  // 绘制圆
  ctx.save()
  for (let i = 0; i < xArr.length - 1; i++) {
    ctx.fillStyle = '#000'
    const pointX = (1 / 2 + i + 1) * perXLength
    const pointY = valueArr[i + 1]
    ctx.beginPath()
    ctx.arc(pointX, pointY, 2, 0, Math.PI * 2, true)
    ctx.stroke()
  }
  ctx.restore()
}
