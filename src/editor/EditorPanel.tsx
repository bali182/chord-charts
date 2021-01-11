import React, { PureComponent, ReactNode } from 'react'
import { css } from 'emotion'
import { connect } from 'react-redux'
import { ChordChartAppState } from '../state/state'
import { updateChart } from '../state/chart/chart.actionCreators'
import { updateTheme } from '../state/theme/theme.actionCreators'
import { setSelection } from '../state/selection/selection.actionCreators'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { EditorContext, EditorContextType } from './EditorContext'
import {
  isBarSelection,
  isChordChartSelection,
  isSectionSelection,
  isThemeSelection,
  SelectionModel,
} from '../model/Selection'
import { BarModel, Model, SectionModel } from '../model/Model'
import { Theme } from '../model/Theme'
import { EditorHeader, EditorTitle } from './EditorHeader'
import { flatMap, isNil } from '../utils'
import { BarEditor } from './BarEditor'
import { SectionEditor } from './SectionEditor'

const editorPanelStyle = (visible: boolean) =>
  css({
    position: 'relative',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: visible ? '300px' : '0px',
    overflowX: visible ? 'auto' : 'hidden',
    backgroundColor: '#fff',
    borderLeftColor: '#bbb',
    borderLeftWidth: '0px',
    borderLeftStyle: 'solid',
    boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.3)',
  })

const scrollAreaStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  overflowY: 'auto',
})

type ReduxProps = {
  selection: SelectionModel
  chart: Model
  theme: Theme
}

type ActionCreatorsProps = {
  updateChart: typeof updateChart
  updateTheme: typeof updateTheme
  setSelection: typeof setSelection
}

export type SectionState = { [sectionId: string]: boolean }

type EditorPanelState = {
  closedSections: SectionState
}

export type EditorPanelProps = ReduxProps & ActionCreatorsProps

export class _EditorPanel extends PureComponent<EditorPanelProps, EditorPanelState> {
  // state: EditorPanelState = {
  //   closedSections: values(ThemeSectionIds).reduce((sections, key) => ({ ...sections, [key]: true }), {}),
  // }

  private onBarChanged = (bar: BarModel) => {
    const { chart, updateChart } = this.props
    updateChart({
      chart: {
        ...chart,
        sections: chart.sections.map((section) => ({
          ...section,
          bars: section.bars.map((b) => (b.id === bar.id ? bar : b)),
        })),
      },
    })
  }

  private onSectionChanged = (section: SectionModel) => {
    const { chart, updateChart } = this.props
    updateChart({
      chart: {
        ...chart,
        sections: chart.sections.map((s) => (s.id === section.id ? section : s)),
      },
    })
  }

  private removeSelection = () => {
    const { setSelection } = this.props
    setSelection({ selection: null })
  }

  private setSectionState = (id: string, open: boolean) => {
    const { closedSections } = this.state
    this.setState({ closedSections: { ...closedSections, [id]: !open } })
  }
  private isSectionOpen = (id: string) => {
    const { closedSections } = this.state
    return !Boolean(closedSections[id])
  }

  private renderHeaderLabel(): string {
    const { selection } = this.props
    if (isNil(selection)) {
      return 'No selection'
    }
    if (isThemeSelection(selection)) {
      return 'Edit theme'
    } else if (isBarSelection(selection)) {
      return 'Edit bar'
    } else if (isSectionSelection(selection)) {
      return 'Edit section'
    } else if (isChordChartSelection(selection)) {
      return 'Edit chart'
    }
    return null
  }

  private renderEditor(): ReactNode {
    const { selection, chart } = this.props
    if (isNil(selection)) {
      return null
    }
    if (isBarSelection(selection)) {
      const bar = flatMap(chart.sections, (section) => section.bars).find((bar) => bar.id === selection.id)
      return <BarEditor bar={bar} onChange={this.onBarChanged} />
    } else if (isSectionSelection(selection)) {
      const section = chart.sections.find((section) => section.id === selection.id)
      return <SectionEditor section={section} onChange={this.onSectionChanged} />
    }
    // else if (isStringSelection(selection)) {
    //   const string = fretboard.strings.find((string) => string.id === selection.stringId)
    //   return <StringEditor string={string} onChange={this.onStringChange} />
    // } else if (isFretboardSelection(selection)) {
    //   return <FretboardEditor fretboard={fretboard} onChange={this.onFretboardChange} />
    // } else if (isThemeSelection(selection)) {
    //   return <ThemeEditor theme={theme} onChange={this.onThemeChange} />
    // }
    return <span>No editor available yet</span>
  }

  render() {
    const { selection } = this.props
    const editorContext: EditorContextType = {
      isSectionOpen: this.isSectionOpen,
      setSectionOpen: this.setSectionState,
    }
    return (
      <div className={editorPanelStyle(!isNil(selection))}>
        <EditorHeader>
          <EditorTitle title={this.renderHeaderLabel()} />
          <FontAwesomeIcon icon={faTimes} cursor="pointer" size="lg" onClick={this.removeSelection} />
        </EditorHeader>
        <div className={scrollAreaStyle}>
          <EditorContext.Provider value={editorContext}>{this.renderEditor()}</EditorContext.Provider>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ selection, chart, theme }: ChordChartAppState): ReduxProps {
  return {
    selection,
    chart,
    theme,
  }
}

const actionCreators: ActionCreatorsProps = {
  updateChart,
  updateTheme,
  setSelection,
}

export const EditorPanel = connect(mapStateToProps, actionCreators)(_EditorPanel)
