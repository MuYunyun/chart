const Chart = function({
  id,
  width,
  height,
  marginLeft = 0,
  marginBottom = 0,
  marginTop = 0,
  xArr,
  yArr,
  valueArr,
  shape,
  mode,
  geom = 'line',
  coord = 'normal'
}) {
  const effectWidth = width - marginLeft
  const effectHeight = height - marginBottom - marginTop
  const perXLength = effectWidth / xArr.length
  const perYLength = effectHeight / yArr.length

  const canvas = document.getElementById(id)
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)

  if (coord === 'normal') {
    this.drawCoordinateSystem({
      ctx,
      effectWidth,
      height,
      marginLeft,
      marginBottom
    })

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

    if (geom === 'line') {
      // 绘制折线/曲线
      ctx.save()
      for (let i = 0; i < xArr.length - 1; i++) {
        ctx.fillStyle = '#000'
        const curPointX = (1 / 2 + i) * perXLength
        const curPointY = valueArr[i]
        const nextPointX = (1 / 2 + i + 1) * perXLength
        const nextPointY = valueArr[i + 1]

        if (shape === 'smooth') {
          const [middleX, middleY] = getMiddlePoint(curPointX, curPointY, nextPointX, nextPointY)
          const [controlX0, controlY0] = getMiddlePoint(middleX, middleY, curPointX, curPointY)
          const [controlX1, controlY1] = getMiddlePoint(middleX, middleY, nextPointX, nextPointY)
          ctx.beginPath()
          ctx.lineTo(curPointX, curPointY)
          // this value will be affectd by the coordinate value
          const offset = 8
          // ![](http://with.muyunyun.cn/d5afa118ee64691e35d17c1aba8b070e.jpg)
          if (nextPointY > curPointY) {
            ctx.bezierCurveTo(controlX0 + offset, controlY0 - offset, controlX1 - offset, controlY1 + offset, nextPointX, nextPointY)
          } else {
            ctx.bezierCurveTo(controlX0 + offset, controlY0 + offset, controlX1 - offset, controlY1 - offset, nextPointX, nextPointY)
          }
          ctx.stroke()
          ctx.strokeStyle = '#000'
        } else {
          this.drawLine({ ctx: ctx, x0: curPointX, y0: curPointY, x1: nextPointX, y1: nextPointY })
        }
      }
      ctx.restore()

      // 绘制面积
      if (mode === 'fill') {
        ctx.beginPath()
        ctx.moveTo((1 / 2) * perXLength, 0)
        ctx.lineTo((1 / 2) * perXLength, valueArr[0])

        for (let i = 0; i < xArr.length; i++) {
          const curPointX = (1 / 2 + i) * perXLength
          const curPointY = valueArr[i]
          const nextPointX = (1 / 2 + i + 1) * perXLength
          const nextPointY = valueArr[i + 1]
          if (shape === 'smooth') {
            const [middleX, middleY] = getMiddlePoint(curPointX, curPointY, nextPointX, nextPointY)
            const [controlX0, controlY0] = getMiddlePoint(middleX, middleY, curPointX, curPointY)
            const [controlX1, controlY1] = getMiddlePoint(middleX, middleY, nextPointX, nextPointY)
            ctx.lineTo(curPointX, curPointY)
            // this value will be affectd by the coordinate value
            const offset = 8
            // ![](http://with.muyunyun.cn/d5afa118ee64691e35d17c1aba8b070e.jpg)
            if (nextPointY > curPointY) {
              ctx.bezierCurveTo(controlX0 + offset, controlY0 - offset, controlX1 - offset, controlY1 + offset, nextPointX, nextPointY)
            } else {
              ctx.bezierCurveTo(controlX0 + offset, controlY0 + offset, controlX1 - offset, controlY1 - offset, nextPointX, nextPointY)
            }
          } else {
            ctx.lineTo(curPointX, curPointY)
          }
        }
        ctx.lineTo((1 / 2 + xArr.length - 1) * perXLength, 0)
        const gradient = ctx.createLinearGradient(0, 0, 0, 300)
        gradient.addColorStop(0, 'green');
        gradient.addColorStop(.5, 'cyan');
        gradient.addColorStop(1, 'green');
        // ctx.fillStyle = 'red'
        ctx.fillStyle = gradient
        ctx.fill()
      }

      // 绘制圆点
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
    } else if (geom === 'interval') {
      ctx.save()
      const defaultGap = 10
      for (let i = 0; i < xArr.length; i++) {
        const curPointX = i * perXLength
        ctx.fillStyle = '#1790ff'
        ctx.fillRect(curPointX + defaultGap, 0, perXLength - 2 * defaultGap, valueArr[i])
        ctx.fill()
      }
      ctx.restore()
    }
  } else if (coord === 'polar') {
    // todo
  }
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