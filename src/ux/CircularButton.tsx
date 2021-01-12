import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const circleStyle = css({
  width: '30px',
  height: '30px',
  flexShrink: 0,
  borderRadius: '15px',
  backgroundColor: 'white',
  cursor: 'pointer',
  display: 'flex',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  justifyItems: 'center',
  boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.2)',
  ':hover': {
    boxShadow: '0px 5px 8px 0px rgba(0,0,0,0.3)',
  },
  marginBottom: '5px',
})

const iconStyle = css({
  color: '#6c6c6c',
})

export type CircularButtonProps = {
  onClick?: (e: React.MouseEvent) => void
  icon: IconDefinition
  tooltip?: string
  placeTooltip?: 'top' | 'left' | 'right' | 'bottom'
}

export class CircularButton extends PureComponent<CircularButtonProps> {
  render() {
    const { onClick, icon, tooltip, placeTooltip } = this.props
    return (
      <div className={circleStyle} data-tip={tooltip} data-place={placeTooltip || 'top'} onClick={onClick}>
        <FontAwesomeIcon icon={icon} cursor="pointer" size="1x" className={iconStyle} />
      </div>
    )
  }
}
