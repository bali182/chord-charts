import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { CircularButton } from '../editor/CircularButton'
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
  position: 'relative',
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
  color: isActive ? (isLight ? '#fff' : '#000') : getContrastColor(color),
  fontSize: sTheme.barHeight * 0.4,
  fontWeight: isActive ? 'bold' : 'normal',
  marginBottom: sTheme.spacing * 0.2,
})

const barLabelStyle = (
  sTheme: SectionTheme,
  isLight: boolean,
  isActive: boolean,
  color: string
): React.CSSProperties => ({
  color: isActive ? (isLight ? '#fff' : '#000') : getContrastColor(color),
  fontSize: sTheme.barHeight * 0.18,
  fontWeight: 'bold',
  opacity: 0.8,
  textAlign: 'center',
})

const editorStripStyle = css({
  position: 'absolute',
  top: '0px',
  right: '-15px',
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  height: '100%',
})

const barStyleExtra = (isLight: boolean) =>
  css({
    ':hover': {
      cursor: 'pointer',
      backgroundColor: isLight ? 'rgba(0,0,0,0.2) !important' : 'rgba(255,255,255,0.2) !important',
    },
  })

export class Bar extends PureComponent<BarProps> {
  renderEditorStrip(readOnly: boolean, isActive: boolean) {
    if (readOnly || !isActive) {
      return null
    }
    const { bar } = this.props
    return (
      <ChordChartContext.Consumer>
        {({ deleteBar }) => (
          <div className={editorStripStyle}>
            <CircularButton
              icon={faTimes}
              tooltip="Delete bar"
              placeTooltip="right"
              onClick={(e) => {
                e.stopPropagation()
                deleteBar(bar.id)
              }}
            />
          </div>
        )}
      </ChordChartContext.Consumer>
    )
  }

  render() {
    return (
      <ChordChartContext.Consumer>
        {({ theme, chart, selection, setSelection, readOnly }) => {
          const { section, bar } = this.props
          const isActive = !isNil(selection) && isBarSelection(selection) && selection.id === bar.id
          const sectionIndex = chart.sections.indexOf(section)
          const sColor = getSectionColor(theme, sectionIndex)
          const isLight = isLightColor(sColor)
          return (
            <div
              onClick={() => setSelection({ id: bar.id, type: 'bar-selection' })}
              className={readOnly || isActive ? null : barStyleExtra(isLight)}
              style={barStyle(theme.section, isLight, isActive)}>
              <div style={barNameStyle(theme.section, isLight, isActive, sColor)}>{bar.chord}</div>
              <span style={barLabelStyle(theme.section, isLight, isActive, sColor)}>{bar.label}</span>
              {this.renderEditorStrip(readOnly, isActive)}
            </div>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
