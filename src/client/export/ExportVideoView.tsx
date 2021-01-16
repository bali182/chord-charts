import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { ContextProviderWrapper } from '../ContextProviderWrapper'
import { ChordChartContext, ChordChartContextType } from '../chordChart/ChordChartContext'
import { createVideo } from '../requests'

const chordChartViewStyle = css({
  height: '100vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'row',
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: '#fff',
})

export class ExportVideoView extends PureComponent {
  doExport = ({ chart, theme }: ChordChartContextType) => () => {
    createVideo({ chart, theme }).then((result) => {
      console.log(result)
    })
  }

  render() {
    return (
      <div className={chordChartViewStyle}>
        <ContextProviderWrapper>
          <ChordChartContext.Consumer>
            {(context) => {
              return <button onClick={this.doExport(context)}>Export</button>
            }}
          </ChordChartContext.Consumer>
        </ContextProviderWrapper>
      </div>
    )
  }
}
