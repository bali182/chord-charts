import React, { PureComponent } from 'react'
import { BarModel, SectionModel } from '../model/Model'
import { isBarSelection } from '../model/Selection'
import { SectionTheme } from '../model/Theme'
import { isNil } from '../utils'
import { ChordChartContext } from './ChordChartContext'
import { getSectionColor, getContrastColor, isLightColor } from './utils'

export type BarProps = {
  section: SectionModel
  bar: BarModel
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

const barNameStyle = (
  sTheme: SectionTheme,
  isLight: boolean,
  isActive: boolean,
  color: string
): React.CSSProperties => ({
  color: isActive ? (isLight ? '#fff' : '#000)') : getContrastColor(color),
  fontSize: sTheme.barHeight * 0.5,
  fontWeight: isActive ? 'bold' : 'normal',
  marginBottom: sTheme.spacing * 0.2,
})

const barLabelStyle = (
  sTheme: SectionTheme,
  isLight: boolean,
  isActive: boolean,
  color: string
): React.CSSProperties => ({
  color: isActive ? (isLight ? '#fff' : '#000)') : getContrastColor(color),
  fontSize: sTheme.barHeight * 0.2,
  fontWeight: 'bold',
  opacity: 0.8,
})

export class Bar extends PureComponent<BarProps> {
  render() {
    return (
      <ChordChartContext.Consumer>
        {({ theme, model, selection }) => {
          const { section, bar } = this.props
          const isActive = !isNil(selection) && isBarSelection(selection) && selection.id === bar.id
          const sectionIndex = model.sections.indexOf(section)
          const sColor = getSectionColor(theme, sectionIndex)
          const isLight = isLightColor(sColor)
          return (
            <div style={barStyle(theme.section, isLight, isActive)}>
              <div style={barNameStyle(theme.section, isLight, isActive, sColor)}>{bar.chords.join(' / ')}</div>
              {!isNil(bar.label) && bar.label.length > 0 ? (
                <div style={barLabelStyle(theme.section, isLight, isActive, sColor)}>{bar.label}</div>
              ) : null}
            </div>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
