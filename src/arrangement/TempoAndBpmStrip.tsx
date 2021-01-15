import { css, cx } from 'emotion'
import React, { PureComponent } from 'react'
import { ChordChartContext, ChordChartContextType } from '../chordChart/ChordChartContext'
import { inputStyle } from '../ux/commonStyles'

const containerStyle = css({
  padding: '10px',
  background: '#dedede',
  display: 'flex',
  flexDirection: 'row',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  position: 'absolute',
  top: '0px',
  left: '10px',
  right: '10px',
  borderBottomLeftRadius: '10px',
  borderBottomRightRadius: '10px',
})

const labelStyle = css({
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  fontSize: '18px',
  margin: '10px',
})

const smallInput = css({
  maxWidth: '60px',
})
const mediumInput = css({
  maxWidth: '150px',
})

export class TempoAndBpmStrip extends PureComponent {
  onBpmChanged = ({ chart, updateChart }: ChordChartContextType) => (e: React.ChangeEvent<HTMLInputElement>) =>
    updateChart({ ...chart, bpm: Number(e.target.value) })
  onUpperChanged = ({ chart, updateChart }: ChordChartContextType) => (e: React.ChangeEvent<HTMLInputElement>) =>
    updateChart({ ...chart, timeSignature: { ...chart.timeSignature, upper: Number(e.target.value) } })
  onLowerChanged = ({ chart, updateChart }: ChordChartContextType) => (e: React.ChangeEvent<HTMLInputElement>) =>
    updateChart({ ...chart, timeSignature: { ...chart.timeSignature, lower: Number(e.target.value) } })

  render() {
    return (
      <ChordChartContext.Consumer>
        {(context) => {
          const { chart } = context
          return (
            <div className={containerStyle}>
              <span className={labelStyle}>Tempo</span>
              <input
                type="number"
                className={cx(inputStyle, mediumInput)}
                value={chart.bpm}
                onChange={this.onBpmChanged(context)}
              />
              <span className={labelStyle}>bpm</span>

              <span className={labelStyle}>Time signature</span>
              <input
                type="number"
                className={cx(inputStyle, smallInput)}
                value={chart.timeSignature.upper}
                onChange={this.onUpperChanged(context)}
              />
              <span className={labelStyle}>/</span>
              <input
                type="number"
                className={cx(inputStyle, smallInput)}
                value={chart.timeSignature.lower}
                onChange={this.onLowerChanged(context)}
              />
            </div>
          )
        }}
      </ChordChartContext.Consumer>
    )
  }
}
