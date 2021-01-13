import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { ArrangementRow } from './arrangement/ArrangementRow'
import { ContextProviderWrapper } from './ContextProviderWrapper'

const arrangementViewStyle = css({
  height: '100%',
  overflowX: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
})

export class ArrangementView extends PureComponent {
  render() {
    return (
      <div className={arrangementViewStyle}>
        <ContextProviderWrapper>
          <ArrangementRow />
        </ContextProviderWrapper>
      </div>
    )
  }
}
