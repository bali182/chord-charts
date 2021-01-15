import puppeteer, { Browser, Page } from 'puppeteer'
import { renderToString } from 'react-dom/server'
import React from 'react'
import { isArrangementIdle, isArrangementSection, Model } from '../model/Model'
import { Theme } from '../model/Theme'
import { HtmlWrapper } from '../chordChart/HtmlWrapper'
import { ChordChart } from '../chordChart/ChordChart'
import { BarSelection } from '../model/Selection'
import { ChordChartContext } from '../chordChart/ChordChartContext'
import { join } from 'path'
import { promises } from 'fs'
import { barToMs, flatMap } from '../utils'
import videoshow from 'videoshow'
import { tmpdir } from 'os'

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

type VideoFrame = {
  loop: number
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

export async function createVideo(
  model: Model,
  theme: Theme,
  imgs: ImageRepresentation[],
  videoPath: string
): Promise<void> {
  const config = {
    fps: 30,
    transition: false,
    videoBitrate: 1024,
    videoCodec: 'libx264',
    size: `${theme.width}x${theme.height}`,
    format: 'mp4',
    pixelFormat: 'yuv420p',
  }

  const { arrangement } = model
  const frames: VideoFrame[] = []
  const barLength = barToMs(model.bpm, model.timeSignature)

  for (const item of arrangement) {
    if (isArrangementIdle(item)) {
      const img = imgs.find((img) => img.barId === null)
      frames.push({ loop: item.length, path: img.path })
    } else if (isArrangementSection(item)) {
      const { sectionId } = item
      const section = model.sections.find((section) => section.id === sectionId)
      const sectionFrames = section.bars
        .map((bar) => imgs.find((img) => img.barId === bar.id))
        .map(
          (img: ImageRepresentation): VideoFrame => ({
            loop: barLength,
            path: img.path,
          })
        )
      frames.push(...sectionFrames)
    }
  }

  console.log(frames, config)

  await new Promise((done, error) => {
    videoshow(frames, config).save(videoPath).on('error', error).on('end', done)
  })
}
