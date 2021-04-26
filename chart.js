const Chart = function({
  width,
  height,
  marginLeft,
  marginBottom,
  xArr,
  yArr,
  valueArr,
  id,
  shape
}) {
  const effectWidth = width - marginLeft
  const effectHeight = height - marginBottom
  const perXLength = effectWidth / xArr.length
  const perYLength = effectHeight / yArr.length

  const canvas = document.getElementById(id)
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  this.drawCoordinateSystem({
    ctx,
    effectWidth,
    height,
    marginLeft,
    marginBottom
  })

  // todo
  // 绘制横向坐标轴
  ctx.save()
  for (let i = 0; i < 6; i++) {
    ctx.translate(0, perYLength)
    ctx.lineWidth = 0.08
    this.drawLine({ ctx: ctx, x0: 0, y0: 0, x1: width, y1:0 })
  }
  ctx.restore()

  // 绘制刻度
  ctx.save()
  for (let i = 0; i < xArr.length + 1; i++) {
    this.drawLine({ ctx: ctx, x0: 0, x1: 0, y0: 0, y1: -5 })
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

    // todo
    if (shape === 'smooth') {
      // const middleX = curPointX + (nextPointX - curPointX) / 2
      // const biggerDigit = nextPointY > curPointY ? nextPointY : curPointY
      // const smallerDigit = nextPointY <= curPointY ? nextPointY : curPointY
      // const middleY = smallerDigit + (biggerDigit - smallerDigit) / 2
      const [middleX, middleY] = getMiddlePoint(curPointX, curPointY, nextPointX, nextPointY)
      console.log('middleX', middleX, 'middleY', middleY)
      const [controlX0, controlY0] = getMiddlePoint(middleX, middleY, curPointX, curPointY)
      const [controlX1, controlY1] = getMiddlePoint(middleX, middleY, nextPointX, nextPointY)
      ctx.beginPath()
      ctx.moveTo(curPointX, curPointY)
      // ctx.lineTo(nextPointX, nextPointY)
      ctx.bezierCurveTo(controlX0, controlY0, controlX1, controlY1, nextPointX, nextPointY)
      ctx.stroke()
      ctx.strokeStyle = '#000'
    } else {
      this.drawLine({ ctx: ctx, x0: curPointX, y0: curPointY, x1: nextPointX, y1: nextPointY })
    }
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

Chart.prototype.drawLine = function ({
  ctx,
  x0,
  y0,
  x1,
  y1
}) {
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.stroke()
  ctx.strokeStyle = '#000'
}

Chart.prototype.drawCoordinateSystem = function({
  ctx,
  effectWidth,
  height,
  marginLeft,
  marginBottom,
}) {
  ctx.scale(1, -1)
  ctx.translate(marginLeft, -height + marginBottom)

  this.drawLine({ ctx, x0: 0, y0: 0, x1: effectWidth, y1: 0 })
  this.drawLine({ ctx, x0: 0, y0: 0, x1: 0, y1: height })
}