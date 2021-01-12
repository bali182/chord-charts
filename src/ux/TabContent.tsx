import { css } from 'emotion'
import React, { PureComponent } from 'react'

const tabContentStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  backgroundColor: 'white',
  boxShadow: '0px 0px 24px 0px rgba(0,0,0,0.3)',
})

export class TabContent extends PureComponent {
  render() {
    return <div className={tabContentStyle}>{this.props.children}</div>
  }
}
