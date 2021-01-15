import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { ChordChart } from './ChordChart'
import { ContextProviderWrapper } from '../ContextProviderWrapper'

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

export class ChordChartView extends PureComponent {
  render() {
    return (
      <div className={chordChartViewStyle}>
        <div className={scrollAreaStyle}>
          <ContextProviderWrapper>
            <ChordChart />
          </ContextProviderWrapper>
        </div>
      </div>
    )
  }
}
