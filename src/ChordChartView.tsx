import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import { Model } from './model/Model'
import { ChordChart } from './chart/ChordChart'
import { ChordChartAppState } from './state/state'
import { Theme } from './model/Theme'
import { SelectionModel } from './model/Selection'
import { EditorHeader, EditorTitle } from './editor/EditorHeader'
import { setSelection } from './state/selection/selection.actionCreators'
import { updateChart } from './state/chart/chart.actionCreators'
import { id } from './chart/utils'
import { ChartMutatorContext, ChartMutatorContextType } from './ChartMutatorContext'

const chordChartViewStyle = css({
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: '#fff',
})

const scrollAreaStyle = css({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  padding: '20px',
})

export type ChordChartViewProps = ReduxProps & ActionCreatorProps

type ReduxProps = {
  chart: Model
  theme: Theme
  selection: SelectionModel
}

type ActionCreatorProps = {
  setSelection: typeof setSelection
  updateChart: typeof updateChart
}

export class _ChordChartView extends PureComponent<ChordChartViewProps> {
  addSection = () => {
    const { updateChart, setSelection, chart } = this.props
    const sectionId = id()
    updateChart({
      chart: {
        ...chart,
        sections: chart.sections.concat([
          {
            bars: [],
            groupBars: 4,
            id: sectionId,
            name: `Section ${chart.sections.length + 1}`,
          },
        ]),
      },
    })

    setSelection({ selection: { type: 'section-selection', id: sectionId } })
  }
  addBar = (sectionId: string) => {}
  moveSectionUp = (sectionId: string) => {}
  moveSectionDown = (sectionId: string) => {}
  deleteSection = (sectionId: string) => {}
  deleteBar = (barId: string) => {}
  setSelection = (selection: SelectionModel) => {
    const { setSelection } = this.props
    setSelection({ selection })
  }

  createMutatorContext(): ChartMutatorContextType {
    return {
      addSection: this.addSection,
      addBar: this.addBar,
      moveSectionDown: this.moveSectionDown,
      moveSectionUp: this.moveSectionUp,
      deleteSection: this.deleteSection,
      deleteBar: this.deleteBar,
      setSelection: this.setSelection,
    }
  }

  render() {
    const { chart, theme, selection } = this.props
    return (
      <div className={chordChartViewStyle}>
        <EditorHeader>
          <EditorTitle title="chord-charts" />
        </EditorHeader>
        <div className={scrollAreaStyle}>
          <ChartMutatorContext.Provider value={this.createMutatorContext()}>
            <ChordChart model={chart} theme={theme} selection={selection} readOnly={false} />
          </ChartMutatorContext.Provider>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: ChordChartAppState): ReduxProps {
  return state
}

const actionCreators: ActionCreatorProps = {
  updateChart,
  setSelection,
}

export const ChordChartView = connect(mapStateToProps, actionCreators)(_ChordChartView)
