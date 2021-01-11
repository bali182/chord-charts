import React, { PureComponent } from 'react'
import { css } from 'emotion'
import Tooltip from 'react-tooltip'
import { EditorPanel } from './editor/EditorPanel'
import { ChordChartView } from './ChordChartView'

const appLayoutStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  height: '100vh',
})

export class AppLayout extends PureComponent {
  render() {
    return (
      <div className={appLayoutStyle}>
        <Tooltip effect="solid" type="dark" />
        <ChordChartView />
        <EditorPanel />
      </div>
    )
  }
}
