import { sampleModel, sampleTheme } from '../model/sampleModel'
import { createBrowser, toPng } from './toPng'
import fs from 'fs'

import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import { path as ffprobePath } from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import videoshow from 'videoshow'
import { range } from '../utils'

describe('generate', () => {
  it('should create all bars highlighted image as png using puppeteer', async () => {
    const browser = await createBrowser(sampleTheme)
    const page = await browser.newPage()
    let counter = 1
    for (const section of sampleModel.sections) {
      for (const bar of section.bars) {
        // const counterStr = (counter++).toString().padStart(3, '0')
        // const sName = section.name.replace(/\s+/g, '_').toLowerCase()
        const buffer = await toPng(page, sampleTheme, sampleModel, { id: bar.id, type: 'bar-selection' })
        fs.writeFileSync(`images/img_${counter++}.png`, buffer)
        // fs.writeFileSync(`images/${counterStr}_${sName}_${bar.id}.png`, buffer)
      }
    }
    await browser.close()
  })

  it('should generate video using videoshow', async () => {
    ffmpeg.setFfmpegPath(ffmpegPath)
    ffmpeg.setFfprobePath(ffprobePath)

    const config = {
      fps: 30,
      transition: false,
      videoBitrate: 1024,
      videoCodec: 'libx264',
      size: '1280x720',
      format: 'mp4',
      pixelFormat: 'yuv420p',
    }

    const paths = range(1, 13).map((index) => ({
      path: `images/img_${index}.png`,
      loop: index,
    }))

    await new Promise((done, error) => {
      videoshow(paths, config).save('images/video.mp4').on('error', error).on('end', done)
    })
  })
})
