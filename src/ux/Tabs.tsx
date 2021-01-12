import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { css } from 'emotion'
import React, { PureComponent } from 'react'

const tabsStyle = css({
  display: 'flex',
  flexDirection: 'column',
  width: '110px',
  height: '100%',
  backgroundColor: '#dedede',
})

const tabStyle = (active: boolean) =>
  css({
    display: 'flex',
    flexDirection: 'column',
    width: '110px',
    height: '110px',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    justifyItems: 'center',
    userSelect: 'none',
    fontSize: '15px',

    cursor: active ? 'auto' : 'pointer',
    backgroundColor: active ? 'white' : 'transparent',
    zIndex: active ? 3 : 0,
    color: active ? '#333' : '#444',
  })

const iconStyle = css({
  marginBottom: '8px',
})

export type TabsProps<T> = {
  activeTabId: T
  tabIds: T[]
  onChange: (tabId: T) => void
  tabIcon(tabId: T): IconDefinition
  stringify: (tabId: T) => string
}

export class Tabs<T> extends PureComponent<TabsProps<T>> {
  private tabChangeHandler = (tabId: T) => () => {
    const { onChange } = this.props
    onChange(tabId)
  }

  private renderTabs() {
    const { tabIds, activeTabId, stringify, tabIcon } = this.props
    return tabIds.map((tabId) => (
      <div key={`${tabId}`} className={tabStyle(activeTabId === tabId)} onClick={this.tabChangeHandler(tabId)}>
        <FontAwesomeIcon size={'lg'} icon={tabIcon(tabId)} className={iconStyle} />
        {stringify(tabId)}
      </div>
    ))
  }

  render() {
    return <div className={tabsStyle}>{this.renderTabs()}</div>
  }

  static defaultProps: Partial<TabsProps<any>> = {
    stringify: (item: any) => `${item}`,
  }
}
