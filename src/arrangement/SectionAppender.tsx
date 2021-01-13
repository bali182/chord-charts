import { css, cx } from 'emotion'
import React, { Fragment, PureComponent } from 'react'
import { ChordChartContext, ChordChartContextType } from '../chart/ChordChartContext'
import { getSectionColor, id } from '../chart/utils'
import { ArrangementItem, SectionModel } from '../model/Model'
import { inputStyle } from '../ux/commonStyles'

const sectionRowStyle = css({
  padding: '10px',
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#eee',
    borderRadius: '5px',
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

type SectionAppenderProps = {
  onItemSelected: (item: ArrangementItem) => void
}
type SectionAppenderState = {
  idleMs: number
}

export class SectionAppender extends PureComponent<SectionAppenderProps, SectionAppenderState> {
  state = {
    idleMs: 1000,
  }

  onIdleMsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ idleMs: Number(e.target.value) })
  }

  renderRow({ theme, chart }: ChordChartContextType, section: SectionModel) {
    const { onItemSelected } = this.props
    const color = getSectionColor(theme, chart.sections.indexOf(section))
    return (
      <div
        className={sectionRowStyle}
        key={section.id}
        onClick={() => onItemSelected({ type: 'arrangement-section', sectionId: section.id, id: id() })}>
        <div className={sectionColorStyle(color)} />
        <div className={sectionNameStyle}>{section.name}</div>
      </div>
    )
  }

  renderIdleRow({ theme, chart }: ChordChartContextType) {
    const { onItemSelected } = this.props
    const { idleMs } = this.state
    return (
      <div className={sectionRowStyle} style={{ marginTop: '10px' }}>
        <div className={nonBreakableLabel}>Idle for </div>
        <input
          className={cx(inputStyle, inputSpacingStyle)}
          type="number"
          onChange={this.onIdleMsChange}
          value={idleMs}
        />
        <div className={nonBreakableLabel}>ms</div>
        <button
          onClick={() => onItemSelected({ type: 'arrangement-idle', length: idleMs, id: id() })}
          className={sectionButton}>
          Add
        </button>
      </div>
    )
  }

  render() {
    return (
      <div>
        <ChordChartContext.Consumer>
          {(context) => (
            <Fragment>
              {context.chart.sections.map((section) => this.renderRow(context, section))}
              {this.renderIdleRow(context)}
            </Fragment>
          )}
        </ChordChartContext.Consumer>
      </div>
    )
  }
}
