export const parseTime = (val?: string) => {
  if (val) {
    const d = new Date(val)
    if (Object.prototype.toString.call(d) === '[object Date]') {
      if (!isNaN(d.getTime())) {
        return d.toISOString().split('T')[0]
      }
    }
  }

  return ''
}
