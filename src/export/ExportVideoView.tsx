import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { ContextProviderWrapper } from '../ContextProviderWrapper'
import { ChordChartContext, ChordChartContextType } from '../chordChart/ChordChartContext'
import { createPngs, createVideo } from './createVideo'

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
  doExport = (context: ChordChartContextType) => () => {
    createPngs(context.chart, context.theme)
      .then((images) => createVideo(context.chart, context.theme, images, 'D:/video.mp4'))
      .then(() => console.log('Done'))
      .catch((e) => console.error(e))
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
