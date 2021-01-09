import { sampleModel, sampleTheme } from '../model/sampleModel'
import { createBrowser, toPng } from './toPng'
import fs from 'fs'

describe('toPng', () => {
  it('should convert to png using puppeteer', async () => {
    const browser = await createBrowser(sampleTheme)
    const page = await browser.newPage()
    const buffer = await toPng(page, sampleTheme, sampleModel)
    fs.writeFileSync('test.png', buffer)
    await browser.close()
  })
})
