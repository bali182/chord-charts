import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import { BarModel, Model, SectionModel } from './model/Model'
import { ChordChart } from './chart/ChordChart'
import { ChordChartAppState } from './state/state'
import { Theme } from './model/Theme'
import { isBarSelection, isSectionSelection, SelectionModel } from './model/Selection'
import { setSelection } from './state/selection/selection.actionCreators'
import { updateChart } from './state/chart/chart.actionCreators'
import { id } from './chart/utils'
import { isNil } from './utils'
import { ChordChartContext, ChordChartContextType } from './chart/ChordChartContext'

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
    const { updateChart, chart } = this.props
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
  }
  addBar = (sectionId: string) => {
    const { updateChart, chart } = this.props
    const barId = id()
    updateChart({
      chart: {
        ...chart,
        sections: chart.sections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              bars: section.bars.concat([
                {
                  chord: '%',
                  id: barId,
                  label: null,
                },
              ]),
            }
          }
          return section
        }),
      },
    })
  }

  moveSectionUp = (sectionId: string) => {
    const { updateChart, chart } = this.props
    const index = chart.sections.findIndex((section) => section.id === sectionId)
    if (index <= 0) {
      return // Can't move up first guy or nonexisting
    }
    const movedSection = chart.sections[index]
    const newSections = chart.sections.filter((section) => section.id !== sectionId)
    newSections.splice(index - 1, 0, movedSection)
    updateChart({
      chart: { ...chart, sections: newSections },
    })
  }

  moveSectionDown = (sectionId: string) => {
    const { updateChart, chart } = this.props
    const index = chart.sections.findIndex((section) => section.id === sectionId)
    if (index === chart.sections.length - 1 || index < 0) {
      return // Can't move down last guy or nonexisting
    }
    const movedSection = chart.sections[index]
    const newSections = chart.sections.filter((section) => section.id !== sectionId)
    newSections.splice(index + 1, 0, movedSection)
    updateChart({
      chart: { ...chart, sections: newSections },
    })
  }

  deleteSection = (sectionId: string) => {
    const { updateChart, setSelection, chart, selection } = this.props
    if (!isNil(selection) && isSectionSelection(selection) && selection.id === sectionId) {
      setSelection({ selection: null })
    }
    updateChart({
      chart: {
        ...chart,
        sections: chart.sections.filter((section) => section.id !== sectionId),
        sectionSequence: chart.sectionSequence.filter((id) => id !== sectionId),
      },
    })
  }

  deleteBar = (barId: string) => {
    const { updateChart, setSelection, selection, chart } = this.props
    if (!isNil(selection) && isBarSelection(selection) && selection.id === barId) {
      setSelection({ selection: null })
    }
    updateChart({
      chart: {
        ...chart,
        sections: chart.sections.map((section) => ({
          ...section,
          bars: section.bars.filter((b) => b.id !== barId),
        })),
      },
    })
  }

  updateChart = (c: Model) => {
    const { updateChart } = this.props
    updateChart({
      chart: c,
    })
  }

  updateSection = (section: SectionModel) => {
    const { updateChart, chart } = this.props
    updateChart({
      chart: {
        ...chart,
        sections: chart.sections.map((s) => (s.id === section.id ? section : s)),
      },
    })
  }

  updateBar = (bar: BarModel) => {
    const { updateChart, chart } = this.props
    updateChart({
      chart: {
        ...chart,
        sections: chart.sections.map((s) => ({
          ...s,
          bars: s.bars.map((b) => (b.id === bar.id ? bar : b)),
        })),
      },
    })
  }

  setSelection = (selection: SelectionModel) => {
    const { setSelection } = this.props
    setSelection({ selection })
  }

  createMutatorContext(): ChordChartContextType {
    const { chart, selection, theme } = this.props
    return {
      addSection: this.addSection,
      addBar: this.addBar,
      moveSectionDown: this.moveSectionDown,
      moveSectionUp: this.moveSectionUp,
      deleteSection: this.deleteSection,
      deleteBar: this.deleteBar,
      setSelection: this.setSelection,
      updateBar: this.updateBar,
      updateSection: this.updateSection,
      updateChart: this.updateChart,
      chart,
      selection,
      theme,
      readOnly: false,
    }
  }

  render() {
    return (
      <div className={chordChartViewStyle}>
        <div className={scrollAreaStyle}>
          <ChordChartContext.Provider value={this.createMutatorContext()}>
            <ChordChart />
          </ChordChartContext.Provider>
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
