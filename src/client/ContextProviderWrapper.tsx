import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { ArrangementItem, BarModel, isArrangementSection, Model, SectionModel } from '../common/Model'
import { ChordChartAppState } from './state/state'
import { Theme } from '../common/Theme'
import { isArrangementItemSelection, isBarSelection, isSectionSelection, SelectionModel } from '../common/Selection'
import { setSelection } from './state/selection/selection.actionCreators'
import { updateChart } from './state/chart/chart.actionCreators'
import { id, isNil } from '../common/utils'
import { ChordChartContext, ChordChartContextType } from './chordChart/ChordChartContext'

type ReduxProps = {
  chart: Model
  theme: Theme
  selection: SelectionModel
}

type ActionCreatorProps = {
  setSelection: typeof setSelection
  updateChart: typeof updateChart
}

export type ContextProviderWrapperProps = ReduxProps & ActionCreatorProps

export class _ContextProviderWrapper extends PureComponent<ContextProviderWrapperProps> {
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

  addArrangementItem = (item: ArrangementItem) => {
    const { updateChart, chart } = this.props
    updateChart({
      chart: {
        ...chart,
        arrangement: chart.arrangement.concat(item),
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
        arrangement: chart.arrangement.filter((item) => !(isArrangementSection(item) && item.sectionId === sectionId)),
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

  deleteArrangementItem = (itemId: string) => {
    const { updateChart, selection, chart } = this.props
    updateChart({
      chart: {
        ...chart,
        arrangement: chart.arrangement.filter((item) => item.id !== itemId),
      },
    })
    if (!isNil(selection) && isArrangementItemSelection(selection) && selection.id === itemId) {
      setSelection({ selection: null })
    }
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

  updateArrangementItem = (item: ArrangementItem) => {
    const { updateChart, chart } = this.props
    updateChart({
      chart: {
        ...chart,
        arrangement: chart.arrangement.map((i) => (i.id === item.id ? item : i)),
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
      addArrangementItem: this.addArrangementItem,
      deleteArrangementItem: this.deleteArrangementItem,
      updateArrangementItem: this.updateArrangementItem,
      chart,
      selection,
      theme,
      readOnly: false,
    }
  }

  render() {
    return (
      <ChordChartContext.Provider value={this.createMutatorContext()}>{this.props.children}</ChordChartContext.Provider>
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

export const ContextProviderWrapper = connect(mapStateToProps, actionCreators)(_ContextProviderWrapper)
