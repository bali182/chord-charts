import { css } from 'emotion'
import React, { PureComponent } from 'react'
import { ChartNameEditor } from '../editor/ChartNameEditor'
import { ChartModel } from '../../common/Model'
import { isChordChartSelection } from '../../common/Selection'
import { Theme } from '../../common/Theme'
import { isNil } from '../../common/utils'
import { EditorPopover } from '../ux/EditorPopover'
import { ChordChartContext } from './ChordChartContext'

const headerStyle = (theme: Theme): React.CSSProperties => ({
  marginBottom: theme.spacing,
  fontWeight: 'bold',
  textAlign: 'center',
})

const titleStyle = (theme: Theme) =>
  css({
    cursor: 'pointer',
    fontSize: theme.width * 0.03,
  })

export class Header extends PureComponent {
  render() {
    return (
      <ChordChartContext.Consumer>
        {({ theme, chart, selection, setSelection, readOnly, updateChart }) => {
          const isActive = !isNil(selection) && isChordChartSelection(selection)
          return (
            <div style={headerStyle(theme)} onClick={() => setSelection({ type: 'chord-chart-selection' })}>
              <EditorPopover
                title="Edit title"
                isOpen={isActive}
                onClose={() => setSelection(null)}
                render={() => <ChartNameEditor value={chart} onChange={(c: ChartModel) => updateChart(c)} />}
                passThrough={readOnly}>
                <span className={titleStyle(theme)}>{chart.name}</span>
              </EditorPopover>
            </div>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
