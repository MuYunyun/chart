const Chart = function({
  width,
  height,
  marginLeft,
  marginBottom,
  xArr,
  yArr,
}) {
  const effectWidth = width - marginLeft
  const effectHeight = height - marginBottom
  const perXLength = effectWidth / xArr.length
  const perYLength = effectHeight / yArr.length
}

Chart.prototype.drawLine = ({
  ctx,
  x0,
  y0,
  x1,
  y1
}) => {
  ctx.beginPath()
  ctx.moveTo(x0, y0)
  ctx.lineTo(x1, y1)
  ctx.stroke()
  ctx.strokeStyle = '#000'
}

// todo
Chart.prototype.drawCoordinateSystem = ({

}) => {

}