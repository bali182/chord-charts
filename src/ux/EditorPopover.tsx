import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import React, { PureComponent, ReactElement } from 'react'
import { ArrowContainer, Popover } from 'react-tiny-popover'

export type EditorPopoverProps<T> = {
  isOpen: boolean
  title: string
  passThrough: boolean
  onClose: () => void
  render: () => ReactElement
}

export const popoverStyle = css({
  padding: '10px',
  paddingBottom: '12px',
  backgroundColor: 'white',
  borderRadius: '3px',
  minWidth: '200px',
  boxShadow: '0px 3px 8px 0px rgba(0,0,0,0.3)',
})

const popoverHeaderStyle = css({
  display: 'flex',
  flexDirection: 'row',
  paddingBottom: '10px',
})

const popoverTitleStyle = css({
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: '1px',
  marginRight: '10px',
  fontSize: '20px',
  fontWeight: 'bold',
})

const closeButtonStyle = css({
  cursor: 'pointer',
})

export class EditorPopover<T> extends PureComponent<EditorPopoverProps<T>> {
  private onCloseClick = (e: React.MouseEvent) => {
    const { onClose } = this.props
    e.stopPropagation()
    onClose()
  }

  render() {
    const { isOpen, title, passThrough: readOnly, children, render } = this.props
    if (readOnly) {
      return children
    }
    return (
      <Popover
        isOpen={isOpen}
        reposition={true}
        padding={0}
        content={({ childRect, popoverRect, position }) => (
          <ArrowContainer
            childRect={childRect}
            popoverRect={popoverRect}
            position={position}
            arrowColor="white"
            arrowSize={10}>
            <div className={popoverStyle}>
              <div className={popoverHeaderStyle}>
                <div className={popoverTitleStyle}>{title}</div>
                <FontAwesomeIcon icon={faTimes} onClick={this.onCloseClick} className={closeButtonStyle} />
              </div>
              {render()}
            </div>
          </ArrowContainer>
        )}>
        {children as any}
      </Popover>
    )
  }
}
