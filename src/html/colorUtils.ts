import Color from 'color'

export function isLightColor(color: string): boolean {
  const c = new Color(color)
  const [r, g, b] = c.rgb().array()
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? true : false
}

export function getContrastColor(color: string): string {
  return isLightColor(color) ? '#000' : '#fff'
}
