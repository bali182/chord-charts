import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { ArrangementRow } from './arrangement/ArrangementRow'
import { TempoAndBpmStrip } from './arrangement/TempoAndBpmStrip'
import { ContextProviderWrapper } from './ContextProviderWrapper'

const arrangementViewStyle = css({
  height: '100%',
  overflowX: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  position: 'relative',
})

export class ArrangementView extends PureComponent {
  render() {
    return (
      <div className={arrangementViewStyle}>
        <ContextProviderWrapper>
          <TempoAndBpmStrip />
          <ArrangementRow />
        </ContextProviderWrapper>
      </div>
    )
  }
}
