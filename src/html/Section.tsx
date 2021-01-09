import React, { PureComponent } from 'react'
import { SectionModel } from '../model/Model'
import { SectionTheme, Theme } from '../model/Theme'
import { Bar } from './Bar'
import { ChordChartContext } from './ChordChartContext'
import { isLightColor } from './colorUtils'
import { getSectionTheme } from './utils'

export type SectionProps = {
  section: SectionModel
}

const sectionStyle = (theme: Theme, sTheme: SectionTheme, isLast: boolean): React.CSSProperties => ({
  display: 'flex',
  flexDirection: 'row',
  borderRadius: sTheme.radius,
  backgroundColor: sTheme.color,
  marginBottom: isLast ? 0 : theme.spacing,
  minHeight: sTheme.barHeight,
  boxShadow: '0px 2px 5px 1px rgba(0,0,0,0.2)',
})

const titleContainerStyle = (sTheme: SectionTheme): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopLeftRadius: sTheme.radius,
  borderBottomLeftRadius: sTheme.radius,
  padding: sTheme.spacing,
  backgroundColor: isLightColor(sTheme.color) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
})

const titleStyle = (sTheme: SectionTheme): React.CSSProperties => ({
  fontSize: sTheme.barHeight * 0.25,
  transform: 'rotate(-180deg)',
  writingMode: 'vertical-lr',
  textAlign: 'center',
  color: isLightColor(sTheme.color) ? '#fff' : '#000',
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
          const isLast = model.sections.indexOf(section) === model.sections.length - 1
          const sTheme = getSectionTheme(theme, section)
          return (
            <div style={sectionStyle(theme, sTheme, isLast)} key={section.name}>
              <div style={titleContainerStyle(sTheme)}>
                <div style={titleStyle(sTheme)}>{section.name}</div>
              </div>
              <div style={barsContainerStyle(sTheme, section.groupBars)}>
                {section.bars.map((bar, index) => (
                  <Bar
                    key={`${section.name}-${index}`}
                    bar={bar}
                    section={section}
                    isActive={true} // TODO
                  />
                ))}
              </div>
            </div>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
