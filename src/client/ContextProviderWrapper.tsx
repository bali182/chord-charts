import React, { PureComponent, ReactNode } from 'react'
import { connect } from 'react-redux'
import { ChartModel } from '../common/Model'
import { ChordChartAppState } from './state/state'
import { Theme } from '../common/Theme'
import { SelectionModel } from '../common/Selection'
import { setSelection } from './state/selection/selection.actionCreators'
import {
  addArrangementItem,
  addBar,
  addSection,
  deleteArrangementItem,
  deleteBar,
  deleteSection,
  updateArrangementItem,
  updateBar,
  updateChart,
  updateSection,
} from './state/chart/chart.actionCreators'
import { ChordChartContext, ChordChartContextType } from './chordChart/ChordChartContext'

type ReduxProps = {
  chart: ChartModel
  theme: Theme
  selection: SelectionModel
}

type ActionCreatorProps = {
  addSection: typeof addSection
  addBar: typeof addBar
  addArrangementItem: typeof addArrangementItem
  deleteSection: typeof deleteSection
  deleteBar: typeof deleteBar
  deleteArrangementItem: typeof deleteArrangementItem
  updateChart: typeof updateChart
  updateSection: typeof updateSection
  updateBar: typeof updateBar
  updateArrangementItem: typeof updateArrangementItem
  setSelection: typeof setSelection
}

export type ContextProviderWrapperProps = ReduxProps & ActionCreatorProps & {
  children: ReactNode
}

export class _ContextProviderWrapper extends PureComponent<ContextProviderWrapperProps> {
  moveSectionUp = (sectionId: string) => {
    const { updateChart, chart } = this.props
    const index = chart.sections.findIndex((section) => section.id === sectionId)
    if (index <= 0) {
      return // Can't move up first guy or nonexisting
    }
    const movedSection = chart.sections[index]
    const newSections = chart.sections.filter((section) => section.id !== sectionId)
    newSections.splice(index - 1, 0, movedSection)
    updateChart({ ...chart, sections: newSections })
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
    updateChart({ ...chart, sections: newSections })
  }

  createMutatorContext(): ChordChartContextType {
    const { chart, selection, theme } = this.props
    const {
      updateChart,
      setSelection,
      addSection,
      addBar,
      addArrangementItem,
      deleteSection,
      deleteBar,
      deleteArrangementItem,
      updateSection,
      updateBar,
      updateArrangementItem,
    } = this.props
    return {
      moveSectionDown: this.moveSectionDown,
      moveSectionUp: this.moveSectionUp,
      addSection,
      addBar,
      deleteSection,
      deleteBar,
      setSelection,
      updateBar,
      updateSection,
      updateChart,
      addArrangementItem,
      deleteArrangementItem,
      updateArrangementItem,
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
  addSection,
  addBar,
  addArrangementItem,
  deleteSection,
  deleteBar,
  deleteArrangementItem,
  updateSection,
  updateBar,
  updateArrangementItem,
}

export const ContextProviderWrapper = connect(mapStateToProps, actionCreators)(_ContextProviderWrapper)
