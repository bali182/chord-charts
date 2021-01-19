import { tmpdir } from 'os'
import { join } from 'path'
import { promises } from 'fs'
import { Browser, Page, launch } from 'puppeteer'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ChordChart } from '../client/chordChart/ChordChart'
import { ChordChartContext, ChordChartContextType } from '../client/chordChart/ChordChartContext'
import { HtmlWrapper } from '../client/chordChart/HtmlWrapper'
import { ChartModel, isArrangementIdle, isArrangementSection } from '../common/Model'
import { Theme } from '../common/Theme'
import { FrameRepr } from './Model'
import { barToMs, flatMap, isNil } from '../common/utils'
import ffmpegPath from 'ffmpeg-static'
import { exec } from 'child_process'

export class Generator {
  private readonly tmpFolderPath: string
  private readonly chart: ChartModel
  private readonly theme: Theme
  private browser: Browser
  private page: Page

  constructor(chart: ChartModel, theme: Theme) {
    this.chart = chart
    this.theme = theme
    this.tmpFolderPath = `chart-${chart.id}-${Date.now()}`
  }

  public folderName(): string {
    return this.tmpFolderPath
  }

  public folderPath(): string {
    return join(tmpdir(), this.tmpFolderPath)
  }

  private framePath(barId: string): string {
    return join(this.folderPath(), `bar_${isNil(barId) ? 'idle' : barId}.png`)
  }

  private videoPath(): string {
    return join(this.folderPath(), 'video.mp4')
  }

  // private batScriptPath(): string {
  //   return join(this.folderPath(), 'create-video.bat')
  // }

  private async setup(): Promise<void> {
    await promises.mkdir(this.folderPath())
    const { width, height } = this.theme
    this.browser = await launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      headless: true,
      defaultViewport: { width, height },
    })
    this.page = await this.browser.newPage()
  }

  private async createFrame(barId: string): Promise<FrameRepr> {
    const { chart, theme } = this
    const { width, height } = theme
    const path = this.framePath(barId)
    const context: ChordChartContextType = {
      chart,
      theme,
      selection: isNil(barId) ? null : { id: barId, type: 'bar-selection' },
      readOnly: true,
    }
    const content = renderToString(
      <HtmlWrapper>
        <ChordChartContext.Provider value={context}>
          <ChordChart />
        </ChordChartContext.Provider>
      </HtmlWrapper>
    )
    await this.page.setViewport({ width, height })
    await this.page.setContent(`<!DOCTYPE html>${content}`)
    await this.page.screenshot({ clip: { x: 0, y: 0, width, height }, path })
    console.log(`Frame for created at: ${path}`)
    return { barId, path }
  }

  private async createFrames(): Promise<FrameRepr[]> {
    const { chart } = this
    const reprs: FrameRepr[] = []
    const barsIds = flatMap(chart.sections, (section) => section.bars)
      .map((bar) => bar.id)
      .concat(chart.arrangement.some((item) => isArrangementIdle(item)) ? [null] : [])
    for (const barId of barsIds) {
      reprs.push(await this.createFrame(barId))
    }
    return reprs
  }

  private createFfmpegScript(frames: FrameRepr[]): string {
    const { chart } = this
    const { arrangement } = chart
    const barLength = barToMs(chart.bpm, chart.timeSignature)

    const loopParts: string[] = []

    for (const item of arrangement) {
      if (isArrangementIdle(item)) {
        const img = frames.find((img) => img.barId === null)
        loopParts.push(`-loop 1 -t ${item.length / 1000} -i ${img.path}`)
      } else if (isArrangementSection(item)) {
        const { sectionId } = item
        const section = chart.sections.find((section) => section.id === sectionId)
        const sectionFrames = section.bars
          .map((bar) => frames.find((img) => img.barId === bar.id))
          .map((img) => `-loop 1 -t ${barLength / 1000} -i ${img.path}`)
        loopParts.push(...sectionFrames)
      }
    }

    const scriptParts: string[] = [
      ffmpegPath,
      '-threads 1',
      '-y',
      ...loopParts,
      `-filter_complex "concat=n=${loopParts.length}:v=1:a=0"`,
      '-c:v libx264',
      '-pix_fmt yuv420p',
      '-r 30',
      '-movflags',
      '+faststart',
      this.videoPath(),
    ]

    const script = scriptParts.join(' ')

    console.log('Full ffmpeg script: ', script)

    return script
  }

  // private async createFfmpegBatScript(script: string): Promise<void> {
  //   return promises.writeFile(this.batScriptPath(), script)
  // }

  private createVideo(script: string): Promise<void> {
    return new Promise((resolve, reject) => {
      exec(script, (error, stdout, stderr) => {
        if (error) {
          reject(error)
        }
        resolve(null)
      })
    })
  }

  public async run(): Promise<string> {
    // Setup puppeteer
    await this.setup()
    // Create all the video frames
    const frames = await this.createFrames()
    // Create the ffmpeg script that will generate the video
    const script = this.createFfmpegScript(frames)
    // Spawn a new process and create the video
    await this.createVideo(script)

    console.log('Video path: ', this.videoPath())

    return Promise.resolve(Generator.downloadUrl(this.folderName()))
  }

  static downloadUrl(tmpFolder: string): string {
    return `/download?q=${tmpFolder}`
  }

  static videoPathFor(tmpFolder: string): string {
    return join(tmpdir(), tmpFolder, 'video.mp4')
  }
}
