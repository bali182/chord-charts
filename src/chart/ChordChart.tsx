import React, { PureComponent } from 'react'
import { ChordChartContext, ChordChartContextType } from './ChordChartContext'
import { Header } from './Header'
import { Section } from './Section'
import { Model } from '../model/Model'
import { Theme } from '../model/Theme'
import { SelectionModel } from '../model/Selection'
import { ChartMutatorContext } from '../ChartMutatorContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export type ChordChartProps = {
  theme: Theme
  model: Model
  readOnly: boolean
  selection: SelectionModel
}

const frameStyle = (theme: Theme, readOnly: boolean): React.CSSProperties => ({
  overflow: 'hidden',
  height: theme.height,
  width: theme.width,
  padding: theme.spacing,
  flexShrink: 0,
  border: readOnly ? 'none' : '1px dashed lightgray',
})

const appendStyle = (theme: Theme): React.CSSProperties => ({
  overflow: 'hidden',
  height: theme.section.barHeight,
  padding: theme.section.spacing,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  border: '1px dashed lightgray',
  cursor: 'pointer',
  borderRadius: theme.section.radius,
})

export class ChordChart extends PureComponent<ChordChartProps> {
  private renderSections() {
    const { model } = this.props
    return model.sections.map((section) => <Section key={section.name} section={section} />)
  }

  private createContext(): ChordChartContextType {
    const { model, theme, selection } = this.props
    return {
      model,
      theme,
      selection,
    }
  }

  private renderAppendSection() {
    const { readOnly, theme } = this.props
    if (readOnly) {
      return null
    }
    return (
      <ChartMutatorContext.Consumer>
        {({ addSection }) => (
          <div style={appendStyle(theme)} onClick={addSection}>
            <FontAwesomeIcon icon={faPlus} size={'2x'} />
            <span style={{ marginLeft: theme.section.spacing }}>Add song section</span>
          </div>
        )}
      </ChartMutatorContext.Consumer>
    )
  }

  render() {
    const { theme, readOnly } = this.props
    return (
      <ChordChartContext.Provider value={this.createContext()}>
        <div style={frameStyle(theme, readOnly)}>
          <Header />
          {this.renderSections()}
          {this.renderAppendSection()}
        </div>
      </ChordChartContext.Provider>
    )
  }
}
