import puppeteer, { Browser, Page } from 'puppeteer'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { isArrangementIdle, isArrangementSection, Model } from '../common/Model'
import { Theme } from '../common/Theme'
import { HtmlWrapper } from '../client/chordChart/HtmlWrapper'
import { ChordChart } from '../client/chordChart/ChordChart'
import { BarSelection } from '../common/Selection'
import { ChordChartContext } from '../client/chordChart/ChordChartContext'
import { join } from 'path'
import { promises } from 'fs'
import { barToMs, flatMap } from '../common/utils'
import { tmpdir } from 'os'
import ffmpegPath from 'ffmpeg-static'
import { exec } from 'child_process'

export async function createBrowser(theme: Theme): Promise<Browser> {
  return puppeteer.launch({
    headless: true,
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

type ImageRepresentation = {
  barId: string
  path: string
}

async function asTempImage(tmpPath: string, buffer: Buffer, barId: string): Promise<ImageRepresentation> {
  const path = join(tmpPath, `bar_${barId === null ? 'idle' : barId}.png`)
  await promises.writeFile(path, buffer)
  return { barId, path }
}

export async function createPngs(
  model: Model,
  theme: Theme,
  tmpPath: string = tmpdir()
): Promise<ImageRepresentation[]> {
  const browser = await createBrowser(theme)
  const page = await browser.newPage()
  const reprs: ImageRepresentation[] = []
  if (model.arrangement.some((item) => isArrangementIdle(item))) {
    const buffer = await toPng(page, theme, model, null)
    reprs.push(await asTempImage(tmpPath, buffer, null))
  }
  const bars = flatMap(model.sections, (section) => section.bars)
  for (const bar of bars) {
    const buffer = await toPng(page, theme, model, { id: bar.id, type: 'bar-selection' })
    reprs.push(await asTempImage(tmpPath, buffer, bar.id))
  }
  await browser.close()
  return reprs
}

function createFfmpegScript(model: Model, imgs: ImageRepresentation[], outputPath: string): string {
  const { arrangement } = model
  const barLength = barToMs(model.bpm, model.timeSignature)
  const loopParts: string[] = []
  for (const item of arrangement) {
    if (isArrangementIdle(item)) {
      const img = imgs.find((img) => img.barId === null)
      loopParts.push(`-loop 1 -t ${item.length / 1000} -i ${img.path}`)
    } else if (isArrangementSection(item)) {
      const { sectionId } = item
      const section = model.sections.find((section) => section.id === sectionId)
      const sectionFrames = section.bars
        .map((bar) => imgs.find((img) => img.barId === bar.id))
        .map((img) => `-loop 1 -t ${barLength / 1000} -i ${img.path}`)
      loopParts.push(...sectionFrames)
    }
  }
  const scriptParts: string[] = [
    ffmpegPath,
    '-y',
    ...loopParts,
    `-filter_complex "concat=n=${loopParts.length}:v=1:a=0"`,
    '-c:v libx264',
    '-pix_fmt yuv420p',
    '-r 30',
    '-movflags',
    '+faststart',
    outputPath,
  ]
  return scriptParts.join(' ')
}

export async function createVideo(model: Model, imgs: ImageRepresentation[], videoPath: string): Promise<void> {
  console.log(imgs)
  const cmd = createFfmpegScript(model, imgs, videoPath)
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      resolve(null)
    })
  })
}
