import puppeteer from 'puppeteer'
import { renderToString } from 'react-dom/server'
import { sampleModel, sampleTheme } from '../sampleModel'
import { HtmlChordChart } from './HtmlChordChart'
import React from 'react'

describe('toPng', () => {
  it('should convert to png using puppeteer', async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const content = renderToString(<HtmlChordChart model={sampleModel} theme={sampleTheme} />)
    await page.setContent(content)
    await page.screenshot({
      path: 'test.png',
      clip: { x: 0, y: 0, width: sampleTheme.width, height: sampleTheme.height },
    })
    await browser.close()
  })
})
