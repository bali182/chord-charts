import React, { PureComponent } from 'react'
import { Model, SectionModel } from '../Model'
import { SectionTheme, Theme } from '../Theme'
import { isNil } from '../utils'
import { getContrastColor, isLightColor } from './colorUtils'

export type HtmlChordChartProps = {
  theme: Theme
  model: Model
}

export class HtmlChordChart extends PureComponent<HtmlChordChartProps> {
  private renderHeader() {
    const { theme, model } = this.props
    const { spacing } = theme
    const { name } = model
    const style: React.CSSProperties = {
      fontSize: 35,
      marginBottom: spacing,
      fontWeight: 'bold',
      textAlign: 'center',
    }
    return <div style={style}>{name}</div>
  }

  private renderSections() {
    const { model } = this.props
    return model.sections.map((section, index) => this.renderSection(section, index === model.sections.length - 1))
  }

  private renderSection(section: SectionModel, isLast: boolean) {
    const { theme } = this.props
    const { spacing } = theme
    const sTheme = this.getSectionTheme(section)
    const isLight = isLightColor(sTheme.color)
    const sectionStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      borderRadius: sTheme.radius,
      backgroundColor: sTheme.color,
      marginBottom: isLast ? 0 : spacing,
      minHeight: sTheme.barHeight,
    }
    const titleContainerStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderTopLeftRadius: sTheme.radius,
      borderBottomLeftRadius: sTheme.radius,
      padding: sTheme.spacing,
      backgroundColor: isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
    }
    const titleStyle: React.CSSProperties = {
      fontSize: sTheme.barHeight / 3,
      transform: 'rotate(-180deg)',
      writingMode: 'vertical-lr',
      textAlign: 'center',
      color: isLight ? '#fff' : '#000',
    }
    const barsContainerStyle: React.CSSProperties = {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: '1px',
      display: 'grid',
      rowGap: sTheme.spacing,
      columnGap: sTheme.spacing,
      gridTemplateColumns: `repeat(${section.groupBars}, minmax(0, 1fr))`,
      marginRight: sTheme.spacing,
    }
    return (
      <div style={sectionStyle} key={section.name}>
        <div style={titleContainerStyle}>
          <div style={titleStyle}>{section.name}</div>
        </div>
        <div style={barsContainerStyle}>{this.renderBars(section, sTheme)}</div>
      </div>
    )
  }

  private renderBars(section: SectionModel, sTheme: SectionTheme) {
    const { bars } = section

    return bars.map((bar, index) => {
      const barStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        justifyItems: 'center',
        justifyContent: 'center',
        minHeight: sTheme.barHeight,
        height: '100%',
        color: getContrastColor(sTheme.color),
        fontSize: sTheme.barHeight / 4,
      }
      return <div style={barStyle}>{bar.chords.join(' / ')}</div>
    })
  }

  private getSectionTheme(section: SectionModel) {
    const { theme } = this.props
    const defaultTheme = theme.defaultSectionTheme
    if (isNil(section.theme)) {
      return defaultTheme
    }
    const sTheme = theme.sectionThemes.find((theme) => theme.name === section.theme)
    if (isNil(sTheme)) {
      return defaultTheme
    }
    return {
      ...defaultTheme,
      ...sTheme,
    }
  }

  render() {
    const { theme } = this.props
    const { height, width, spacing } = theme
    const frameStyle: React.CSSProperties = {
      overflow: 'hidden',
      height,
      width,
      padding: spacing,
    }
    return (
      <div style={frameStyle}>
        {this.renderHeader()}
        {this.renderSections()}
      </div>
    )
  }
}
