import { css, cx } from 'emotion'
import React, { Fragment, PureComponent } from 'react'
import { ChordChartContext, ChordChartContextType } from '../chordChart/ChordChartContext'
import { getSectionColor } from '../chordChart/utils'
import { ArrangementItem, isArrangementIdle, isArrangementSection, SectionModel } from '../../common/Model'
import { id, isNil } from '../../common/utils'
import { inputStyle } from '../ux/commonStyles'

const sectionRowStyle = (highlighted: boolean) =>
  css({
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    cursor: 'pointer',
    backgroundColor: highlighted ? '#ddd' : 'white',
    borderRadius: '5px',
    ':hover': {
      backgroundColor: '#eee',
    },
  })

const sectionColorStyle = (color: string) =>
  css({
    width: '20px',
    height: '20px',
    borderRadius: '5px',
    backgroundColor: color,
    marginRight: '10px',
  })

const sectionNameStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
})

const sectionButton = css({
  outline: 'none',
  borderRadius: '5px',
  padding: '5px',
  backgroundColor: '#444',
  color: '#fff',
  border: 'none',
  fontSize: '16px',
  cursor: 'pointer',
  marginLeft: '10px',
})

const inputSpacingStyle = css({
  margin: '0px 10px',
})

const nonBreakableLabel = css(sectionNameStyle, {
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

type ArrangementItemSelectorProps = {
  onItemSelected: (item: ArrangementItem) => void
  item: ArrangementItem
  showIdle: boolean
  showSections: boolean
}

type SectionAppenderState = {
  idleMs: number
}

export class ArrangementItemSelector extends PureComponent<ArrangementItemSelectorProps, SectionAppenderState> {
  state = {
    idleMs: !isNil(this.props.item) && isArrangementIdle(this.props.item) ? this.props.item.length : 1000,
  }

  onIdleMsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ idleMs: Number(e.target.value) })
  }

  renderIdleRow(context: ChordChartContextType) {
    const { onItemSelected, item, showIdle } = this.props
    const { idleMs } = this.state
    if (!showIdle) {
      return null
    }
    return (
      <div className={sectionRowStyle(!isNil(item) && isArrangementIdle(item))} style={{ marginTop: '10px' }}>
        <div className={nonBreakableLabel}>Idle for </div>
        <input
          className={cx(inputStyle, inputSpacingStyle)}
          type="number"
          onChange={this.onIdleMsChange}
          value={idleMs}
        />
        <div className={nonBreakableLabel}>ms</div>
        <button
          onClick={() =>
            onItemSelected(
              isNil(item)
                ? { type: 'arrangement-idle', length: idleMs, id: id() }
                : { ...item, type: 'arrangement-idle', length: idleMs }
            )
          }
          className={sectionButton}>
          Ok
        </button>
      </div>
    )
  }

  renderSection({ theme, chart }: ChordChartContextType, section: SectionModel) {
    const { onItemSelected, item } = this.props
    const color = getSectionColor(theme, chart.sections.indexOf(section))
    const isHighlighted = !isNil(item) && isArrangementSection(item) && item.sectionId === section.id
    return (
      <div
        className={sectionRowStyle(isHighlighted)}
        key={section.id}
        onClick={() =>
          onItemSelected(
            isNil(item)
              ? { type: 'arrangement-section', sectionId: section.id, id: id() }
              : { ...item, type: 'arrangement-section', sectionId: section.id }
          )
        }>
        <div className={sectionColorStyle(color)} />
        <div className={sectionNameStyle}>{section.name}</div>
      </div>
    )
  }

  renderSections(context: ChordChartContextType) {
    const { showSections } = this.props
    const { chart } = context
    if (!showSections) {
      return null
    }
    if (chart.sections.length === 0) {
      return <span>No available sections to lay out. Create them on the "Sections" tab!</span>
    }
    return context.chart.sections.map((section) => this.renderSection(context, section))
  }

  render() {
    return (
      <div>
        <ChordChartContext.Consumer>
          {(context) => (
            <Fragment>
              {this.renderSections(context)}
              {this.renderIdleRow(context)}
            </Fragment>
          )}
        </ChordChartContext.Consumer>
      </div>
    )
  }
}
