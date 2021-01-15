import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import React, { Fragment, PureComponent } from 'react'
import { ChordChartContext, ChordChartContextType } from '../chordChart/ChordChartContext'
import { ArrangementItem } from '../../common/Model'
import { EditorPopover } from '../ux/EditorPopover'
import { ArrangementItemView } from './ArrangementItemView'
import { ArrangementItemSelector } from '../editor/ArrangementItemSelector'

const rowStyle = css({
  width: '100%',
  height: '100px',
  display: 'flex',
  flexDirection: 'row',
  padding: '10px 20px',
})

const appendStyle = css({
  padding: '10px',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  border: '1px dashed lightgray',
  cursor: 'pointer',
  borderRadius: '10px',
})

type ArrangementRowState = {
  isAppenderPopShowing: boolean
}

export class ArrangementRow extends PureComponent<{}, ArrangementRowState> {
  state: ArrangementRowState = {
    isAppenderPopShowing: false,
  }

  openAppenderPopup = () => this.setState({ isAppenderPopShowing: true })
  closeAppenderPopup = () => this.setState({ isAppenderPopShowing: false })

  onItemAdded = (context: ChordChartContextType) => (item: ArrangementItem) => {
    context.addArrangementItem(item)
    this.closeAppenderPopup()
  }

  renderAppender(context: ChordChartContextType) {
    const { isAppenderPopShowing } = this.state
    return (
      <EditorPopover
        isOpen={isAppenderPopShowing}
        onClose={this.closeAppenderPopup}
        passThrough={false}
        render={() => (
          <ArrangementItemSelector onItemSelected={this.onItemAdded(context)} item={null} showIdle showSections />
        )}
        title="Select section">
        <div className={appendStyle} onClick={this.openAppenderPopup}>
          <FontAwesomeIcon icon={faPlus} size={'2x'} />
          <span style={{ marginTop: '10px' }}>Add song section</span>
        </div>
      </EditorPopover>
    )
  }

  renderSections({ chart }: ChordChartContextType) {
    return chart.arrangement.map((item) => <ArrangementItemView key={item.id} item={item} />)
  }

  render() {
    return (
      <div className={rowStyle}>
        <ChordChartContext.Consumer>
          {(context) => (
            <Fragment>
              {this.renderSections(context)}
              {this.renderAppender(context)}
            </Fragment>
          )}
        </ChordChartContext.Consumer>
      </div>
    )
  }
}
