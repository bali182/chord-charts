import React, { PureComponent } from 'react'
import { Theme } from '../Theme'
import { CommonProps } from './CommonProps'

export type HeaderProps = CommonProps

const headerStyle = (theme: Theme): React.CSSProperties => ({
  fontSize: theme.width * 0.03,
  marginBottom: theme.spacing,
  fontWeight: 'bold',
  textAlign: 'center',
})

export class Header extends PureComponent<CommonProps> {
  render() {
    const { theme, model } = this.props
    const { name } = model
    return <div style={headerStyle(theme)}>{name}</div>
  }
}
