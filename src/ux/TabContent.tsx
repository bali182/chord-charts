import { css } from 'emotion'
import React, { PureComponent } from 'react'

const tabContentStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: 'white',
})

export class TabContent extends PureComponent {
  render() {
    return <div className={tabContentStyle}>{this.props.children}</div>
  }
}
