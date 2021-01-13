import React, { PureComponent } from 'react'
import { css } from 'emotion'
import { ChordChartView } from './ChordChartView'
import { Tabs } from './ux/Tabs'
import { faLayerGroup, faPalette, faPuzzlePiece, faVideo } from '@fortawesome/free-solid-svg-icons'
import { TabContent } from './ux/TabContent'
import { ArrangementView } from './ArrangementView'

const appLayoutStyle = css({
  display: 'flex',
  flexDirection: 'row',
  width: '100vw',
  height: '100vh',
})

export enum TabId {
  SECTIONS = 'Sections',
  ARRANGEMENT = 'Arrangement',
  THEME = 'Theme',
  EXPORT = 'Export',
}

const AllTabIds = [TabId.SECTIONS, TabId.ARRANGEMENT, TabId.THEME, TabId.EXPORT]

type AppLayoutState = {
  activeTabId: TabId
}

export class AppLayout extends PureComponent<{}, AppLayoutState> {
  state: AppLayoutState = {
    activeTabId: TabId.SECTIONS,
  }

  onTabChange = (activeTabId: TabId) => {
    this.setState({ activeTabId })
  }

  tabIcon = (tab: TabId) => {
    switch (tab) {
      case TabId.SECTIONS:
        return faPuzzlePiece
      case TabId.ARRANGEMENT:
        return faLayerGroup
      case TabId.THEME:
        return faPalette
      case TabId.EXPORT:
        return faVideo
    }
  }
  private renderTab() {
    switch (this.state.activeTabId) {
      case TabId.ARRANGEMENT:
        return <ArrangementView />
      case TabId.THEME:
        return null
      case TabId.EXPORT:
        return null
      case TabId.SECTIONS:
        return <ChordChartView />
    }
  }
  render() {
    return (
      <div className={appLayoutStyle}>
        <Tabs
          activeTabId={this.state.activeTabId}
          tabIds={AllTabIds}
          onChange={this.onTabChange}
          tabIcon={this.tabIcon}
        />
        <TabContent>{this.renderTab()}</TabContent>
      </div>
    )
  }
}
