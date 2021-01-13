import { faChevronDown, faChevronUp, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { CircularButton } from '../ux/CircularButton'
import { SectionModel } from '../model/Model'
import { SectionTheme, Theme } from '../model/Theme'
import { Bar } from './Bar'
import { ChordChartContext } from './ChordChartContext'
import { getContrastColor, getSectionColor, isLightColor, withOpacity } from './utils'
import { SectionEditor } from '../editor/SectionEditor'
import { isSectionSelection } from '../model/Selection'
import { isNil } from '../utils'
import { EditorPopover } from '../ux/EditorPopover'

export type SectionProps = {
  section: SectionModel
}

const sectionStyle = (theme: Theme, sTheme: SectionTheme, color: string): React.CSSProperties => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  borderRadius: sTheme.radius,
  backgroundColor: withOpacity(color, sTheme.opacity),
  marginBottom: theme.spacing,
  minHeight: sTheme.barHeight,
  boxShadow: '0px 2px 5px 1px rgba(0,0,0,0.2)',
})

const titleContainerStyle = (sTheme: SectionTheme, color: string): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTopLeftRadius: sTheme.radius,
  borderBottomLeftRadius: sTheme.radius,
  padding: sTheme.spacing,
  cursor: 'pointer',
  backgroundColor: isLightColor(color) ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
})

const titleStyle = (sTheme: SectionTheme, color: string): React.CSSProperties => ({
  fontSize: sTheme.barHeight * 0.25,
  transform: 'rotate(-180deg)',
  writingMode: 'vertical-lr',
  textAlign: 'center',
  color: isLightColor(color) ? '#fff' : '#000',
})

const barsContainerStyle = (sTheme: SectionTheme, groupBars: number): React.CSSProperties => ({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  display: 'grid',
  rowGap: sTheme.spacing,
  columnGap: sTheme.spacing,
  gridTemplateColumns: `repeat(${groupBars}, minmax(0, 1fr))`,
  padding: sTheme.spacing,
})

const appendStyle = (theme: Theme, contrastColor: string): React.CSSProperties => ({
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
  border: `1px dashed ${contrastColor}`,
  cursor: 'pointer',
  color: contrastColor,
  borderRadius: theme.section.radius,
})

const editorStripStyle = css({
  position: 'absolute',
  top: '0px',
  right: '-15px',
  width: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  height: '100%',
})

export class Section extends PureComponent<SectionProps> {
  renderAddBar(theme: Theme, color: string, readOnly: boolean) {
    if (readOnly) {
      return null
    }
    const { section } = this.props
    const contrastColor = getContrastColor(color)
    return (
      <ChordChartContext.Consumer>
        {({ addBar }) => (
          <div style={appendStyle(theme, contrastColor)} onClick={() => addBar(section.id)}>
            <FontAwesomeIcon icon={faPlus} size={'2x'} color={contrastColor} />
            <span style={{ marginLeft: theme.section.spacing, color: contrastColor }}>Add bar</span>
          </div>
        )}
      </ChordChartContext.Consumer>
    )
  }

  renderEditorStrip(readOnly: boolean) {
    if (readOnly) {
      return null
    }
    const { section } = this.props
    return (
      <ChordChartContext.Consumer>
        {({ moveSectionDown, moveSectionUp, deleteSection }) => (
          <div className={editorStripStyle}>
            <CircularButton
              icon={faChevronUp}
              tooltip="Move section up"
              placeTooltip="right"
              onClick={() => moveSectionUp(section.id)}
            />
            <CircularButton
              icon={faChevronDown}
              tooltip="Move section down"
              placeTooltip="right"
              onClick={() => moveSectionDown(section.id)}
            />
            <CircularButton
              icon={faTimes}
              tooltip="Delete section"
              placeTooltip="right"
              onClick={() => deleteSection(section.id)}
            />
          </div>
        )}
      </ChordChartContext.Consumer>
    )
  }

  render() {
    return (
      <ChordChartContext.Consumer>
        {({ theme, chart, setSelection, readOnly, selection, updateSection }) => {
          const { section } = this.props
          const index = chart.sections.indexOf(section)
          const sColor = getSectionColor(theme, index)
          const isActive = !isNil(selection) && isSectionSelection(selection) && selection.id === section.id
          return (
            <div style={sectionStyle(theme, theme.section, sColor)}>
              <EditorPopover
                passThrough={readOnly}
                isOpen={isActive}
                title="Edit section"
                render={() => <SectionEditor value={section} onChange={(s: SectionModel) => updateSection(s)} />}
                onClose={() => setSelection(null)}>
                <div
                  style={titleContainerStyle(theme.section, sColor)}
                  onClick={readOnly ? null : () => setSelection({ type: 'section-selection', id: section.id })}>
                  <div style={titleStyle(theme.section, sColor)}>{section.name}</div>
                </div>
              </EditorPopover>

              <div style={barsContainerStyle(theme.section, section.groupBars)}>
                {section.bars.map((bar, index) => (
                  <Bar key={bar.id} bar={bar} section={section} />
                ))}
                {this.renderAddBar(theme, sColor, readOnly)}
              </div>
              {this.renderEditorStrip(readOnly)}
            </div>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
