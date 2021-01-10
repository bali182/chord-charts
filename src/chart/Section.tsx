import React, { PureComponent } from 'react'
import { SectionModel } from '../model/Model'
import { SectionTheme, Theme } from '../model/Theme'
import { Bar } from './Bar'
import { ChordChartContext } from './ChordChartContext'
import { getSectionColor, isLightColor, withOpacity } from './utils'

export type SectionProps = {
  section: SectionModel
}

const sectionStyle = (theme: Theme, sTheme: SectionTheme, isLast: boolean, color: string): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: sTheme.radius,
  backgroundColor: withOpacity(color, sTheme.opacity),
  marginBottom: isLast ? 0 : theme.spacing,
  minHeight: sTheme.barHeight,
  boxShadow: '0px 2px 5px 1px rgba(0,0,0,0.2)',
})

const titleContainerStyle = (sTheme: SectionTheme, color: string): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopLeftRadius: sTheme.radius,
  borderBottomLeftRadius: sTheme.radius,
  padding: sTheme.spacing,
  backgroundColor: isLightColor(color) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
})

const titleStyle = (sTheme: SectionTheme, color: string): React.CSSProperties => ({
  fontSize: sTheme.barHeight * 0.25,
  transform: 'rotate(-180deg)',
  writingMode: 'vertical-lr',
  textAlign: 'center',
  color: isLightColor(color) ? '#fff' : '#000',
})

const barsContainerStyle = (sTheme: SectionTheme, groupBars: number): React.CSSProperties => ({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  display: 'grid',
  rowGap: sTheme.spacing,
  columnGap: sTheme.spacing,
  gridTemplateColumns: `repeat(${groupBars}, minmax(0, 1fr))`,
  padding: sTheme.spacing,
})

export class Section extends PureComponent<SectionProps> {
  render() {
    return (
      <ChordChartContext.Consumer>
        {({ theme, model }) => {
          const { section } = this.props
          const index = model.sections.indexOf(section)
          const isLast = index === model.sections.length - 1
          const sColor = getSectionColor(theme, index)
          return (
            <div style={sectionStyle(theme, theme.section, isLast, sColor)} key={section.name}>
              <div style={titleContainerStyle(theme.section, sColor)}>
                <div style={titleStyle(theme.section, sColor)}>{section.name}</div>
              </div>
              <div style={barsContainerStyle(theme.section, section.groupBars)}>
                {section.bars.map((bar, index) => (
                  <Bar key={`${section.name}-${index}`} bar={bar} section={section} />
                ))}
              </div>
            </div>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
