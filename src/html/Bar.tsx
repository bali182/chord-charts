import React, { PureComponent } from 'react'
import { BarModel, SectionModel } from '../model/Model'
import { SectionTheme } from '../model/Theme'
import { isNil } from '../utils'
import { ChordChartContext } from './ChordChartContext'
import { getContrastColor, isLightColor } from './colorUtils'
import { getSectionTheme } from './utils'

export type BarProps = {
  section: SectionModel
  bar: BarModel
  isActive: boolean
}

const barStyle = (sTheme: SectionTheme, isLight: boolean, isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  justifyItems: 'center',
  justifyContent: 'center',
  minHeight: sTheme.barHeight,
  height: '100%',
  backgroundColor: isActive ? (isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)') : 'transparent',
  borderRadius: sTheme.radius,
})

const barNameStyle = (sTheme: SectionTheme, isLight: boolean, isActive: boolean): React.CSSProperties => ({
  color: isActive ? (isLight ? '#fff' : '#000)') : getContrastColor(sTheme.color),
  fontSize: sTheme.barHeight * 0.5,
  fontWeight: isActive ? 'bold' : 'normal',
  marginBottom: sTheme.spacing * 0.2,
})

const barLabelStyle = (sTheme: SectionTheme, isLight: boolean, isActive: boolean): React.CSSProperties => ({
  color: isActive ? (isLight ? '#fff' : '#000)') : getContrastColor(sTheme.color),
  fontSize: sTheme.barHeight * 0.2,
  fontWeight: 'bold',
  opacity: 0.8,
})

export class Bar extends PureComponent<BarProps> {
  render() {
    return (
      <ChordChartContext.Consumer>
        {({ theme }) => {
          const { section, isActive, bar } = this.props
          const sTheme = getSectionTheme(theme, section)
          const isLight = isLightColor(sTheme.color)
          return (
            <div style={barStyle(sTheme, isLight, isActive)}>
              <div style={barNameStyle(sTheme, isLight, isActive)}>{bar.chords.join(' / ')}</div>
              {!isNil(bar.label) && bar.label.length > 0 ? (
                <div style={barLabelStyle(sTheme, isLight, isActive)}>{bar.label}</div>
              ) : null}
            </div>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
