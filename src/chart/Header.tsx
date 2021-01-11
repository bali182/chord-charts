import React, { PureComponent } from 'react'
import { Theme } from '../model/Theme'
import { ChordChartContext } from './ChordChartContext'

const headerStyle = (theme: Theme): React.CSSProperties => ({
  fontSize: theme.width * 0.03,
  marginBottom: theme.spacing,
  fontWeight: 'bold',
  textAlign: 'center',
})

export class Header extends PureComponent {
  render() {
    return (
      <ChordChartContext.Consumer>
        {({ theme, model }) => <div style={headerStyle(theme)}>{model.name}</div>}
      </ChordChartContext.Consumer>
    )
  }
}