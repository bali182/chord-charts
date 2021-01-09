import React, { PureComponent } from 'react'
import { CommonProps } from './CommonProps'
import { Header } from './Header'
import { Section } from './Section'

export class HtmlChordChart extends PureComponent<CommonProps> {
  private renderSections() {
    const { model, theme } = this.props
    return model.sections.map((section) => <Section key={section.name} model={model} theme={theme} section={section} />)
  }

  render() {
    const { theme, model } = this.props
    const { height, width, spacing } = theme
    const frameStyle: React.CSSProperties = {
      overflow: 'hidden',
      height,
      width,
      padding: spacing,
      border: '1px dashed lightgray',
    }
    return (
      <div style={frameStyle}>
        <Header model={model} theme={theme} />
        {this.renderSections()}
      </div>
    )
  }
}
