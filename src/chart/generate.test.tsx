import { sampleModel, sampleTheme } from '../model/sampleModel'
import { createBrowser, toPng } from './toPng'
import fs from 'fs'

import { path as ffmpegPath } from '@ffmpeg-installer/ffmpeg'
import { path as ffprobePath } from '@ffprobe-installer/ffprobe'
import ffmpeg from 'fluent-ffmpeg'
import img2vid from 'img2vid'
import videoshow from 'videoshow'
import { range } from '../utils'

describe('generate', () => {
  xit('should create all bars highlighted image as png using puppeteer', async () => {
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

  xit('should create video', async () => {
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

  xit('should generate video', async () => {
    ffmpeg.setFfmpegPath(ffmpegPath)
    ffmpeg.setFfprobePath(ffprobePath)

    const payload = {
      slides: range(1, 13).map((index) => ({
        path: `images/img_${index}.png`,
        duration: 2,
      })),
      width: 1280,
      height: 720,
      output: 'images/video.mp4',
      forceScale: true,
    }
    await img2vid.render(payload)
  })

  it('should generate video using videoshow', async () => {
    ffmpeg.setFfmpegPath(ffmpegPath)
    ffmpeg.setFfprobePath(ffprobePath)

    await new Promise((done, error) => {
      videoshow(
        range(1, 13).map((index) => ({
          path: `images/img_${index}.png`,
          loop: 5,
        })),
        {
          fps: 30,
          transition: false,
          videoBitrate: 1024,
          videoCodec: 'libx264',
          size: '1280x720',
          format: 'mp4',
          pixelFormat: 'yuv420p',
        }
      )
        .save('images/video.mp4')
        .on('error', error)
        .on('end', done)
    })
  })
})
