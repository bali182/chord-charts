import { Theme } from '../model/Theme'
import { isNil } from '../utils'

import Color from 'color'

export function getSectionColor(theme: Theme, index: number) {
  const { colors } = theme.section
  if (isNil(colors) || colors.length === 0) {
    return '#000' // No colors provided
  }
  return colors[index % colors.length]
}

export function isLightColor(color: string): boolean {
  return new Color(color).isLight()
}

export function getContrastColor(color: string): string {
  return isLightColor(color) ? '#000' : '#fff'
}

export function withOpacity(color: string, opacity: number): string {
  if (opacity === 1) {
    return color
  }
  return new Color(color).alpha(opacity).rgb().toString()
}
