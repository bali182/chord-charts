import puppeteer, { Browser, Page } from 'puppeteer'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { Model } from '../model/Model'
import { Theme } from '../model/Theme'
import { HtmlWrapper } from './HtmlWrapper'
import { ChordChart } from './ChordChart'
import { BarSelection } from '../model/Selection'
import { ChordChartContext } from './ChordChartContext'

export async function createBrowser(theme: Theme): Promise<Browser> {
  return puppeteer.launch({
    headless: true, // Set to true to debug
    defaultViewport: { width: theme.width, height: theme.height },
  })
}

export async function toPng(page: Page, theme: Theme, model: Model, selection: BarSelection = null): Promise<Buffer> {
  const content = renderToString(
    <HtmlWrapper>
      <ChordChartContext.Provider value={{ chart: model, theme, selection, readOnly: true }}>
        <ChordChart />
      </ChordChartContext.Provider>
    </HtmlWrapper>
  )
  await page.setViewport({ width: theme.width, height: theme.height })
  await page.setContent(`<!DOCTYPE html>${content}`)
  return page.screenshot({
    clip: { x: 0, y: 0, width: theme.width, height: theme.height },
  })
}
