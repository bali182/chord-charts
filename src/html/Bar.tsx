import React, { PureComponent } from 'react'
import { BarModel, SectionModel } from '../Model'
import { getContrastColor, isLightColor } from './colorUtils'
import { CommonProps } from './CommonProps'
import { getSectionTheme } from './utils'

export type BarProps = CommonProps & {
  section: SectionModel
  bar: BarModel
  isActive: boolean
}

export class Bar extends PureComponent<BarProps> {
  render() {
    const { section, theme, isActive, bar } = this.props
    const sTheme = getSectionTheme(theme, section)
    const isLight = isLightColor(sTheme.color)
    const barStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyItems: 'center',
      justifyContent: 'center',
      minHeight: sTheme.barHeight,
      height: '100%',
      color: isActive ? (isLight ? '#fff' : '#000)') : getContrastColor(sTheme.color),
      backgroundColor: isActive ? (isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)') : 'transparent',
      fontWeight: isActive ? 'bold' : 'normal',
      borderRadius: sTheme.radius,
      fontSize: sTheme.barHeight * 0.3,
    }
    return <div style={barStyle}>{bar.chords.join(' / ')}</div>
  }
}
