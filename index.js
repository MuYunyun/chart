const width = 350
const height = 200
const marginLeft = 20
const marginBottom = 20

const xArr = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun']
const yArr = [0, 50, 100, 150, 200, 250, 300]
const valueArr = [30, 60, 180, 100, 120, 40, 80]

window.onload = () => {
  const createLine = (x0, y0, x1, y1) => {
    ctx.beginPath()
    ctx.moveTo(x0, y0)
    ctx.lineTo(x1, y1)
    ctx.stroke()
    ctx.strokeStyle = '#000'
  }
  const effectWidth = width - marginLeft
  const effectHeight = height - marginBottom
  const perXLength = effectWidth / xArr.length
  const perYLength = effectHeight / yArr.length

  const createCoordinateSystem = () => {
    ctx.scale(1, -1)
    ctx.translate(marginLeft, -height + marginBottom)

    createLine(0, 0, effectWidth, 0)
    createLine(0, 0, 0, height)
  }
  const canvas = document.getElementById("canvas")
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext("2d")

  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)
  createCoordinateSystem()

  // 绘制坐标轴
  ctx.save()
  for (let i = 0; i < 6; i++) {
    ctx.translate(0, perYLength)
    ctx.lineWidth = 0.08
    createLine(0, 0, width, 0)
  }
  ctx.restore()

  // 绘制刻度
  ctx.save()
  for (let i = 0; i < xArr.length + 1; i++) {
    createLine(0, 0, 0, -5)
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

  // 折线
  ctx.save()
  for (let i = 0; i < xArr.length; i++) {
    ctx.fillStyle = '#000'
    // todo:
  }
  ctx.restore()
}
