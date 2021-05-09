const getMiddlePoint = (x0, y0, x1, y1) => {
  return [(x0 + x1) / 2, (y0 + y1) / 2]
}

const getX = (value, degree) => {
  return value * Math.cos(Math.PI / 180 * degree)
}

const getY = (value, degree) => {
  return value * Math.sin(Math.PI / 180 * degree)
}