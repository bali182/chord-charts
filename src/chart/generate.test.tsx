import { sampleModel, sampleTheme } from '../model/sampleModel'
import { createBrowser, toPng } from './toPng'
import fs from 'fs'

import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import { path as ffprobePath } from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'

describe('generate', () => {
  xit('should create all bars highlighted image as png using puppeteer', async () => {
    const browser = await createBrowser(sampleTheme)
    const page = await browser.newPage()
    let counter = 1
    for (const section of sampleModel.sections) {
      for (const bar of section.bars) {
        const counterStr = (counter++).toString().padStart(3, '0')
        const sName = section.name.replace(/\s+/g, '_').toLowerCase()
        const buffer = await toPng(page, sampleTheme, sampleModel, { id: bar.id, type: 'bar-selection' })
        fs.writeFileSync(`images/${counterStr}_${sName}_${bar.id}.png`, buffer)
      }
    }
    await browser.close()
  })

  it('should create video', async () => {
    // const browser = await createBrowser(sampleTheme)
    // const page = await browser.newPage()
    // const buffer = await toPng(page, sampleTheme, sampleModel, null)

    ffmpeg.setFfmpegPath(ffmpegPath)
    ffmpeg.setFfprobePath(ffprobePath)

    await new Promise<void>((done, error) => {
      // ffmpeg()
      //   .addInput('images/001_verse_K8QB1.png')
      //   .loop()
      //   .duration(5)
      //   .addInput('images/002_verse_xigJ8.png')
      //   .loop()
      //   .duration(1)
      //   .addInput('images/003_verse_UvlHq.png')
      //   .loop()
      //   .fps(30)
      //   .on('end', () => done())
      //   .on('error', (err) => error(err))
      //   .save('images/video.avi')

      ffmpeg()
        .input('images/001_verse_K8QB1.png')
        .loop(3)
        .fps(30)
        .on('end', () => done())
        .on('error', (err) => error(err))
        .save('images/video.mp4')
    })
    console.log('hi')
  })
})
