import React, { PureComponent } from 'react'
import { Controller } from './Controller'
import { BarModel, Model, SectionModel } from '../model'
import { Theme } from '../Theme'

export type SvgChordChartProps = {
  theme: Theme
  model: Model
}

export class SvgChordChart extends PureComponent<SvgChordChartProps> {
  private renderSections(controller: Controller) {
    const sections = controller.getModel().sections
    return sections.map((section) => this.renderSection(controller, section))
  }

  private renderSection(controller: Controller, section: SectionModel) {
    const x = controller.section.getX(section)
    const y = controller.section.getY(section)
    const height = controller.section.getHeight(section)
    const width = controller.section.getWidth(section)
    const theme = controller.section.getTheme(section)
    return (
      <svg key={section.name} x={x} y={y} height={height} width={width} xmlns="http://www.w3.org/2000/svg">
        <rect
          rx={theme.radius}
          ry={theme.radius}
          fill={theme.color}
          x={theme.strokeWidth}
          y={theme.strokeWidth}
          width={width - theme.strokeWidth * 2}
          height={height - theme.strokeWidth * 2}
        />
        {this.renderBarsInSection(controller, section)}
      </svg>
    )
  }

  private renderBarsInSection(controller: Controller, section: SectionModel) {
    return section.bars.map((bar) => this.renderBar(controller, section, bar))
  }

  private renderBar(controller: Controller, section: SectionModel, bar: BarModel) {
    const x = controller.bar.getX(section, bar)
    const y = controller.bar.getY(section, bar)
    const width = controller.bar.getWidth(section)
    const height = controller.bar.getHeight(section)
    const text = controller.bar.getText(bar)
    const key = controller.bar.getKey(section, bar)

    const contrastColor = controller.section.getContrastColor(section)
    const fontSize = controller.bar.getFontSize(section)
    const highlightPath = controller.bar.getHighlightPath(section, bar)
    const theme = controller.section.getTheme(section)

    const isHighlighted = text === 'C' // TODO

    return (
      <svg key={key} x={x} y={y} width={width} height={height} xmlns="http://www.w3.org/2000/svg">
        {isHighlighted ? <path d={highlightPath} fill={contrastColor} /> : null}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontWeight={isHighlighted ? 'bold' : 'normal'}
          fill={isHighlighted ? theme.color : contrastColor}
          fontSize={fontSize}>
          {text}
        </text>
      </svg>
    )
  }

  render() {
    const controller = new Controller(this.props.model, this.props.theme)
    const theme = controller.getTheme()
    return (
      <svg width={theme.width} height={theme.height} xmlns="http://www.w3.org/2000/svg">
        {this.renderSections(controller)}
      </svg>
    )
  }
}
