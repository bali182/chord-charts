import React, { PureComponent } from 'react'
import { ChordChartContext, ChordChartContextType } from './ChordChartContext'
import { Header } from './Header'
import { Section } from './Section'
import { Model } from '../model/Model'
import { Theme } from '../model/Theme'

export type ChordChartProps = {
  theme: Theme
  model: Model
}

export class ChordChart extends PureComponent<ChordChartProps> {
  private renderSections() {
    const { model } = this.props
    return model.sections.map((section) => <Section key={section.name} section={section} />)
  }

  private createContext(): ChordChartContextType {
    const { model, theme } = this.props
    return {
      model,
      theme,
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
      border: '1px dashed lightgray',
    }
    return (
      <ChordChartContext.Provider value={this.createContext()}>
        <div style={frameStyle}>
          <Header />
          {this.renderSections()}
        </div>
      </ChordChartContext.Provider>
    )
  }
}
